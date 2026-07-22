import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import FOTO1 from '../../assets/img/FOTO1.jpeg'
import FOTO2 from '../../assets/img/FOTO2.jpeg'
import FOTO3 from '../../assets/img/FOTO3.jpeg'
import PRIMEIRA_VEZ from '../../assets/videos/primeiravez.mp4'

const momentos = [
  {
    image: FOTO1,
    title: 'O Início',
    text: 'A paixão pela música começou ainda na infância, cantando na igreja e encantando todos com sua voz. Com o incentivo e apoio dos pais, Manu decidiu seguir o sonho de construir uma carreira na música. Hoje, conta com o acompanhamento de um professor de canto, uma assessora e um produtor musical, dedicando-se diariamente para levar o melhor do sertanejo ao seu público.',
    type: 'image'
  },
  {
    video: PRIMEIRA_VEZ,
    title: 'A Primeira Vez no Palco',
    text: 'Em outubro de 2024, Manu deu seu primeiro passo nos palcos em uma participação especial em um evento, realizando sua primeira apresentação profissional no formato voz e violão. Foi um momento marcante que deu início à sua trajetória artística e fortaleceu ainda mais o sonho de seguir carreira na música.',
    type: 'video'
  },
  {
    image: FOTO3,
    title: 'A Princesinha do Modão',
    text: 'Carisma, voz marcante e muito sentimento conquistaram o público e consolidaram o título de A Princesinha do Modão.',
    type: 'image'
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
                  {momento.type === 'video' ? (
                    <video
                      src={momento.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-top"
                    />
                  ) : (
                    <img src={momento.image} alt={momento.title} loading="lazy" className="w-full h-auto object-top" />
                  )}
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
