import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import { FaTimes } from 'react-icons/fa'

const defaultCategories = [
  {
    titulo: 'Modão',
    descricao: 'Os maiores sucessos do sertanejo raiz e universidade.',
    musicas: ['Evidências', 'Fio de Cabelo', 'Mentirosa', 'Vida de Caboclo'],
  },
  {
    titulo: 'Universitário',
    descricao: 'Hits atuais que agitam qualquer festa.',
    musicas: ['Open Bar', 'A Mãe', 'Bem Guardado', 'Bebaça'],
  },
  {
    titulo: 'Raiz',
    descricao: 'Clássicos que marcaram gerações.',
    musicas: ['Boate Azul', 'Pense em Mim', 'No Dia em Que Eu Saí de Casa', 'Amar é Magia'],
  },
  {
    titulo: 'Clássicos',
    descricao: 'Seleção especial com as músicas mais pedidas.',
    musicas: ['Caminhoneiro', 'Página Virada', 'Eu Não Vivo Sem Você', 'Meu Disfarce'],
  },
]

export default function Repertorio({ categories }) {
  const [active, setActive] = useState(null)
  const data = categories && categories.length > 0 ? categories : defaultCategories

  return (
    <section id="repertorio" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Repertório</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((cat, index) => (
            <Reveal key={cat.name || cat.id || index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActive(cat)}
                className="glass-card p-6 cursor-pointer group"
              >
                <h3 className="text-2xl font-bold mb-3 text-gold group-hover:text-white transition-colors">
                  {cat.name || cat.titulo}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{cat.descricao || ''}</p>
                <span className="text-gold text-sm font-medium">Ver repertório &rarr;</span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark/90 backdrop-blur-xl"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card p-8 max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Fechar"
                >
                  <FaTimes size={20} />
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gold">{active.name || active.titulo}</h3>
                <ul className="space-y-2 text-gray-300">
                  {(active.songs || []).map((musica) => (
                    <li key={musica} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {musica}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
