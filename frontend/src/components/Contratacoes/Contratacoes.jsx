import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contratacoes() {
  return (
    <section id="contratacoes" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Contratações</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop"
                alt="Show ao vivo"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gold">Leve a emoção do sertanejo para seu evento</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Manu Dias traz voz marcante, carisma e muito sentimento para shows inesquecíveis.
                Solicite orçamentos e disponibilidade de agenda.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="https://api.whatsapp.com/message/ECULPKJI3KMFF1?autoload=1&app_absent=0&utm_source=ig"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg shadow-lg shadow-green-500/20"
                >
                  <FaWhatsapp />
                  Solicitar orçamento
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
