import { motion } from 'framer-motion'
import SOBRE_IMG from '../../assets/img/FOTO3.jpeg'

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
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
            Sobre a <span className="text-gold-gradient">Manu</span>
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
              <img src={SOBRE_IMG} alt="Manu Dias" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gold/10 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gold">Natural de Piracicaba</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Manu Dias vem conquistando o público com sua voz marcante e carisma, levando ao palco
              grandes sucessos do sertanejo e apresentações cheias de emoção.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Conhecida como &quot;A Princesinha do Modão&quot;, ela reúne no repertório clássicos e
              músicas atuais, proporcionando experiências inesquecíveis ao público.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="glass-card p-6 text-center">
                <span className="block text-3xl font-bold text-gold mb-1">0</span>
                <span className="text-gray-400 text-sm">Shows realizados</span>
              </div>
              <div className="glass-card p-6 text-center">
                <span className="block text-3xl font-bold text-gold mb-1">0</span>
                <span className="text-gray-400 text-sm">Seguidores</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}