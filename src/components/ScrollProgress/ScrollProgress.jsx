import useScrollProgress from '../../hooks/useScrollProgress'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-gold via-yellow-500 to-gold z-[60]"
      style={{ width: `${progress}%` }}
    />
  )
}
