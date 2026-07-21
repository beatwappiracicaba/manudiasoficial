import { useDashboardStore } from '../../store/dashboardStore';
import { motion } from 'framer-motion';
import { FaMusic, FaListUl, FaQuoteLeft, FaHandshake, FaRss, FaAddressCard, FaSearch, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';

export default function DashboardHome() {
  const { history, agenda, gallery, songs, repertoire, testimonials, partners, newsletter, contact, seo, settings } = useDashboardStore();

  const stats = [
    { label: 'Shows na Agenda', value: agenda?.length || 0, icon: FaMusic, to: '/dashboard/agenda' },
    { label: 'Itens de História', value: history?.length || 0, icon: FaListUl, to: '/dashboard/history' },
    { label: 'Galeria', value: gallery?.length || 0, icon: FaQuoteLeft, to: '/dashboard/gallery' },
    { label: 'Músicas', value: songs?.length || 0, icon: FaMusic, to: '/dashboard/songs' },
    { label: 'Categorias de Repertório', value: repertoire?.length || 0, icon: FaListUl, to: '/dashboard/repertoire' },
    { label: 'Depoimentos', value: testimonials?.length || 0, icon: FaQuoteLeft, to: '/dashboard/testimonials' },
    { label: 'Parceiros', value: partners?.length || 0, icon: FaHandshake, to: '/dashboard/partners' },
    { label: 'Newsletter', value: newsletter?.title ? 1 : 0, icon: FaRss, to: '/dashboard/newsletter' },
    { label: 'Contato', value: contact?.email ? 1 : 0, icon: FaAddressCard, to: '/dashboard/contact' },
    { label: 'SEO', value: seo?.title ? 1 : 0, icon: FaSearch, to: '/dashboard/seo' },
    { label: 'Configurações', value: settings?.artistName ? 1 : 0, icon: FaCog, to: '/dashboard/settings' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card title="Bem-vindo, Manu!" className="text-center">
        <p className="text-gray-300 text-lg mb-2">Área administrativa do site</p>
        <p className="text-gray-500 text-sm">Atualize conteúdos, gerencie músicas, agenda e muito mais.</p>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
