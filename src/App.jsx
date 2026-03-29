import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Simulation from './pages/Simulation'
import Visualization from './pages/Visualization'
import Learn from './pages/Learn'
import Quiz from './pages/Quiz'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
