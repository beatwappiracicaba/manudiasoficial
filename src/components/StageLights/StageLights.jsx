import { motion } from 'framer-motion'

export default function StageLights() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: ['0%', '10%', '0%'], y: ['0%', '5%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/10 rounded-full blur-[100px] sm:blur-[120px]"
      />
      <motion.div
        animate={{ x: ['0%', '-10%', '0%'], y: ['0%', '-5%', '0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-yellow-500/10 rounded-full blur-[80px] sm:blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-gold/5 rounded-full blur-[100px] sm:blur-[130px] md:blur-[150px]"
      />
    </div>
  )
}
