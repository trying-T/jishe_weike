import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Heart, Share2, MessageSquare, BarChart3, Zap, RotateCcw,
  LayoutGrid, BrainCircuit, Sparkles, Target, Eye, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  { id: 'tech', name: '科技数码', color: '#0ea5e9', soft: '#e0f2fe' },
  { id: 'food', name: '美食探店', color: '#f97316', soft: '#ffedd5' },
  { id: 'travel', name: '旅行见闻', color: '#10b981', soft: '#d1fae5' },
  { id: 'gaming', name: '游戏电竞', color: '#8b5cf6', soft: '#ede9fe' },
  { id: 'fitness', name: '运动健身', color: '#ef4444', soft: '#fee2e2' },
  { id: 'news', name: '新闻热点', color: '#334155', soft: '#e2e8f0' }
]

const LIBRARY = {
  tech: ['AI 手机新能力实测', '三分钟看懂智能眼镜', '芯片升级值不值'],
  food: ['人均 40 的宝藏小馆', '隐藏菜单到底值不值', '夜宵摊爆款组合'],
  travel: ['高铁直达的小众海边', '周末两天一夜攻略', '古城清晨最值得逛的角落'],
  gaming: ['新赛季上分思路', '职业选手操作复盘', '年度新游首发体验'],
  fitness: ['15 分钟居家燃脂循环', '深蹲怎么做更标准', '久坐肩颈解压动作'],
  news: ['今天最受关注的三件事', '政策变化怎么影响生活', '社会热点背后的关键点']
}

const INITIAL_INTERESTS = CATEGORIES.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
const FEED_SIZE = 12
const CANDIDATE_POOL = 36
const EMPTY_TRACE = {
  candidateCount: 0,
  selectedCount: 0,
  dominant: '尚未成型',
  dominantCount: 0,
  interestShare: 0,
  freshnessShare: 0,
  explorationShare: 0,
  isColdStart: true
}
let seed = 1

const meta = (id) => CATEGORIES.find(item => item.id === id)
const totalOf = (obj) => Object.values(obj).reduce((a, b) => a + b, 0)
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const entropyOf = (interests) => {
  const total = totalOf(interests)
  if (!total) return 0
  return Object.values(interests).reduce((acc, count) => {
    const p = count / total
    return p > 0 ? acc - p * Math.log2(p) : acc
  }, 0)
}

const cocoonOf = (interests) => {
  const total = totalOf(interests)
  if (!total) return 0
  return Math.round((1 - entropyOf(interests) / Math.log2(CATEGORIES.length)) * 100)
}

const createVideo = (category, index) => ({
  id: `${category}-${seed++}`,
  category,
  title: `${LIBRARY[category][Math.floor(Math.random() * LIBRARY[category].length)]} · 快速版`,
  creator: ['观察局', '研究所', '情报站', '拆解室'][Math.floor(Math.random() * 4)],
  likes: Math.floor(1000 + Math.random() * 90000),
  comments: Math.floor(80 + Math.random() * 6000),
  quality: 0.35 + Math.random() * 0.65,
  freshness: 0.3 + Math.random() * 0.7,
  novelty: Math.random(),
  thumbnail: `https://picsum.photos/seed/${category}-${seed}-${index}/400/600`
})

const generateVideos = (count) =>
  Array.from({ length: count }, (_, index) => createVideo(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id, index))

const portraitOf = (interests, history, cocoon) => {
  const total = totalOf(interests)
  const ranked = CATEGORIES.map(item => ({
    ...item,
    count: interests[item.id] || 0,
    share: total ? (interests[item.id] || 0) / total : 0
  })).sort((a, b) => b.count - a.count)
  const top = ranked[0]
  return {
    total,
    ranked,
    top,
    second: ranked[1],
    confidence: clamp(total * 9, 0, 100),
    openness: total ? Math.round((entropyOf(interests) / Math.log2(CATEGORIES.length)) * 100) : 100,
    concentration: Math.round((top?.share || 0) * 100),
    stage: total === 0 ? '冷启动' : cocoon < 35 ? '探索期' : cocoon < 70 ? '成型期' : '收缩期',
    summary: total === 0
      ? '系统正在平均试探你的兴趣。'
      : cocoon < 35
        ? `画像开始偏向 ${top.name}，但仍保留跨类探索。`
        : cocoon < 70
          ? `${top.name} 已成为主标签，推荐开始更稳定。`
          : `系统强烈认定你偏爱 ${top.name}，其他类别曝光被压缩。`,
    streak: history.length >= 3 && history.slice(0, 3).every(item => item.category === history[0].category)
      ? meta(history[0].category)?.name
      : null
  }
}

