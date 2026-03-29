import React from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, Wind, Repeat, Zap, Users, ShieldCheck, Target, Layers, BarChart3, Info } from 'lucide-react'

export default function Overview() {
  const learningGoals = [
    { title: '1. 理解背景与核心问题', text: '了解推荐算法产生的背景，掌握其在解决“海量信息”与“有限注意力”矛盾中的核心作用。', icon: Info },
    { title: '2. 掌握核心机制', text: '理解用户画像、相似度计算及行为反馈动态更新的数学建模思想。', icon: BrainCircuit },
    { title: '3. 熟悉系统流程', text: '掌握推荐系统的“漏斗模型”流程，包括召回、排序及重排序机制。', icon: Layers },
    { title: '4. 评估社会影响', text: '能够分析“信息茧房”、“算法偏见”及“成瘾机制”的成因，并辩证看待算法带来的便利与挑战。', icon: ShieldCheck }
  ]

  const concepts = [
    {
      title: '信息过载',
      description: '互联网内容爆炸与人类有限注意力之间的矛盾，是推荐系统存在的根本原因。',
      examples: ['海量视频库', '碎片化时间', '注意力经济'],
      color: 'bg-blue-500'
    },
    {
      title: '用户画像 (Embedding)',
      description: '将用户的兴趣特征转化为数学向量，实现“物以类聚，人以群分”的精准匹配。',
      examples: ['点击/观看历史', '标签化管理', '相似度计算'],
      color: 'bg-purple-500'
    },
    {
      title: '漏斗模型',
      description: '通过召回、排序、重排序多层过滤，在毫秒级时间内从亿级内容中选出最优推荐。',
      examples: ['召回：大海捞针', '排序：优中选优', '重排序：业务干预'],
      color: 'bg-amber-500'
    },
    {
      title: '算法负面效应',
      description: '算法在带来便利的同时，也可能导致信息茧房、算法偏见及心理成瘾等问题。',
      examples: ['信息茧房', '算法偏见', '成瘾机制'],
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">教学概览</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          本平台通过模拟AI短视频推荐算法，帮助学生直观理解算法偏见的形成机制与社会影响。
        </p>
      </motion.div>

      {/* Learning Goals */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Target className="text-primary-600" /> 学习目标
        </h2>
        <div className="flex flex-col gap-4">
          {learningGoals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow w-full"
            >
              <div className="bg-primary-50 p-2 rounded-lg text-primary-600 shrink-0">
                <goal.icon className="w-5 h-5" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                <span className="font-bold text-gray-900">{goal.title}：</span>
                {goal.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <BrainCircuit className="text-primary-600" /> 核心概念
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className={`${concept.color} h-2 w-full`} />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{concept.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{concept.description}</p>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">典型案例</h4>
                  <ul className="space-y-2">
                    {concept.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${concept.color}`} />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Simulator Description */}
      <section className="bg-primary-50 rounded-3xl p-8 md:p-12 border border-primary-100">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">模拟器说明</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              在模拟器中，你可以通过交互行为观察本轮操作后新的推荐结果的变化。该模拟器模拟了现实社交媒体中基于个体喜好的推荐算法，你可以直观感受到推荐结果是如何随着你的喜好而发生偏移。
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/simulation"
                className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-primary-700 transition-colors"
              >
                准备好开始了吗？
              </a>
            </motion.div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-4 border-dashed border-primary-300 rounded-full"
              />
              <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
                <Zap className="w-20 h-20 text-primary-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
