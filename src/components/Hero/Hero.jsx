import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaChevronDown } from 'react-icons/fa'
import Particles from '../Particles/Particles'
import StageLights from '../StageLights/StageLights'
import HERO_IMG from '../../assets/img/FOTO1.jpeg'

export default function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -150])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark z-10" />
          <motion.img
            src={HERO_IMG}
            alt="Manu Dias"
            className="w-full h-full object-cover object-top scale-110"
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50 z-10" />
        <StageLights />
        <Particles />
      </div>

      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ opacity }}
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium text-gold tracking-wider uppercase">
              A Princesinha do Modão
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-6 leading-tight"
          >
            Manu <span className="text-gold-gradient">Dias</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-300 font-light mb-4"
          >
            A emoção do sertanejo em cada apresentação.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg text-gray-400 mb-10 leading-relaxed"
          >
            Conheça a trajetória, agenda de shows e acompanhe todos os lançamentos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-lg shadow-2xl shadow-gold/30 transition-all flex items-center gap-2"
            >
              <FaWhatsapp />
              Contratar Show
            </motion.a>
            <motion.a
              href="https://www.instagram.com/manudiasoficial1/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full glass font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <FaInstagram />
              Instagram
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 tracking-widest uppercase">Role para descobrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gold"
        >
          <FaChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
