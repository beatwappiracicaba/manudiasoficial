import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import LOGO from '../assets/img/LOGO1.jpeg'
import LOGIN_IMG from '../assets/img/FOTO2.jpeg'

const quotes = [
  { text: 'A emoção do sertanejo em cada apresentação.', author: 'A Princesinha do Modão' },
  { text: 'Natural de Piracicaba, levando arte por onde passa.', author: 'Trajetória' },
  { text: 'Voz marcante, carisma e muito sentimento.', author: 'Manu Dias' },
  { text: 'Clássicos e lançamentos em um só show.', author: 'Repertório' },
]

export default function Login() {
  const [activeQuote, setActiveQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row overflow-hidden">
      <div className="hidden md:flex w-1/2 relative items-center justify-center p-10">
        <div className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
          <img
            src={LOGIN_IMG}
            alt="Manu Dias"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              key={activeQuote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white text-xl sm:text-2xl font-light leading-snug mb-3">
                &ldquo;{quotes[activeQuote].text}&rdquo;
              </p>
              <span className="text-gold text-sm uppercase tracking-widest">
                {quotes[activeQuote].author}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg shadow-gold/10">
              <img src={LOGO} alt="Manu Dias" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Manu <span className="text-gold">Dias</span>
            </h1>
            <p className="text-gray-400 text-sm uppercase tracking-[0.3em]">Área do artista</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-lg hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 hover:scale-[1.02]"
            >
              Entrar
            </button>

            <p className="text-gray-500 text-xs text-center">
              Ainda não tem conta? Entre em contato com a produção.
            </p>
          </form>

          <p className="text-center mt-6">
            <a href="/" className="text-gray-400 hover:text-gold transition-colors text-sm">
              Voltar para o site
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}