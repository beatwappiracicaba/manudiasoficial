import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Input from '../../components/ui/Input';
import Upload from '../../components/ui/Upload';
import ImagePreview from '../../components/ui/ImagePreview';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Table from '../../components/ui/Table';

export default function PartnersEditor() {
  const { partners, loading, loadPartners, addPartner, updatePartner, deletePartner } = useDashboardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ name: '', logo: '', link: '' });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', logo: '', link: '' });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, logo: item.logo || '', link: item.link || '' });
    setImagePreview(item.logo || '');
    setIsModalOpen(true);
  };

  const handleImageChange = (file, url) => {
    setImagePreview(url);
    setForm((f) => ({ ...f, logo: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    if (editingId) {
      await updatePartner(editingId, form);
    } else {
      await addPartner(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deletePartner(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    {
      key: 'logo',
      label: 'Logo',
      render: (val) => <ImagePreview src={val} />,
    },
    { key: 'name', label: 'Nome' },
    {
      key: 'link',
      label: 'Link',
      render: (val) => (
        <a href={val} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm truncate block max-w-[200px]">
          {val || '-'}
        </a>
      ),
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
        title="Parceiros"
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
            data={partners}
            onEdit={openEdit}
            onDelete={(item) => setDeleteId(item.id)}
          />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Parceiro' : 'Novo Parceiro'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nome do parceiro"
            required
          />
          <Upload label="Logo" onChange={handleImageChange} />
          {imagePreview && <ImagePreview src={imagePreview} />}
          <Input
            label="Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
          />
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
        title="Excluir Parceiro"
        message="Tem certeza que deseja excluir este parceiro?"
      />
    </motion.div>
  );
}
