import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Upload from '../../components/ui/Upload';
import ImagePreview from '../../components/ui/ImagePreview';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Table from '../../components/ui/Table';

export default function TestimonialsEditor() {
  const { testimonials, loading, loadTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useDashboardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ name: '', text: '', photo: '' });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', text: '', photo: '' });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, text: item.text, photo: item.photo || '' });
    setImagePreview(item.photo || '');
    setIsModalOpen(true);
  };

  const handleImageChange = (file, url) => {
    setImagePreview(url);
    setForm((f) => ({ ...f, photo: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    if (editingId) {
      await updateTestimonial(editingId, form);
    } else {
      await addTestimonial(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteTestimonial(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    { key: 'name', label: 'Nome' },
    {
      key: 'text',
      label: 'Texto',
      render: (val) => (
        <span className="line-clamp-2 max-w-xs">{val}</span>
      ),
    },
    {
      key: 'photo',
      label: 'Foto',
      render: (val) => <ImagePreview src={val} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card
        title="Depoimentos"
        action={
          <button
            type="button"
            onClick={openAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all"
          >
            + Adicionar
          </button>
        }
      >
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <Table
            columns={columns}
            data={testimonials}
            onEdit={openEdit}
            onDelete={(item) => setDeleteId(item.id)}
          />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Depoimento' : 'Novo Depoimento'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nome da pessoa"
            required
          />
          <Textarea
            label="Depoimento"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Escreva o depoimento..."
            rows={4}
            required
          />
          <Upload label="Foto" onChange={handleImageChange} />
          {imagePreview && <ImagePreview src={imagePreview} />}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir Depoimento"
        message="Tem certeza que deseja excluir este depoimento?"
      />
    </motion.div>
  );
}
