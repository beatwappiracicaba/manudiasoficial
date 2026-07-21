import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/dashboard/ProtectedRoute'
import Layout from '../components/dashboard/Layout'
import DashboardHome from '../pages/dashboard/DashboardHome'
import HeroEditor from '../pages/dashboard/HeroEditor'
import AboutEditor from '../pages/dashboard/AboutEditor'
import HistoryEditor from '../pages/dashboard/HistoryEditor'
import AgendaEditor from '../pages/dashboard/AgendaEditor'
import GalleryEditor from '../pages/dashboard/GalleryEditor'
import InstagramEditor from '../pages/dashboard/InstagramEditor'
import SongsEditor from '../pages/dashboard/SongsEditor'
import RepertoireEditor from '../pages/dashboard/RepertoireEditor'
import TestimonialsEditor from '../pages/dashboard/TestimonialsEditor'
import PartnersEditor from '../pages/dashboard/PartnersEditor'
import NewsletterEditor from '../pages/dashboard/NewsletterEditor'
import ContactEditor from '../pages/dashboard/ContactEditor'
import SEOEditor from '../pages/dashboard/SEOEditor'
import SettingsEditor from '../pages/dashboard/SettingsEditor'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="pagina-inicial">
          <Route path="hero" element={<HeroEditor />} />
          <Route path="sobre" element={<AboutEditor />} />
          <Route path="historia" element={<HistoryEditor />} />
          <Route path="agenda" element={<AgendaEditor />} />
          <Route path="galeria" element={<GalleryEditor />} />
          <Route path="instagram" element={<InstagramEditor />} />
          <Route path="musicas" element={<SongsEditor />} />
          <Route path="repertorio" element={<RepertoireEditor />} />
          <Route path="depoimentos" element={<TestimonialsEditor />} />
          <Route path="parceiros" element={<PartnersEditor />} />
          <Route path="newsletter" element={<NewsletterEditor />} />
          <Route path="contato" element={<ContactEditor />} />
        </Route>
        <Route path="seo" element={<SEOEditor />} />
        <Route path="configuracoes">
          <Route path="conta" element={<SettingsEditor />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
