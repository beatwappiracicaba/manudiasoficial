import { motion } from 'framer-motion'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Contato() {
  return (
    <section id="contato" className="py-24 relative">
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
            <span className="text-gold-gradient">Contato</span>
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <motion.a
            href="https://www.instagram.com/manudiasoficial1/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-8 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaInstagram className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instagram</h3>
            <p className="text-gray-400 mb-4">@manudiasoficial1</p>
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
              Seguir <FaInstagram />
            </span>
          </motion.a>

          <motion.a
            href="https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="glass-card p-8 text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaWhatsapp className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-gray-400 mb-4">WhatsApp da produtora</p>
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
              Enviar mensagem <FaWhatsapp />
            </span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center glass-card p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-gold">Contratações de shows</h3>
          <p className="text-gray-300 text-lg">
            Entre em contato com nossa produção.
          </p>
          <p className="text-gray-400 mt-3">
            Solicite orçamentos, disponibilidade de agenda e mais informações.
          </p>
        </motion.div>
      </div>
    </section>
  )
}