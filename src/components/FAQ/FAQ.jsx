import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../Reveal/Reveal'
import { FaPlus, FaMinus } from 'react-icons/fa'

const defaultFaqs = [
  { question: 'Como contratar um show da Manu Dias?', answer: 'Entre em contato pelo WhatsApp oficial, informe a data, local e tipo de evento. Nossa equipe retornará com disponibilidade e valores.' },
  { question: 'Quais tipos de eventos são atendidos?', answer: 'Shows em festas, casamentos, eventos corporativos, festivais e apresentações em todo o Brasil.' },
  { question: 'O repertório pode ser personalizado?', answer: 'Sim! Montamos um repertório exclusivo para cada evento, combinando modão, universitário, raiz e clássicos.' },
  { question: 'Quanto tempo de antecedência devo reservar?', answer: 'Recomendamos contato com pelo menos 30 dias de antecedência para garantir a melhor data.' },
]

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = items && items.length > 0 ? items : defaultFaqs

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Perguntas</span> Frequentes
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.div
                className="glass-card overflow-hidden"
                whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gold"
                  >
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
