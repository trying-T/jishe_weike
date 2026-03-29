import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronRight,
  BrainCircuit,
  Repeat,
  Zap,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Layers,
  Search,
  Users,
  X
} from 'lucide-react'
import { Link } from 'react-router-dom'

const CHAPTERS = [
  {
    id: 1,
    title: '理解背景与核心问题',
    subtitle: '解决“海量信息”与“有限注意力”的矛盾',
    duration: '5 分钟',
    icon: Info,
    color: 'bg-blue-500',
    content: `
      <h3 class="text-2xl font-bold mb-4">为什么需要推荐算法？</h3>
      <p class="mb-4">在数字时代，我们正面临着前所未有的“信息爆炸”。互联网上的内容量远远超过了任何个体的处理能力。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h4 class="font-bold text-blue-800 mb-2">核心矛盾</h4>
          <p class="text-blue-700 text-sm">无限增长的数字内容 VS 人类极其有限的注意力和时间。</p>
        </div>
        <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h4 class="font-bold text-indigo-800 mb-2">算法的角色</h4>
          <p class="text-indigo-700 text-sm">推荐算法充当了“信息过滤器”，旨在将最符合用户需求的内容在最合适的时间推送给最合适的人。</p>
        </div>
      </div>
      <p class="text-gray-600">这种过滤机制虽然极大提升了信息获取效率，但也为后来的“偏见”与“茧房”埋下了伏笔。</p>
    `,
    details: `
      <div class="space-y-8">
        <section>
          <h4 class="text-xl font-bold mb-4 text-blue-900">1. 注意力的经济学：为什么“免费”的最贵？</h4>
          <p class="mb-4">诺贝尔奖得主赫伯特·西蒙曾指出：“信息的丰富导致了注意力的贫乏。”在短视频平台上，每一秒钟都有数以万计的新内容上传。算法的本质是**注意力分配器**，它通过极低成本的信息发现，换取了用户最宝贵的资源——时间。</p>
          <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h5 class="font-bold mb-2 text-blue-800">行业观察：无限滚动（Infinite Scroll）</h5>
            <p class="text-sm text-blue-700">无限滚动的设计消除了用户进行“是否继续”决策的心理摩擦点。配合毫秒级的算法响应，这种机制模拟了老虎机的中奖体验，即“随机强化”，使用户在无意识中消耗大量时间。</p>
          </div>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-blue-900">2. 冷启动难题与数据驱动</h4>
          <p class="mb-4">对于新平台或新用户，算法面临“冷启动”挑战。TikTok 的成功秘诀在于其**极短的反馈链路**。</p>
          <ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li><strong>显性反馈：</strong>点赞、评论、分享、收藏。</li>
            <li><strong>隐性反馈：</strong>完播率（最重要指标）、重复观看、拖动进度条、停留时长。</li>
          </ul>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-blue-900">3. 舒适区的代价</h4>
          <p>极致的效率带来了极致的安逸。当算法能够精准预测你的下一个喜好时，你实际上被剥夺了“偶遇非共识”的机会。这种长期的效率优化会导致个体认知结构的单一化，也就是我们常说的“认知闭合”。</p>
        </div>
      </div>
    `
  },
  {
    id: 2,
    title: '掌握核心机制',
    subtitle: '用户画像、相似度计算与动态反馈循环',
    duration: '8 分钟',
    icon: BrainCircuit,
    color: 'bg-purple-500',
    content: `
      <h3 class="text-2xl font-bold mb-4">算法如何“读懂”你？</h3>
      <p class="mb-6">推荐算法的核心在于将抽象的用户兴趣和视频内容转化为计算机可以理解的数学表达。</p>
      
      <div class="space-y-6 my-8">
        <div class="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Users class="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">用户画像 (Embedding)</h4>
            <p class="text-sm text-gray-600">通过你的点击、点赞、停留时长等行为，算法为你打上成千上万个标签，构建出一个高维度的虚拟“数字人格”。</p>
          </div>
        </div>
        <div class="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Search class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">相似度计算</h4>
            <p class="text-sm text-gray-600">利用向量空间模型（如余弦相似度），计算你的兴趣向量与内容向量之间的“距离”。距离越近，推荐概率越高。</p>
          </div>
        </div>
        <div class="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <Repeat class="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-1">动态反馈循环</h4>
            <p class="text-sm text-gray-600">算法不是静止的。你的每一次新操作都会实时修正画像，形成一个不断自我强化的闭环。</p>
          </div>
        </div>
      </div>
    `,
    details: `
      <div class="space-y-8">
        <section>
          <h4 class="text-xl font-bold mb-4 text-purple-900">1. 万物皆可 Embedding</h4>
          <p class="mb-4">在计算机眼中，你不是一个活生生的人，而是一个高维空间中的**点**。Embedding 技术将你的喜好（如：周杰伦、科技博主、猫咪）转化为一串几千维的数字向量。</p>
          <div class="bg-purple-50 p-6 rounded-2xl font-mono text-xs text-purple-700 overflow-x-auto">
            User_A = [0.82, -0.15, 0.44, 0.91, -0.22, ... 2048 dims]
          </div>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-purple-900">2. 相似度的几何意义</h4>
          <p class="mb-4">算法计算两个向量之间的夹角（余弦相似度）。</p>
          <ul class="list-none space-y-3">
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
              <p class="text-sm"><strong>夹角接近0°：</strong>你们的兴趣高度重合，算法会疯狂推送相似内容。</p>
            </li>
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
              <p class="text-sm"><strong>夹角接近90°：</strong>完全没有共同点，内容会被过滤掉。</p>
            </li>
          </ul>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-purple-900">3. 实时性：流式处理（Streaming）</h4>
          <p>现代算法不再等待第二天更新。当你滑动过一个视频（Skip）或看完一个视频（Finish），这个信号会在几秒钟内通过 Flink 等流处理技术反馈给推荐引擎，立刻调整下一刷的内容。这就是为什么算法能“秒懂”你当下的情绪。</p>
        </section>
      </div>
    `
  },
  {
    id: 3,
    title: '熟悉系统流程',
    subtitle: '推荐系统的“漏斗模型”：召回、排序与重排序',
    duration: '7 分钟',
    icon: Layers,
    color: 'bg-amber-500',
    content: `
      <h3 class="text-2xl font-bold mb-4">从十亿到十：信息的层层筛选</h3>
      <p class="mb-6">为了在毫秒级时间内从海量库中选出视频，工业界普遍采用“漏斗模型”流程：</p>
      
      <div class="relative pl-8 border-l-2 border-dashed border-amber-200 space-y-8 my-10">
        <div class="relative">
          <div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow-sm"></div>
          <h4 class="font-bold text-gray-900 mb-1">1. 召回阶段 (Recall)</h4>
          <p class="text-sm text-gray-600">目标：快速。从亿级库中筛选出千级候选集。策略较粗略，追求高覆盖率，宁可错杀不可放过。</p>
        </div>
        <div class="relative">
          <div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-sm"></div>
          <h4 class="font-bold text-gray-900 mb-1">2. 排序阶段 (Ranking)</h4>
          <p class="text-sm text-gray-600">目标：精准。对候选集进行精细化打分（预估点击率、完播率等），模型极度复杂，将候选集缩减至百级。</p>
        </div>
        <div class="relative">
          <div class="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-red-500 border-4 border-white shadow-sm"></div>
          <h4 class="font-bold text-gray-900 mb-1">3. 重排序阶段 (Re-ranking)</h4>
          <p class="text-sm text-gray-600">目标：合规与多样。引入业务逻辑，如打散同类视频、过滤违规内容、强制插入多样性内容，最终呈现给用户的仅剩 10-20 个。</p>
        </div>
      </div>
    `,
    details: `
      <div class="space-y-8">
        <section>
          <h4 class="text-xl font-bold mb-4 text-amber-900">1. 召回：大海捞针的艺术</h4>
          <p class="mb-4">召回不求精准，只求**速度**。它使用多路策略：</p>
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <strong>协同过滤召回：</strong>看同样视频的人也喜欢看这个。
            </div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <strong>内容标签召回：</strong>你喜欢“足球”，就推“梅西”。
            </div>
          </div>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-amber-900">2. 精排：模型的心脏</h4>
          <p class="mb-4">精排模型（如 DeepFM）是推荐系统的“重武器”。它会考虑：</p>
          <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li><strong>上下文特征：</strong>时间、地点、天气、手机型号。</li>
            <li><strong>用户特征：</strong>性别、年龄、近期活跃轨迹。</li>
            <li><strong>视频特征：</strong>清晰度、封面图美观度、发布者权重。</li>
          </ul>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-amber-900">3. 重排：不仅仅是算法，更是规则</h4>
          <p>重排阶段决定了你最终看到的页面布局。为了防止你刷到全是同一个人的视频，重排逻辑会执行**“强行打散”**。此外，为了保证平台内容生态，还会加入“试探性流量”，推给你平时不看的领域，观察你的反应。</p>
        </div>
      </div>
    `
  },
  {
    id: 4,
    title: '评估社会影响',
    subtitle: '辩证看待信息茧房、算法偏见与成瘾机制',
    duration: '10 分钟',
    icon: ShieldCheck,
    color: 'bg-emerald-500',
    content: `
      <h3 class="text-2xl font-bold mb-4">算法的双刃剑效应</h3>
      <div class="flex flex-col gap-6 my-8">
        <div class="p-6 bg-red-50 rounded-2xl border border-red-100">
          <h4 class="font-bold text-red-800 mb-3 flex items-center gap-2">
            ⚠️ 潜在风险
          </h4>
          <ul class="text-sm text-red-700 space-y-3 list-none p-0 m-0">
            <li><strong>信息茧房：</strong>长期接触单一信息导致视野变窄、观点极化。</li>
            <li><strong>算法偏见：</strong>训练数据的偏差导致算法对特定群体产生系统性歧视。</li>
            <li><strong>成瘾机制：</strong>过度追求点击率可能导致用户陷入“无意识刷屏”的低级快感循环。</li>
          </ul>
        </div>
        <div class="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
          <h4 class="font-bold text-emerald-800 mb-3 flex items-center gap-2">
            ✅ 积极应对
          </h4>
          <p class="text-sm text-emerald-700 leading-relaxed mb-4">
            我们不应因噎废食。算法极大降低了发现好内容的成本。关键在于：
          </p>
          <ul class="text-sm text-emerald-700 space-y-2 list-none p-0 m-0">
            <li>• 培养“算法觉知”，变被动为主动。</li>
            <li>• 推动平台引入“多样性权重”和审计机制。</li>
            <li>• 通过立法保障用户的数字权利。</li>
          </ul>
        </div>
      </div>
    `,
    details: `
      <div class="space-y-8">
        <section>
          <h4 class="text-xl font-bold mb-4 text-emerald-900">1. 回音室效应与群体极化</h4>
          <p class="mb-4">在算法构建的世界里，你很难听到不同的声音。社会学家桑斯坦指出，当人们只在同质化的圈子里交流时，原本温和的观点会逐渐变得极端，最终导致社会撕裂。</p>
          <div class="bg-red-50 p-6 rounded-2xl border border-red-100 mb-6">
            <h5 class="font-bold mb-2 text-red-800">警惕：算法偏见的自我强化</h5>
            <p class="text-sm text-red-700">如果算法在训练时使用的历史数据包含偏见（如性别歧视），模型会学习并放大这种偏见，导致特定群体在推荐中被系统性忽视，形成“数字鸿沟”。</p>
          </div>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-emerald-900">2. 用户的自我救赎：如何“调教”算法？</h4>
          <p class="mb-4">你可以通过以下行为反向重塑你的推荐引擎：</p>
          <div class="space-y-3">
            <div class="p-4 bg-emerald-50 rounded-xl flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">1</div>
              <p class="text-sm text-emerald-800"><strong>主动搜索：</strong>通过搜索框主动输入不感兴趣但有价值的内容，打破 Embedding 锁定。</p>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl flex items-center gap-4">
              <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">2</div>
              <p class="text-sm text-emerald-800"><strong>负向反馈：</strong>果断长按点击“不感兴趣”，清理历史标签。</p>
            </div>
          </div>
        </section>

        <section>
          <h4 class="text-xl font-bold mb-4 text-emerald-900">3. 未来的方向：负责任的 AI</h4>
          <p>真正的智能不应只是“投其所好”，而应是“助人成长”。未来的算法治理将引入更多人文维度，如强制性的“多样性指标”和“透明度报告”，让黑盒算法变得可信、可控。</p>
        </div>
      </div>
    `
  }
]

