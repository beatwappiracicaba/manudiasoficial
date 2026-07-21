import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Sobre from '../components/Sobre/Sobre'
import Agenda from '../components/Agenda/Agenda'
import Galeria from '../components/Galeria/Galeria'
import Musicas from '../components/Musicas/Musicas'
import Contato from '../components/Contato/Contato'
import Footer from '../components/Footer/Footer'

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Agenda />
        <Galeria />
        <Musicas />
        <Contato />
        <Footer />
      </main>
    </div>
  )
}