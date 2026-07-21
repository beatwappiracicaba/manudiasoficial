import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import LOGO from '../../assets/img/LOGO1.jpeg'

export default function MensagemArtista() {
  return (
    <section id="mensagem" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Mensagem</span> da Artista
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
              <img
                src={LOGO}
                alt="Manu Dias"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gold">Olá, eu sou a Manu!</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Queridos fãs e amigos, obrigada pelo carinho e por cada momento vivido juntos.
                A música é a minha forma de expressar tudo o que sinto, e ter vocês ao lado faz toda a diferença.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Sigamos juntos nessa jornada, porque o melhor ainda está por vir. Um beijo grande no coração de cada um!
              </p>
              <div className="pt-4">
                <span className="text-gold text-sm uppercase tracking-widest">— Manu Dias</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
