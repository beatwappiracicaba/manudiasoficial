import Reveal from '../Reveal/Reveal'
import useCounters from '../../hooks/useCounters'

const stats = [
  { value: 150, label: 'Shows realizados', suffix: '+' },
  { value: 50, label: 'Cidades visitadas', suffix: '+' },
  { value: 120, label: 'Seguidores', suffix: 'K' },
  { value: 10, label: 'Anos de carreira', suffix: '' },
]

export default function Estatisticas() {
  return (
    <section id="estatisticas" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Números que <span className="text-gold-gradient">inspiram</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }) {
  const { ref, counts } = useCounters([stat.value], 2000 + index * 200)

  return (
    <Reveal delay={index * 0.1}>
      <div ref={ref} className="glass-card p-8 text-center group hover:border-gold/30 transition-all duration-500">
        <span className="block text-4xl md:text-5xl font-bold text-gold mb-2">
          {counts[0]}{stat.suffix}
        </span>
        <span className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</span>
      </div>
    </Reveal>
  )
}
