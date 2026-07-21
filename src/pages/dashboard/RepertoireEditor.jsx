import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Input from '../../components/ui/Input';

export default function RepertoireEditor() {
  const { repertoire, loading, loadRepertoire, addRepertoireCategory, updateRepertoireCategory, deleteRepertoireCategory } = useDashboardStore();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', songs: [] });
  const [songForm, setSongForm] = useState('');

  useEffect(() => {
    loadRepertoire();
  }, [loadRepertoire]);

  const openAddCategory = () => {
    setEditingId(null);
    setCategoryForm({ name: '', songs: [] });
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (cat) => {
    setEditingId(cat.id);
    setCategoryForm({ name: cat.name, songs: [...cat.songs] });
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryForm.name) return;
    if (editingId) {
      await updateRepertoireCategory(editingId, categoryForm);
    } else {
      await addRepertoireCategory(categoryForm);
    }
    setIsCategoryModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteRepertoireCategory(deleteId);
      setDeleteId(null);
    }
  };

  const openAddSong = (categoryId) => {
    setActiveCategoryId(categoryId);
    setSongForm('');
    setIsSongModalOpen(true);
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    if (!songForm.trim()) return;
    const cat = repertoire.find((c) => c.id === activeCategoryId);
    if (cat) {
      await updateRepertoireCategory(cat.id, { ...cat, songs: [...cat.songs, songForm.trim()] });
    }
    setIsSongModalOpen(false);
    setSongForm('');
  };

  const removeSong = async (categoryId, songIndex) => {
    const cat = repertoire.find((c) => c.id === categoryId);
    if (cat) {
      const newSongs = cat.songs.filter((_, idx) => idx !== songIndex);
      await updateRepertoireCategory(cat.id, { ...cat, songs: newSongs });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card
        title="Repertório"
        action={
          <button
            type="button"
            onClick={openAddCategory}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold text-sm hover:shadow-lg hover:shadow-gold/30 transition-all"
          >
            + Categoria
          </button>
        }
      >
        {loading ? (
          <div className="text-center text-gray-400 py-8">Carregando...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repertoire.map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gold">{cat.name}</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditCategory(cat)}
                      className="text-sm text-gray-300 hover:text-gold transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(cat.id)}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {cat.songs.map((song, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm text-gray-300">{song}</span>
                        <button
                          type="button"
                          onClick={() => removeSong(cat.id, idx)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ×
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={() => openAddSong(cat.id)}
                  className="w-full py-2 rounded-lg border border-dashed border-white/20 text-sm text-gray-400 hover:border-gold/50 hover:text-gold transition-all"
                >
                  + Adicionar música
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} title={editingId ? 'Editar Categoria' : 'Nova Categoria'}>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <Input
            label="Nome da Categoria"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
            placeholder="Ex: Modão"
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(false)}
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

      <Modal isOpen={isSongModalOpen} onClose={() => setIsSongModalOpen(false)} title="Adicionar Música">
        <form onSubmit={handleAddSong} className="space-y-4">
          <Input
            label="Nome da Música"
            value={songForm}
            onChange={(e) => setSongForm(e.target.value)}
            placeholder="Ex: Modão Raiz"
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsSongModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-gold text-dark font-bold hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Adicionar
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir Categoria"
        message="Tem certeza que deseja excluir esta categoria? Todas as músicas associadas serão removidas."
      />
    </motion.div>
  );
}
