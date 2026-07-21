import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Upload from '../../components/ui/Upload';
import ImagePreview from '../../components/ui/ImagePreview';
import Card from '../../components/ui/Card';

export default function SEOEditor() {
  const { seo, loading, loadSEO, updateSEO } = useDashboardStore();
  const [form, setForm] = useState({ title: '', description: '', keywords: '', ogImage: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSEO();
  }, [loadSEO]);

  useEffect(() => {
    if (seo.title) {
      setForm(seo);
      setImagePreview(seo.ogImage || '');
    }
  }, [seo]);

  const handleImageChange = (file, url) => {
    setImagePreview(url);
    setForm((f) => ({ ...f, ogImage: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSEO(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title="SEO">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input
              label="Título SEO"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título da página"
            />
            <Textarea
              label="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição meta..."
              rows={3}
            />
            <Input
              label="Palavras-chave"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              placeholder="palavra1, palavra2, palavra3"
            />
            <Upload label="Imagem OG" onChange={handleImageChange} />
            {imagePreview && <ImagePreview src={imagePreview} />}
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
