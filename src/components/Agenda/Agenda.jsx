import { motion } from 'framer-motion'
import { FaCalendarAlt } from 'react-icons/fa'

export default function Agenda({ items }) {
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
          {items && items.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 sm:p-12 space-y-4"
            >
              {items.map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div>
                    <p className="text-white font-medium">{item.venue || 'Local a definir'}</p>
                    <p className="text-gray-400 text-sm">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-medium">{item.date ? new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR') : 'Data a definir'}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.status === 'confirmed' ? 'Confirmado' : 'Pendente'}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  )
}