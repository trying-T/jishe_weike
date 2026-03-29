import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BrainCircuit, Home, BookOpen, PlayCircle, BarChart3, HelpCircle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/overview', label: '教学概览', icon: Info },
  { path: '/simulation', label: '算法模拟', icon: PlayCircle },
  { path: '/visualization', label: '实时可视化', icon: BarChart3 },
  { path: '/learn', label: '学习模块', icon: BookOpen },
  { path: '/quiz', label: '知识测验', icon: HelpCircle },
]

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isHome
          ? 'bg-black/20 backdrop-blur-md border-b border-white/5'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary-600 p-1.5 rounded-lg">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${isHome ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-500'}`}>
                  AlgoLens
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${location.pathname === item.path
                      ? (isHome ? 'text-primary-400 bg-white/5' : 'text-primary-600 bg-primary-50')
                      : (isHome ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50')
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              {isHome && (
                <Link
                  to="/simulation"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white/10 transition-all gap-2"
                >
                  <PlayCircle className="w-4 h-4" /> 开始模拟
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${isHome ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                  }`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b ${isHome ? 'bg-black/90 border-white/5' : 'bg-white border-gray-200'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${location.pathname === item.path
                        ? (isHome ? 'text-primary-400 bg-white/5' : 'text-primary-600 bg-primary-50')
                        : (isHome ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50')
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className={`py-8 transition-colors duration-300 ${isHome ? 'bg-black border-t border-white/5' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-sm ${isHome ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2026 AlgoLens - AI算法偏见教学平台 | 助力提升批判性算法素养
          </p>
        </div>
      </footer>
    </div>
  )
}
