import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Footer from './components/Footer'

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && (
        <header>
          <Navbar />
        </header>
      )}
      <main className={isAdminPage ? '' : 'container mx-auto'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </>
  )
}

export default App
