import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'

export default function VideoPlayer() {
  return (
    <section id="video" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Vídeo</span> de Apresentação
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-card p-4 sm:p-8 aspect-video flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-gold/5" />
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold text-3xl border border-gold/20"
              >
                ▶
              </motion.div>
              <p className="text-gray-400">Vídeo de apresentação em breve</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
