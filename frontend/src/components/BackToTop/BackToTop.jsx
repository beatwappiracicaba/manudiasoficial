import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FaChevronUp } from 'react-icons/fa'

export default function BackToTop() {
  const { scrollY } = useScroll()
  const clampedScroll = useTransform(scrollY, [0, 500], [0, 1], { clamp: true })
  const scale = useSpring(clampedScroll, {
    stiffness: 100,
    damping: 20,
  })

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-dark-card/80 backdrop-blur-xl border border-white/10 text-gold flex items-center justify-center shadow-lg hover:shadow-gold/20"
      style={{ scale }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Voltar ao topo"
    >
      <FaChevronUp size={20} />
    </motion.button>
  )
}
