import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Play, 
  BookOpen, 
  ChevronDown, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  Cpu, 
  Lightbulb,
  PlayCircle,
  LineChart,
  UserCheck
} from 'lucide-react'

export default function Home() {
  const nextSectionRef = useRef(null)

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = [
    { label: '种', value: '1', description: '偏见模式模拟', color: 'text-emerald-400' },
    { label: '道', value: '18', description: '知识测验题目', color: 'text-blue-400' },
    { label: '个', value: '4', description: '专题学习模块', color: 'text-purple-400' },
  ]

  const modules = [
    {
      title: 'AI算法模拟器',
      desc: '真实模拟TikTok、YouTube等平台的推荐算法逻辑，通过互动操作直观感受算法如何改变你的信息视野。',
      linkText: '开始模拟',
      link: '/simulation',
      icon: Cpu,
      bgColor: 'bg-[#f0fdf4]',
      iconColor: 'text-emerald-500',
      btnColor: 'text-emerald-600'
    },
    {
      title: '实时可视化',
      desc: '模拟器操作的同时，实时图表展示偏好分布变化、多样性指数下降过程，让短视频推荐算法形成过程一目了然。',
      linkText: '查看图表',
      link: '/visualization',
      icon: LineChart,
      bgColor: 'bg-[#fffbeb]',
      iconColor: 'text-amber-500',
      btnColor: 'text-amber-600'
    },
    {
      title: '系统学习模块',
      desc: '从算法原理到社会影响，涵盖4大专题模块，包含真实案例与深度解析，帮助学生建立完整的算法批判性认知框架。',
      linkText: '开始学习',
      link: '/learn',
      icon: BookOpen,
      bgColor: 'bg-[#f0f9ff]',
      iconColor: 'text-blue-500',
      btnColor: 'text-blue-600'
    },
    {
      title: '知识测验',
      desc: '18道精心设计的测验题目，覆盖从基础概念到高级应用的完整知识体系，每题附有详细解析，巩固学习成果。',
      linkText: '参加测验',
      link: '/quiz',
      icon: CheckCircle2,
      bgColor: 'bg-[#f5f3ff]',
      iconColor: 'text-purple-500',
      btnColor: 'text-purple-600'
    }
  ]

  const steps = [
    {
      id: '01',
      title: '了解概念',
      desc: '通过教学概览和学习模块，了解AI算法偏见的定义、类型与社会影响',
      icon: Lightbulb
    },
    {
      id: '02',
      title: '体验模拟',
      desc: '在交互式模拟器中扮演算法用户，切换不同偏见模式，感受信息茧房的形成',
      icon: PlayCircle
    },
    {
      id: '03',
      title: '观察变化',
      desc: '查看实时可视化图表，直观理解算法如何逐步改变你的信息视野',
      icon: BarChart3
    },
    {
      id: '04',
      title: '检验学习',
      desc: '完成18道测验题，验证你对AI算法偏见的理解，每题均有详细解析',
      icon: UserCheck
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-screen bg-black text-white overflow-hidden flex flex-col">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-grid opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />

          {/* Animated Lines/Particles simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M-100 100 Q 150 300 500 100 T 1100 300"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            交互式AI算法偏见教学平台
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-center tracking-tight mb-8"
          >
            看见算法的 <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-yellow-300">偏见</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-center text-gray-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            通过模拟AI短视频推荐算法，<br />
            亲身体验过滤气泡、回音室与算法偏见的形成过程
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link
              to="/simulation"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all gap-2 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Play className="w-5 h-5 fill-current" />
              立即体验模拟
              <motion.div
                className="absolute inset-0 bg-white/20 translate-x-[-100%]"
                whileHover={{ translateX: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all gap-2 backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5" />
              了解教学内容
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-24 w-full max-w-4xl border-t border-white/5 pt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-black">{stat.value}</span>
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.label}</span>
                </div>
                <div className="text-gray-500 text-sm mt-2">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative z-10 py-8 flex flex-col items-center gap-2 text-gray-500 text-xs hover:text-white transition-colors"
        >
          <span>向下滚动</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />
      </div>

      {/* Four Core Modules Section */}
      <section ref={nextSectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">平台功能</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">四大核心模块</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">从理解到实践，从模拟到测验，完整的算法偏见教学体验</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((m, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`${m.bgColor} rounded-3xl p-8 flex flex-col h-full`}
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <m.icon className={`w-6 h-6 ${m.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{m.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {m.desc}
                </p>
                <Link
                  to={m.link}
                  className={`inline-flex items-center font-bold ${m.btnColor} hover:gap-2 transition-all`}
                >
                  {m.linkText} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm">学习路径</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">四步掌握算法偏见</h2>
          <p className="text-gray-500 text-lg mb-16">循序渐进的学习设计，帮助学生从零开始建立完整认知</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 text-left border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="text-6xl font-black text-gray-50 absolute -top-2 -left-2 z-0 transition-colors group-hover:text-emerald-50">
                  {step.id}
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-[#064e3b] relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">开始你的算法素养之旅</h2>
          <p className="text-emerald-100 text-lg mb-12 max-w-2xl mx-auto">理解算法偏见，是数字时代最重要的批判性思维素养之一</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/learn"
              className="px-8 py-4 bg-white text-[#064e3b] font-bold rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" /> 进入学习模块
            </Link>
            <Link
              to="/simulation"
              className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Play className="w-5 h-5 fill-current" /> 体验模拟器
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
      </section>
    </div>
  )
}
