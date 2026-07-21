import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';

export default function NewsletterEditor() {
  const { newsletter, loading, loadNewsletter, updateNewsletter } = useDashboardStore();
  const [form, setForm] = useState({ title: '', description: '', placeholder: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadNewsletter();
  }, [loadNewsletter]);

  useEffect(() => {
    if (newsletter.title || newsletter.description) {
      setForm(newsletter);
    }
  }, [newsletter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNewsletter(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title="Newsletter">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <Input
              label="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título da newsletter"
            />
            <Textarea
              label="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição..."
              rows={3}
            />
            <Input
              label="Placeholder"
              value={form.placeholder}
              onChange={(e) => setForm({ ...form, placeholder: e.target.value })}
              placeholder="Texto do campo de e-mail"
            />
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
