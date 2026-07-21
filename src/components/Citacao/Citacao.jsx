import { motion } from 'framer-motion'
import Reveal from '../Reveal/Reveal'

export default function Citacao() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-card to-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <Reveal>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl text-gold/30 mb-6"
          >
            &ldquo;
          </motion.div>
          <blockquote className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-8">
            A música transforma momentos em <span className="text-gold-gradient font-bold">lembranças inesquecíveis</span>.
          </blockquote>
          <cite className="text-gold text-lg font-medium tracking-widest uppercase">Manu Dias</cite>
        </div>
      </Reveal>
    </section>
  )
}
