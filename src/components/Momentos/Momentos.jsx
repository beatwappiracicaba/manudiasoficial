import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import FOTO1 from '../../assets/img/FOTO1.jpeg'
import FOTO2 from '../../assets/img/FOTO2.jpeg'
import FOTO3 from '../../assets/img/FOTO3.jpeg'

const momentos = [
  {
    image: FOTO1,
    title: 'O Início',
    text: 'Desde pequena, Manu já mostrava seu talento natural para a música, encantando familiares e amigos nas apresentações escolares.',
  },
  {
    image: FOTO2,
    title: 'A Primeira Vez no Palco',
    text: 'A emoção da primeira apresentação profissional marcou o início de uma trajetória de dedicação e amor pela arte.',
  },
  {
    image: FOTO3,
    title: 'A Princesinha do Modão',
    text: 'Carisma, voz marcante e muito sentimento conquistaram o público e consolidaram o título de A Princesinha do Modão.',
  },
]

export default function Momentos() {
  return (
    <section id="momentos" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Momentos</span> Inesquecíveis
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="space-y-24">
          {momentos.map((momento, index) => (
            <Reveal key={momento.title} delay={index * 0.2}>
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                >
                  <img src={momento.image} alt={momento.title} loading="lazy" className="w-full h-auto object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                </motion.div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'md:text-left md:col-start-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-gold">{momento.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{momento.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
