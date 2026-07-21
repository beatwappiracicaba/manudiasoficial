import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Upload from '../../components/ui/Upload';
import ImagePreview from '../../components/ui/ImagePreview';
import Card from '../../components/ui/Card';

export default function SettingsEditor() {
  const { settings, loading, loadSettings, updateSettings } = useDashboardStore();
  const [form, setForm] = useState({
    artistName: '',
    slogan: '',
    logo: '',
    favicon: '',
    primaryColor: '#D4AF37',
    secondaryColor: '#111111',
    socials: { instagram: '', youtube: '', spotify: '', tiktok: '' },
  });
  const [logoPreview, setLogoPreview] = useState('');
  const [faviconPreview, setFaviconPreview] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (settings.artistName) {
      setForm(settings);
      setLogoPreview(settings.logo || '');
      setFaviconPreview(settings.favicon || '');
    }
  }, [settings]);

  const handleLogoChange = (file, url) => {
    setLogoPreview(url);
    setForm((f) => ({ ...f, logo: url }));
  };

  const handleFaviconChange = (file, url) => {
    setFaviconPreview(url);
    setForm((f) => ({ ...f, favicon: url }));
  };

  const handleSocialChange = (field) => (e) => {
    setForm((f) => ({
      ...f,
      socials: { ...f.socials, [field]: e.target.value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title="Configurações">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Nome do Artista"
                value={form.artistName}
                onChange={(e) => setForm({ ...form, artistName: e.target.value })}
                placeholder="Nome"
              />
              <Input
                label="Slogan"
                value={form.slogan}
                onChange={(e) => setForm({ ...form, slogan: e.target.value })}
                placeholder="Slogan"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Upload label="Logo" onChange={handleLogoChange} />
              <Upload label="Favicon" onChange={handleFaviconChange} />
            </div>
            {logoPreview && <ImagePreview src={logoPreview} onRemove={() => { setLogoPreview(''); setForm((f) => ({ ...f, logo: '' })); }} />}
            {faviconPreview && <ImagePreview src={faviconPreview} onRemove={() => { setFaviconPreview(''); setForm((f) => ({ ...f, favicon: '' })); }} />}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cor Primária</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={form.primaryColor}
                    onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cor Secundária</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={form.secondaryColor}
                    onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-gold">Redes Sociais</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Instagram"
                  value={form.socials.instagram}
                  onChange={handleSocialChange('instagram')}
                  placeholder="https://instagram.com/..."
                />
                <Input
                  label="YouTube"
                  value={form.socials.youtube}
                  onChange={handleSocialChange('youtube')}
                  placeholder="https://youtube.com/..."
                />
                <Input
                  label="Spotify"
                  value={form.socials.spotify}
                  onChange={handleSocialChange('spotify')}
                  placeholder="https://spotify.com/..."
                />
                <Input
                  label="TikTok"
                  value={form.socials.tiktok}
                  onChange={handleSocialChange('tiktok')}
                  placeholder="https://tiktok.com/..."
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              {saved && <span className="text-sm text-green-400">Salvo com sucesso!</span>}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </Card>
    </motion.div>
  );
}
