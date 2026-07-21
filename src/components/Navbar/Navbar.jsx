import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import LOGO from '../../assets/img/LOGO1.jpeg'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#momentos', label: 'Momentos' },
  { href: '#musicas', label: 'Músicas' },
  { href: '#contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 50))
  }, [scrollY])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20' : 'bg-transparent'
      }`}
      style={{ opacity: bgOpacity }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gold/50 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/30 transition-all duration-300">
              <img src={LOGO} alt="Manu Dias" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-wide">
              Manu <span className="text-gold">Dias</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-semibold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Login
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl p-2 relative z-50"
            aria-label="Menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          className={`md:hidden overflow-hidden bg-dark/95 backdrop-blur-xl rounded-b-2xl border-b border-white/10`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-semibold"
            >
              Login
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
