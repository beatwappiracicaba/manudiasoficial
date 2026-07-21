import { motion } from 'framer-motion'
import { FaCalendarAlt } from 'react-icons/fa'

export default function Agenda() {
  return (
    <section id="agenda" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Agenda de <span className="text-gold-gradient">Shows</span>
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 sm:p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <FaCalendarAlt className="text-gold text-3xl" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Agenda em breve</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Novas datas serão divulgadas aqui.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Fique atento às redes sociais para não perder nenhuma apresentação.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}