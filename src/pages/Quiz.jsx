import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Trophy,
  BookOpen,
  Info,
  ShieldCheck,
  AlertTriangle,
  MessageSquareText,
  Check
} from 'lucide-react'
import { Link } from 'react-router-dom'

const QUESTIONS = [
  // 一、选择题
  {
    id: 1,
    type: 'choice',
    category: '选择题',
    question: '推荐系统主要解决的问题是？',
    options: ['存储海量视频', '解决“海量信息”与“有限注意力”的矛盾', '提高视频画质', '防止用户沉迷'],
    answer: 1,
    explanation: '推荐系统旨在从海量信息中过滤出用户感兴趣的内容，解决信息过载问题。'
  },
  {
    id: 2,
    type: 'choice',
    category: '选择题',
    question: '在推荐算法中，Embedding 技术的作用是？',
    options: ['给视频添加文字标签', '将用户和物品映射为高维空间中的向量', '统计用户的点击次数', '过滤违规内容'],
    answer: 1,
    explanation: 'Embedding（嵌入）是推荐系统的灵魂，它能将抽象的对象转化为计算机可计算的数学向量。'
  },
  {
    id: 3,
    type: 'choice',
    category: '选择题',
    question: '计算两个向量相似度最常用的方法是？',
    options: ['欧几里得距离', '余弦相似度', '曼哈顿距离', '皮尔逊相关系数'],
    answer: 1,
    explanation: '余弦相似度通过计算两个向量夹角的余弦值来衡量相似性，在推荐系统中应用最广。'
  },
  {
    id: 4,
    type: 'choice',
    category: '选择题',
    question: '推荐系统“漏斗模型”的正确顺序是？',
    options: ['排序 -> 召回 -> 重排序', '召回 -> 重排序 -> 排序', '召回 -> 排序 -> 重排序', '重排序 -> 召回 -> 排序'],
    answer: 2,
    explanation: '推荐流程一般是先从大库中“召回”候选，再进行精细“排序”，最后进行业务逻辑的“重排序”。'
  },
  {
    id: 5,
    type: 'choice',
    category: '选择题',
    question: '关于“信息茧房”，下列说法正确的是？',
    options: ['它能让用户只看到自己喜欢的内容，没有任何坏处', '它是由于算法只推多样性内容导致的', '长期处于茧房会导致视野收窄、观点极化', '只有老年人会陷入信息茧房'],
    answer: 2,
    explanation: '信息茧房会限制我们的信息获取，导致认知单一和偏见。'
  },

  // 二、填空题 (适配为选择题形式)
  {
    id: 6,
    type: 'choice',
    category: '填空题',
    question: '推荐算法的核心博弈是在“准确性”（让你爽）和"____"（让你成长）之间走钢丝。',
    options: ['复杂性', '多样性', '一致性', '速度'],
    answer: 1,
    explanation: '推荐系统不仅要推用户喜欢的（准确性），也要推一些新颖的、不同的内容（多样性）。'
  },
  {
    id: 7,
    type: 'choice',
    category: '填空题',
    question: '在向量空间中，两个向量的夹角越____，表示它们的相似度越高。',
    options: ['大', '小', '固定', '不确定'],
    answer: 1,
    explanation: '夹角越小，余弦值越接近1，意味着两个向量在空间中的指向越接近。'
  },
  {
    id: 8,
    type: 'choice',
    category: '填空题',
    question: '推荐系统的____阶段负责从亿级库中快速捞出千级候选集，追求速度。',
    options: ['排序', '召回', '过滤', '展示'],
    answer: 1,
    explanation: '召回阶段（Recall）是推荐系统的第一步，主要目标是快速筛选候选集。'
  },
  {
    id: 9,
    type: 'choice',
    category: '填空题',
    question: '我们可以用"____"这一物理/信息学概念来量化用户接触内容的多样性，该值越低说明视野越窄。',
    options: ['重力', '兴趣熵 (Entropy)', '动能', '密度'],
    answer: 1,
    explanation: '信息熵常被用来衡量随机变量的不确定性，在推荐中可衡量兴趣分布的丰富度。'
  },
  {
    id: 10,
    type: 'choice',
    category: '填空题',
    question: '为了避免陷入算法偏见和信息茧房，用户应采取"____"策略，如主动搜索陌生领域。',
    options: ['被动接收', '主动干预 / 主动探索', '彻底断网', '忽略不计'],
    answer: 1,
    explanation: '主动探索是打破算法“投其所好”逻辑的最有效个人手段。'
  },

  // 三、判断题
  {
    id: 11,
    type: 'choice',
    category: '判断题',
    question: '推荐算法会“监听”用户的麦克风来获取喜好。',
    options: ['正确', '错误'],
    answer: 1,
    explanation: '这是一个常见误区。算法主要基于海量的行为数据（点击、观看时长、转发）和画像，而非实时监听。'
  },
  {
    id: 12,
    type: 'choice',
    category: '判断题',
    question: '用户的兴趣向量是固定不变的，一旦生成就不会修改。',
    options: ['正确', '错误'],
    answer: 1,
    explanation: '错误。兴趣向量会根据用户的最新行为反馈进行实时或离线的动态更新。'
  },
  {
    id: 13,
    type: 'choice',
    category: '判断题',
    question: '排序阶段主要考虑的是速度，因此使用的模型比较简单。',
    options: ['正确', '错误'],
    answer: 1,
    explanation: '错误。排序阶段（Ranking）追求精准度，模型最复杂；召回阶段才追求速度。'
  },
  {
    id: 14,
    type: 'choice',
    category: '判断题',
    question: '算法偏见完全源于程序员的主观恶意编写。',
    options: ['正确', '错误'],
    answer: 1,
    explanation: '错误。偏见主要源于训练数据本身的社会偏差以及模型的正反馈放大效应。'
  },
  {
    id: 15,
    type: 'choice',
    category: '判断题',
    question: '偶尔主动点赞一些平时不看的领域内容，有助于打破信息茧房。',
    options: ['正确', '错误'],
    answer: 0,
    explanation: '正确。这能向算法输入新的信号，迫使算法探索你视野之外的内容。'
  },

  // 四、简答题
  {
    id: 16,
    type: 'short',
    category: '简答题',
    question: '简述推荐系统中“召回”和“排序”的区别。',
    referenceAnswer: '召回是从海量库中快速筛选出少量候选集（如从 10 亿到 1000），注重速度和覆盖面，策略较粗略；排序是对候选集进行精细化打分（如从 1000 到 10），注重准确性和多目标融合（点击率、完播率等），模型更复杂。',
    explanation: '召回是大海捞针，排序是优中选优。'
  },
  {
    id: 17,
    type: 'short',
    category: '简答题',
    question: '什么是“信息茧房”？它是如何形成的？',
    referenceAnswer: '信息茧房指用户长期只接触符合自己偏好的信息，导致视野收窄、观点极化的现象。形成机制是：算法基于历史行为推荐相似内容 -> 用户点击强化偏好 -> 系统进一步缩小推荐范围 -> 形成正反馈循环，导致兴趣熵降低。',
    explanation: '它是算法推荐与人类天性的“双向奔赴”产生的负面后果。'
  },
  {
    id: 18,
    type: 'short',
    category: '简答题',
    question: '作为用户，我们可以采取哪些措施来避免被算法“控制”？',
    referenceAnswer: '①主动搜索陌生领域内容并互动；②刻意关注不同观点的博主；③定期清理缓存或重置兴趣标签；④设置使用时限，保持觉知，从被动接收转为主动选择。',
    explanation: '核心是建立“算法觉知”，变被动为主动。'
  }
]

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [shortAnswerInput, setShortAnswerInput] = useState('')

  const handleOptionSelect = (index) => {
    if (showExplanation) return
    setSelectedOption(index)
    setShowExplanation(true)

    const isCorrect = index === QUESTIONS[currentStep].answer
    if (isCorrect) setScore(score + 1)

    setUserAnswers([...userAnswers, { questionId: QUESTIONS[currentStep].id, isCorrect, selected: index }])
  }

  const handleShortAnswerConfirm = () => {
    setShowExplanation(true)
    // 简答题默认给分，或者作为自我对照
    setScore(score + 1)
    setUserAnswers([...userAnswers, { questionId: QUESTIONS[currentStep].id, isCorrect: true, selected: 'short' }])
  }

  const nextQuestion = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setShortAnswerInput('')
    } else {
      setQuizComplete(true)
    }
  }

  const restartQuiz = () => {
    setCurrentStep(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
    setUserAnswers([])
    setShortAnswerInput('')
  }

  if (quizComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-primary-600 p-12 text-center text-white">
            <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-4xl font-extrabold mb-2">测试完成！</h2>
            <p className="text-primary-100 text-xl">感谢参与课后练习</p>
            <div className="text-7xl font-black mt-4">{Math.round((score / QUESTIONS.length) * 100)}</div>
          </div>
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase font-bold mb-1">总题数</div>
                <div className="text-2xl font-bold">{QUESTIONS.length}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase font-bold mb-1">已完成</div>
                <div className="text-2xl font-bold text-emerald-500">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase font-bold mb-1">掌握度</div>
                <div className="text-2xl font-bold text-primary-600">{Math.round((score / QUESTIONS.length) * 100)}%</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> 教学建议
              </h3>
              <div className="p-6 bg-gray-50 rounded-2xl text-gray-600 leading-relaxed">
                恭喜你完成了针对推荐系统与信息茧房的深度练习。你现在已经能够区分召回与排序，理解信息熵的意义，并掌握了主动打破茧房的方法。
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors"
              >
                <RefreshCcw className="w-5 h-5" /> 重新测验
              </button>
              <Link
                to="/learn"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary-50 text-primary-600 rounded-2xl font-bold hover:bg-primary-100 transition-colors"
              >
                <BookOpen className="w-5 h-5" /> 回到学习模块
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const q = QUESTIONS[currentStep]

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">课后练习测试</h1>
            <p className="text-gray-500">深入理解推荐系统逻辑与信息茧房治理</p>
          </div>
          <div className="text-right">
            <span className="text-primary-600 font-bold text-2xl">{currentStep + 1}</span>
            <span className="text-gray-300 font-bold text-xl"> / {QUESTIONS.length}</span>
          </div>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            className="h-full bg-primary-600"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
        >
          <div className="mb-6 inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {q.category}
          </div>

          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
              {q.type === 'choice' ? <HelpCircle className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-snug">{q.question}</h2>
          </div>

          {/* Rendering Choice/TF/Fill-in-blank Questions */}
          {q.type === 'choice' && (
            <div className="space-y-4">
              {q.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-5 rounded-2xl text-left font-medium transition-all flex items-center justify-between group ${showExplanation
                      ? index === q.answer
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : index === selectedOption
                          ? 'bg-red-50 border-red-200 text-red-700'
                          : 'bg-gray-50 border-gray-100 text-gray-400'
                      : 'bg-white border-2 border-gray-100 text-gray-700 hover:border-primary-200 hover:bg-primary-50'
                    } border`}
                >
                  <span>{option}</span>
                  {showExplanation && index === q.answer && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  {showExplanation && index === selectedOption && index !== q.answer && <XCircle className="w-6 h-6 text-red-500" />}
                </button>
              ))}
            </div>
          )}

          {/* Rendering Short Answer Questions */}
          {q.type === 'short' && (
            <div className="space-y-6">
              <textarea
                value={shortAnswerInput}
                onChange={(e) => setShortAnswerInput(e.target.value)}
                disabled={showExplanation}
                placeholder="在此输入你的回答..."
                className="w-full h-40 p-6 rounded-2xl border-2 border-gray-100 bg-white focus:border-primary-200 focus:ring-0 transition-all outline-none text-gray-700 leading-relaxed"
              />
              {!showExplanation && (
                <button
                  onClick={handleShortAnswerConfirm}
                  disabled={!shortAnswerInput.trim()}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  提交回答并查看参考答案
                </button>
              )}
            </div>
          )}

          {/* Explanation / Reference Answer */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 space-y-6"
              >
                {q.type === 'short' && (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold">
                      <Check className="w-5 h-5" /> 参考答案
                    </div>
                    <p className="text-emerald-700 leading-relaxed">{q.referenceAnswer}</p>
                  </div>
                )}

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold">
                    <Info className="w-5 h-5" /> {q.type === 'choice' ? '解析' : '知识点拨'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{q.explanation}</p>

                  <button
                    onClick={nextQuestion}
                    className="mt-8 w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
                  >
                    {currentStep === QUESTIONS.length - 1 ? '查看结果' : '下一题'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-center gap-4 text-gray-400 text-sm">
        <AlertTriangle className="w-4 h-4" />
        {q.type === 'choice' ? '回答后将显示解析，无法修改答案' : '请认真作答，完成后可对照参考答案'}
      </div>
    </div>
  )
}
