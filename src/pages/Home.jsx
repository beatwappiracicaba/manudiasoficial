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
import { useDashboardStore } from '../store/dashboardStore'

export default function Home() {
  const settings = useDashboardStore((s) => s.settings)
  const hero = useDashboardStore((s) => s.hero)
  const about = useDashboardStore((s) => s.about)
  const agenda = useDashboardStore((s) => s.agenda)
  const contact = useDashboardStore((s) => s.contact)

  return (
    <div className="min-h-screen bg-dark relative">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero
            title={hero.title}
            subtitle={hero.subtitle}
            description={hero.description}
            buttons={hero.buttons}
          />
          <Sobre
            title={about.title}
            text={about.text}
            image={about.image}
          />
          <Agenda items={agenda} />
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
          <Contato
            whatsapp={contact.whatsapp}
            instagram={contact.instagram}
            email={contact.email}
            address={contact.address}
          />
          <Footer
            artistName={settings.artistName}
            slogan={settings.slogan}
            socials={settings.socials}
          />
        </main>
      </div>
    </div>
  )
}
