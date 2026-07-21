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

export default function SongsEditor() {
  const { songs, loading, loadSongs, addSong, updateSong, deleteSong } = useDashboardStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', duration: '', cover: '' });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: '', duration: '', cover: '' });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEdit = (song) => {
    setEditingId(song.id);
    setForm({ title: song.title, duration: song.duration, cover: song.cover || '' });
    setImagePreview(song.cover || '');
    setIsModalOpen(true);
  };

  const handleImageChange = (file, url) => {
    setImagePreview(url);
    setForm((f) => ({ ...f, cover: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.duration) return;
    if (editingId) {
      await updateSong(editingId, form);
    } else {
      await addSong(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteSong(deleteId);
      setDeleteId(null);
    }
  };

  const columns = [
    { key: 'title', label: 'Título' },
    { key: 'duration', label: 'Duração' },
    {
      key: 'cover',
      label: 'Capa',
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
        title="Músicas"
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
            data={songs}
            onEdit={openEdit}
            onDelete={(song) => setDeleteId(song.id)}
          />
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Editar Música' : 'Nova Música'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Nome da música"
            required
          />
          <Input
            label="Duração"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="Ex: 3:45"
            required
          />
          <Upload label="Capa" onChange={handleImageChange} />
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
        title="Excluir Música"
        message="Tem certeza que deseja excluir esta música? Esta ação não pode ser desfeita."
      />
    </motion.div>
  );
}
