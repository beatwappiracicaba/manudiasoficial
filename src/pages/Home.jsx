import { motion } from 'framer-motion'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Sobre from '../components/Sobre/Sobre'
import Agenda from '../components/Agenda/Agenda'
import Momentos from '../components/Momentos/Momentos'
import Citacao from '../components/Citacao/Citacao'
import Galeria from '../components/Galeria/Galeria'
import Timeline from '../components/Timeline/Timeline'
import Estatisticas from '../components/Estatisticas/Estatisticas'
import Musicas from '../components/Musicas/Musicas'
import Playlist from '../components/Playlist/Playlist'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import Repertorio from '../components/Repertorio/Repertorio'
import Contratacoes from '../components/Contratacoes/Contratacoes'
import FAQ from '../components/FAQ/FAQ'
import MensagemArtista from '../components/MensagemArtista/MensagemArtista'
import Countdown from '../components/Countdown/Countdown'
import Contato from '../components/Contato/Contato'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark relative">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Sobre />
          <Agenda />
          <Momentos />
          <Citacao />
          <Galeria />
          <Timeline />
          <Estatisticas />
          <Musicas />
          <Playlist />
          <VideoPlayer />
          <Repertorio />
          <Contratacoes />
          <FAQ />
          <MensagemArtista />
          <Countdown />
          <Contato />
          <Footer />
        </main>
      </div>
    </div>
  )
}
