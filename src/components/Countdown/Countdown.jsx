import { useState, useEffect } from 'react'
import Reveal from '../Reveal/Reveal'

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))
  const [eventPassed, setEventPassed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const left = getTimeLeft(targetDate)
      setTimeLeft(left)
      if (left.total <= 0) {
        setEventPassed(true)
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section id="countdown" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Fique ligado</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-card p-8 sm:p-12 text-center max-w-3xl mx-auto">
            {eventPassed ? (
              <p className="text-2xl text-gold font-bold">Novo anúncio em breve</p>
            ) : (
              <div className="grid grid-cols-4 gap-4 sm:gap-8">
                {Object.entries({
                  Dias: timeLeft.days,
                  Horas: timeLeft.hours,
                  Minutos: timeLeft.minutes,
                  Segundos: timeLeft.seconds,
                }).map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <div className="text-4xl sm:text-6xl font-bold text-gold font-mono">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 uppercase text-xs sm:text-sm tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-8 text-gray-400">
              Acompanhe nossas redes sociais para acompanhar lançamentos e novidades.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function getTimeLeft(target) {
  const now = new Date()
  const diff = new Date(target || '2025-12-31T23:59:59') - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  }
}
