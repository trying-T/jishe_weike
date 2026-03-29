import React, { useState, useEffect } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  History,
  AlertCircle,
  PlayCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

const COLORS = ['#3b82f6', '#f97316', '#10b981', '#a855f7', '#ef4444', '#334155']

const CATEGORIES = {
  tech: '科技数码',
  food: '美食探店',
  travel: '旅游博主',
  gaming: '游戏竞技',
  fitness: '运动健身',
  news: '时政热点'
}

export default function Visualization() {
  const [sessionData, setSessionData] = useState(null)
  const [chartData, setChartData] = useState([])
  const [pieData, setPieData] = useState([])
  const [lineData, setLineData] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('algolens_session') || '{"history": [], "interests": {}}')
    setSessionData(data)

    if (data.history.length > 0) {
      // Bar Chart Data (Interests count)
      const bar = Object.entries(data.interests).map(([id, count]) => ({
        name: CATEGORIES[id],
        count: count
      }))
      setChartData(bar)

      // Pie Chart Data (Distribution)
      const pie = bar.filter(b => b.count > 0)
      setPieData(pie)

      // Line Chart Data (Diversity over time)
      const line = data.history.map((h, index) => {
        const slice = data.history.slice(0, index + 1)
        const uniqueCategories = new Set(slice.map(s => s.category)).size
        return {
          step: index + 1,
          diversity: (uniqueCategories / 6) * 100,
          mode: h.mode
        }
      })
      setLineData(line)
    }
  }, [])

  if (!sessionData || sessionData.history.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-primary-50 p-6 rounded-full mb-6">
            <AlertCircle className="w-16 h-16 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">暂无数据</h2>
          <p className="text-xl text-gray-500 max-w-lg mx-auto mb-8">
            请先前往算法模拟器进行交互操作，图表将在此实时更新。
          </p>
          <Link
            to="/simulation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-colors"
          >
            前往模拟器 <PlayCircle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">实时可视化</h1>
        <p className="text-xl text-gray-500">
          通过多维度图表，揭示算法推荐如何影响你的内容多样性与偏好分布。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Interests Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" /> 交互类别分布
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Diversity Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" /> 内容多样性趋势
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorDiv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="step" label={{ value: '交互次数', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: '多样性指数 %', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="diversity" stroke="#10b981" fillOpacity={1} fill="url(#colorDiv)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-400 italic text-center">
            * 随着交互增加，如果指数持续下降，说明你正进入"过滤气泡"
          </p>
        </motion.div>

        {/* Category Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <PieChartIcon className="w-6 h-6 text-purple-600" /> 视野占比分析
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Interaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <History className="w-6 h-6 text-slate-600" /> 最近交互记录
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {sessionData.history.slice().reverse().map((h, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-gray-400 shadow-sm">
                    {sessionData.history.length - i}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{CATEGORIES[h.category]}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(h.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full">
                  {h.mode === 'balanced' ? '平衡模式' : '偏见模式'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary Insights */}
      <section className="bg-primary-900 text-white p-10 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6">数据洞察报告</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
            <div className="text-sm text-primary-200 mb-2 uppercase tracking-wider font-bold">偏好集中度</div>
            <div className="text-3xl font-extrabold">
              {pieData.length > 0 ? ((pieData.sort((a,b) => b.count - a.count)[0].count / sessionData.history.length) * 100).toFixed(0) : 0}%
            </div>
            <p className="mt-2 text-xs text-primary-300">
              你的大部分兴趣集中在 "{pieData.length > 0 ? pieData.sort((a,b) => b.count - a.count)[0].name : '无'}" 类别。
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
            <div className="text-sm text-primary-200 mb-2 uppercase tracking-wider font-bold">气泡风险</div>
            <div className="text-3xl font-extrabold">
              {pieData.length <= 2 && sessionData.history.length > 10 ? '高风险' : pieData.length <= 4 ? '中等' : '低风险'}
            </div>
            <p className="mt-2 text-xs text-primary-300">
              基于你的内容覆盖面评估的过滤气泡形成风险等级。
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
            <div className="text-sm text-primary-200 mb-2 uppercase tracking-wider font-bold">批判性得分</div>
            <div className="text-3xl font-extrabold">
              {Math.min(100, (pieData.length / 6) * 100 + (sessionData.history.length * 2)).toFixed(0)}
            </div>
            <p className="mt-2 text-xs text-primary-300">
              主动探索多元化内容的程度越高，得分越高。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
