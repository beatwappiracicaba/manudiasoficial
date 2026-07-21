import { motion } from 'framer-motion'
import { FaPlay, FaInstagram } from 'react-icons/fa'

export default function Musicas({ songs }) {
  return (
    <section id="musicas" className="py-24 relative">
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
            <span className="text-gold-gradient">Músicas</span> e Lançamentos
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {songs && songs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 sm:p-14"
            >
              <div className="space-y-4">
                {songs.map((song, index) => (
                  <div key={song.id || index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        {song.cover ? <img src={song.cover} alt={song.title} className="w-full h-full rounded-full object-cover" /> : <FaPlay className="ml-0.5" />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{song.title}</p>
                        <p className="text-xs text-gray-500">{song.duration || ''}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-10 sm:p-14 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center">
                <FaPlay className="text-gold text-3xl ml-1" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Em breve</h3>
              <p className="text-gray-300 text-lg mb-3">
                Novos lançamentos em breve
              </p>
              <p className="text-gray-400">
                Os próximos clipes e músicas estarão disponíveis aqui.
              </p>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a
            href="https://www.instagram.com/manudiasoficial1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
          >
            <FaInstagram size={24} />
            <span className="text-sm">Acompanhe no Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}