const scoreVideo = (video, interests, history) => {
  const total = totalOf(interests)
  const count = interests[video.category] || 0
  const maxInterest = Math.max(...Object.values(interests), 1)
  const smooth = total ? (count + 1) / (total + CATEGORIES.length) : 1 / CATEGORIES.length
  const relative = total ? count / maxInterest : 0.5
  const recent = history.slice(0, 5).filter(item => item.category === video.category).length
  const parts = {
    quality: video.quality * 0.34,
    interest: smooth * 0.94 + relative * 0.46,
    freshness: video.freshness * 0.2,
    momentum: recent * 0.08,
    exploration: total === 0 ? video.novelty * 0.22 : smooth < 0.18 ? video.novelty * 0.16 : video.novelty * 0.05
  }
  const score = Object.values(parts).reduce((a, b) => a + b, 0)
  const breakdown = Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, v / score]))
  const name = meta(video.category).name
  const reasons = [
    total === 0 ? '冷启动试探' : null,
    relative > 0.75 && total > 0 ? `强匹配 ${name}` : smooth > 0.22 && total > 0 ? `${name} 属于稳定兴趣` : null,
    recent >= 2 ? '最近几次点击强化了这类内容' : null,
    breakdown.exploration > 0.14 ? '系统保留了探索流量' : null
  ].filter(Boolean)
  return {
    score,
    breakdown,
    reasons: reasons.length ? reasons : ['基础质量较高，进入候选'],
    match: clamp(Math.round((breakdown.interest + breakdown.momentum) * 100 + relative * 22), 18, 99)
  }
}