export default function Learn() {
  const [expandedChapter, setExpandedChapter] = useState(1)
  const [modalContent, setModalContent] = useState(null)

  const openModal = (chapter) => {
    setModalContent(chapter)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalContent(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">学习模块</h1>
        <p className="text-xl text-gray-500">
          基于四大核心教学目标，系统掌握推荐算法逻辑与社会影响。
        </p>
      </div>

      <div className="space-y-6">
        {CHAPTERS.map((chapter) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chapter.id * 0.1 }}
            className={`bg-white rounded-3xl border ${expandedChapter === chapter.id ? 'border-primary-200 shadow-xl' : 'border-gray-100 shadow-sm'} overflow-hidden transition-all duration-300`}
          >
            <button
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
            >
              <div className="flex items-center gap-6">
                <div className={`${chapter.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  <chapter.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">第 {chapter.id} 章</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-sm text-gray-400 font-medium">{chapter.duration}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{chapter.title}</h2>
                  <p className="text-gray-500">{chapter.subtitle}</p>
                </div>
              </div>
              <div className={`p-2 rounded-full ${expandedChapter === chapter.id ? 'bg-primary-50 text-primary-600' : 'bg-gray-50 text-gray-400'}`}>
                {expandedChapter === chapter.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </div>
            </button>

            <AnimatePresence>
              {expandedChapter === chapter.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-8 md:px-24 md:pb-12">
                    <div
                      className="prose prose-primary max-w-none text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: chapter.content }}
                    />

                    <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary-600 font-bold">
                        <BookOpen className="w-5 h-5" />
                        <span>已阅读完成</span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => openModal(chapter)}
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> 深入了解
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-full"
            >
              <div className={`p-8 sm:p-10 ${modalContent.color} text-white flex justify-between items-center`}>
                <div>
                  <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">深入了解详情</div>
                  <h3 className="text-3xl font-black">{modalContent.title}</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 sm:p-12 overflow-y-auto">
                <div 
                  className="prose prose-slate max-w-none text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: modalContent.details }}
                />
                <button
                  onClick={closeModal}
                  className="mt-12 w-full py-5 bg-gray-900 text-white rounded-3xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                >
                  返回学习列表
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-20 bg-primary-600 rounded-3xl p-10 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">学完了？测验一下！</h2>
          <p className="text-primary-100 mb-8 text-lg">18道题全面覆盖核心目标，检验你的学习成果</p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-600 rounded-full font-bold text-xl hover:bg-primary-50 transition-colors shadow-xl"
          >
            开始测验 <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12"><Zap className="w-20 h-20" /></div>
          <div className="absolute bottom-10 right-10 -rotate-12"><ShieldCheck className="w-24 h-24" /></div>
        </div>
      </div>
    </div>
  )
}
