import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LOGO from '../../assets/img/LOGO1.jpeg'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-dark"
    >
      <div className="relative w-12 h-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-gold/30"
        />
        <motion.img
          src={LOGO}
          alt="Logo"
          className="absolute inset-0 m-auto w-6 h-6 rounded-full object-cover"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