const nextFeed = (interests, history) => {
  const hasSignal = totalOf(interests) > 0
  const recommendations = generateVideos(CANDIDATE_POOL)
    .map(video => ({ ...video, ...scoreVideo(video, interests, history) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, FEED_SIZE)
    .map((video, index) => ({ ...video, rank: index + 1 }))
  const counts = recommendations.reduce((acc, item) => ({ ...acc, [item.category]: (acc[item.category] || 0) + 1 }), {})
  const [topCategory, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || [null, 0]
  const avg = (key) => recommendations.length ? recommendations.reduce((sum, item) => sum + item.breakdown[key], 0) / recommendations.length : 0
  return {
    recommendations,
    trace: hasSignal
      ? {
          candidateCount: CANDIDATE_POOL,
          selectedCount: FEED_SIZE,
          dominant: topCategory ? meta(topCategory).name : '均衡探索',
          dominantCount: topCount,
          interestShare: avg('interest') + avg('momentum'),
          freshnessShare: avg('freshness'),
          explorationShare: avg('exploration'),
          isColdStart: false
        }
      : EMPTY_TRACE
  }
}

function Row({ label, value, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div animate={{ width: `${Math.max(value * 100, 3)}%` }} className="h-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function Simulation() {
  const [history, setHistory] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [userInterests, setUserInterests] = useState(INITIAL_INTERESTS)
  const [trace, setTrace] = useState(null)
  const [lastAction, setLastAction] = useState(null)

  const cocoon = useMemo(() => cocoonOf(userInterests), [userInterests])
  const portrait = useMemo(() => portraitOf(userInterests, history, cocoon), [userInterests, history, cocoon])

  useEffect(() => {
    const initial = nextFeed(INITIAL_INTERESTS, [])
    setRecommendations(initial.recommendations)
    setTrace(initial.trace)
  }, [])

  const handleReset = () => {
    const initial = nextFeed(INITIAL_INTERESTS, [])
    setHistory([])
    setUserInterests(INITIAL_INTERESTS)
    setRecommendations(initial.recommendations)
    setTrace(initial.trace)
    setLastAction(null)
    localStorage.removeItem('algolens_session')
  }

  const handleInteract = (video) => {
    const nextInterests = { ...userInterests, [video.category]: (userInterests[video.category] || 0) + 1 }
    const action = { ...video, timestamp: Date.now() }
    const nextHistoryState = [action, ...history].slice(0, 50)
    const next = nextFeed(nextInterests, nextHistoryState)
    setUserInterests(nextInterests)
    setHistory(nextHistoryState)
    setRecommendations(next.recommendations)
    setTrace(next.trace)
    setLastAction({
      category: meta(video.category).name,
      before: userInterests[video.category] || 0,
      after: nextInterests[video.category],
      cocoonDelta: cocoonOf(nextInterests) - cocoon,
      text: (userInterests[video.category] || 0) === 0
        ? `系统第一次记录到你对 ${meta(video.category).name} 的明确反馈。`
        : `你再次点击 ${meta(video.category).name}，系统会继续抬高这类内容的排序权重。`
    })
    localStorage.setItem('algolens_session', JSON.stringify({
      history: nextHistoryState.map(item => ({ timestamp: item.timestamp, category: item.category, title: item.title, mode: 'balanced' })),
      interests: nextInterests
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[360px,minmax(0,1fr)]">
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-200"><BrainCircuit className="h-3.5 w-3.5" />实时用户画像</div>
            <h2 className="text-2xl font-black">{portrait.total === 0 ? '等待行为信号' : portrait.top.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{portrait.summary}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3"><div className="text-[11px] text-slate-400">置信度</div><div className="mt-2 text-2xl font-black">{portrait.confidence}%</div></div>
              <div className="rounded-2xl bg-white/10 px-4 py-3"><div className="text-[11px] text-slate-400">开放度</div><div className="mt-2 text-2xl font-black">{portrait.openness}%</div></div>
              <div className="rounded-2xl bg-white/10 px-4 py-3"><div className="text-[11px] text-slate-400">收缩度</div><div className="mt-2 text-2xl font-black">{portrait.concentration}%</div></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {portrait.ranked.slice(0, 3).map(item => <span key={item.id} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${item.color}22`, color: '#fff', border: `1px solid ${item.color}55` }}>{item.name} {item.count ? `${Math.round(item.share * 100)}%` : '0%'}</span>)}
            </div>
            {portrait.streak && <div className="mt-4 rounded-2xl bg-amber-400/10 px-4 py-3 text-sm text-amber-100">最近连续点击 {portrait.streak}，系统会更快把这类内容推到前排。</div>}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2"><LayoutGrid className="h-5 w-5 text-primary-600" /><h3 className="text-lg font-bold text-slate-900">推荐系统此刻在做什么</h3></div>
            {trace?.isColdStart ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">
                还没有真实点击信号，所以这里先不展示推荐解释数据。点击任意一条内容后，我再把召回、精排和主导画像实时展开给你看。
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl bg-slate-50 px-3 py-4"><div className="text-[11px] text-slate-400">召回池</div><div className="mt-2 text-2xl font-black">{trace?.candidateCount || 0}</div></div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-4"><div className="text-[11px] text-slate-400">精排后</div><div className="mt-2 text-2xl font-black">{trace?.selectedCount || 0}</div></div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-4"><div className="text-[11px] text-slate-400">主导画像</div><div className="mt-2 text-sm font-bold">{trace?.dominant || '尚未成型'}</div></div>
                </div>
                <div className="my-4 flex items-center justify-center gap-2 text-slate-300"><span className="h-px flex-1 bg-slate-200" /><ArrowRight className="h-4 w-4" /><span className="h-px flex-1 bg-slate-200" /></div>
                <div className="space-y-3">
                  <Row label="兴趣权重" value={trace?.interestShare || 0} color="#2563eb" />
                  <Row label="新鲜度加成" value={trace?.freshnessShare || 0} color="#10b981" />
                  <Row label="探索保留" value={trace?.explorationShare || 0} color="#f59e0b" />
                </div>
              </>
            )}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary-600" /><h3 className="text-lg font-bold text-slate-900">这一次点击带来了什么</h3></div>
            {lastAction ? <>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">{lastAction.text}</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-400"><Eye className="h-3.5 w-3.5" />权重变化</div><div className="mt-2 text-2xl font-black">{lastAction.before} → {lastAction.after}</div></div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3"><div className="flex items-center gap-2 text-xs text-slate-400"><Target className="h-3.5 w-3.5" />茧房指数变化</div><div className={`mt-2 text-2xl font-black ${lastAction.cocoonDelta > 0 ? 'text-rose-600' : lastAction.cocoonDelta < 0 ? 'text-emerald-600' : 'text-slate-900'}`}>{lastAction.cocoonDelta > 0 ? '+' : ''}{lastAction.cocoonDelta}</div></div>
              </div>
            </> : <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">先点击一条内容，这里会解释画像权重和推荐偏向是如何变化的。</div>}
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary-600" /><h3 className="text-lg font-bold text-slate-900">最近行为时间线</h3></div>
            <div className="space-y-3">
              {history.length ? history.slice(0, 5).map((item, index) => <div key={`${item.id}-${item.timestamp}`} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3"><div className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta(item.category).color }} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><span className="truncate text-sm font-semibold text-slate-900">{item.title}</span><span className="text-xs text-slate-400">{index === 0 ? '刚刚' : `${index} 次前`}</span></div><div className="mt-1 text-xs text-slate-500">点击 {meta(item.category).name}，系统继续累积这类画像信号。</div></div></div>) : <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">这里会持续记录最近几次点击，方便你演示反馈闭环。</div>}
            </div>
            <div className="mt-5 flex gap-3">
              <Link to="/visualization" className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-bold text-white hover:bg-slate-800">查看深度图表</Link>
              <button onClick={handleReset} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-100"><RotateCcw className="h-4 w-4" />重置</button>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700"><Zap className="h-3.5 w-3.5" />推荐流解释面板</div>
                <h1 className="text-3xl font-black text-slate-950">推荐流</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">点击任意卡片，左侧画像会立即更新；每张卡片也会显示它为什么能进入前排。</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3"><div className="text-[11px] text-slate-400">当前模式</div><div className="mt-1 text-sm font-bold">平衡推荐</div></div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3"><div className="text-[11px] text-slate-400">茧房指数</div><div className={`mt-1 text-sm font-black ${cocoon > 70 ? 'text-rose-600' : cocoon > 40 ? 'text-amber-600' : 'text-emerald-600'}`}>{cocoon}%</div></div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3"><div className="text-[11px] text-slate-400">主导标签</div><div className="mt-1 text-sm font-bold">{portrait.total ? portrait.top.name : '尚未成型'}</div></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {recommendations.map(video => {
                const category = meta(video.category)
                return (
                  <motion.button key={`${video.id}-${video.rank}`} layout type="button" initial={{ opacity: 0, scale: 0.92, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} whileHover={{ y: -6 }} onClick={() => handleInteract(video)} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-[0_22px_60px_-40px_rgba(15,23,42,0.4)]">
                    <div className="relative aspect-[9/14] overflow-hidden bg-slate-200">
                      <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                      <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                        <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: `${category.color}66` }}>{category.name}</span>
                        <div className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">匹配度 {video.match}</div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center justify-between text-xs text-white/80"><span>{video.creator}</span><span>Rank #{video.rank}</span></div>
                        <h3 className="mt-2 text-lg font-black leading-tight">{video.title}</h3>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100"><div className="rounded-full bg-white/15 p-4 backdrop-blur"><Play className="h-8 w-8 fill-white text-white" /></div></div>
                    </div>
                    <div className="space-y-4 p-5">
                      <div className="flex flex-wrap gap-2">{video.reasons.slice(0, 3).map(reason => <span key={reason} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: category.soft, color: category.color }}>{reason}</span>)}</div>
                      <div className="space-y-3">
                        <Row label="兴趣驱动" value={video.breakdown.interest + video.breakdown.momentum} color={category.color} />
                        <Row label="新鲜度" value={video.breakdown.freshness} color="#10b981" />
                        <Row label="探索保留" value={video.breakdown.exploration} color="#f59e0b" />
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-slate-400">
                        <div className="flex items-center gap-1.5 text-xs"><Heart className="h-4 w-4" /><span>{video.likes}</span></div>
                        <div className="flex items-center gap-1.5 text-xs"><MessageSquare className="h-4 w-4" /><span>{video.comments}</span></div>
                        <div className="flex items-center gap-1.5 text-xs"><Share2 className="h-4 w-4" /><span>分享</span></div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  )
}
