import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Upload from '../../components/ui/Upload';
import ImagePreview from '../../components/ui/ImagePreview';
import Card from '../../components/ui/Card';

export default function ContactEditor() {
  const { contact, loading, loadContact, updateContact } = useDashboardStore();
  const [form, setForm] = useState({ whatsapp: '', instagram: '', email: '', address: '', map: '' });
  const [mapPreview, setMapPreview] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadContact();
  }, [loadContact]);

  useEffect(() => {
    if (contact.whatsapp || contact.email) {
      setForm(contact);
      setMapPreview(contact.map || '');
    }
  }, [contact]);

  const handleMapChange = (file, url) => {
    setMapPreview(url);
    setForm((f) => ({ ...f, map: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title="Contato">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input
              label="WhatsApp"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="5511999999999"
            />
            <Input
              label="Instagram"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="@usuario"
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contato@email.com"
            />
            <Input
              label="Endereço"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Cidade, UF - País"
            />
            <Upload label="Mapa (imagem)" onChange={handleMapChange} />
            {form.map && <ImagePreview src={form.map} onRemove={() => { setMapPreview(''); setForm((f) => ({ ...f, map: '' })); }} />}
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
