import Reveal from '../Reveal/Reveal'

export default function Playlist({ title, description }) {
  return (
    <section id="playlist" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Playlist</span> Favorita
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="glass-card p-8 sm:p-12 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
            <span className="text-5xl">🎵</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{title || 'As melhores do modão'}</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            {description || 'Clássicos e lançamentos reunidos em uma seleção especial para você curtir a qualquer momento.'}
          </p>
          <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm text-gold border-gold/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Playlist em breve
          </div>
        </div>
      </div>
    </section>
  )
}
