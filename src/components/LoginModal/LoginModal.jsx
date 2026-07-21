import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

export default function LoginModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md glass-card p-8 text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <FaTimes size={20} />
            </button>

            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="text-3xl">🚧</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Área do artista em desenvolvimento</h3>
            <p className="text-gray-300 mb-6">
              Em breve será possível acessar conteúdos exclusivos.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold hover:shadow-xl hover:shadow-gold/20 transition-all"
            >
              Entendi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}