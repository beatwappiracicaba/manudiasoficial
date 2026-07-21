import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import LOGO from '../../assets/img/LOGO1.jpeg'

const navLinks = [
  { href: '/#home', label: 'Home', isHash: true },
  { href: '/#sobre', label: 'Sobre', isHash: true },
  { href: '/#agenda', label: 'Agenda', isHash: true },
  { href: '/#galeria', label: 'Galeria', isHash: true },
  { href: '/#momentos', label: 'Momentos', isHash: true },
  { href: '/#musicas', label: 'Músicas', isHash: true },
  { href: '/#contato', label: 'Contato', isHash: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 50))
  }, [scrollY])

  const handleNavClick = () => setMobileOpen(false)

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/#home" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-12 rounded-full overflow-hidden border-2 border-gold/50 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/30 transition-all duration-300 flex-shrink-0">
              <img src={LOGO} alt="Manu Dias" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm sm:text-lg font-bold tracking-wide">
              Manu <span className="text-gold">Dias</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Login
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 text-gold"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className={`md:hidden overflow-hidden bg-dark/95 backdrop-blur-xl rounded-b-2xl border-b border-white/10 z-50`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className="block text-base font-medium text-gray-300 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={handleNavClick}
              className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-semibold"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
