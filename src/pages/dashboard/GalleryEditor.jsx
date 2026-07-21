import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import useDashboardStore from '../../store/dashboardStore'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import ImagePreview from '../../components/ui/ImagePreview'
import Upload from '../../components/ui/Upload'
import Button from '../../components/ui/Button'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const emptyForm = { src: '', caption: '', category: '' }

export default function GalleryEditor() {
  const gallery = useDashboardStore((s) => s.gallery)
  const loading = useDashboardStore((s) => s.loading)
  const loadGallery = useDashboardStore((s) => s.loadGallery)
  const addGalleryItem = useDashboardStore((s) => s.addGalleryItem)
  const updateGalleryItem = useDashboardStore((s) => s.updateGalleryItem)
  const deleteGalleryItem = useDashboardStore((s) => s.deleteGalleryItem)
  const reorderGalleryItems = useDashboardStore((s) => s.reorderGalleryItems)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadGallery()
  }, [loadGallery])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (record) => {
    setEditingId(record.id)
    setForm({
      src: record.src || '',
      caption: record.caption || '',
      category: record.category || ''
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await updateGalleryItem(editingId, form)
      } else {
        await addGalleryItem(form)
      }
      setModalOpen(false)
      setForm(emptyForm)
      setEditingId(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (deleteId) {
      await deleteGalleryItem(deleteId)
      setDeleteId(null)
    }
  }

  const moveUp = async (index) => {
    if (index <= 0) return
    const newGallery = [...gallery]
    const temp = newGallery[index - 1]
    newGallery[index - 1] = newGallery[index]
    newGallery[index] = temp
    await reorderGalleryItems(newGallery)
  }

  const moveDown = async (index) => {
    if (index >= gallery.length - 1) return
    const newGallery = [...gallery]
    const temp = newGallery[index + 1]
    newGallery[index + 1] = newGallery[index]
    newGallery[index] = temp
    await reorderGalleryItems(newGallery)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gold">Editor da Galeria</h1>
        <Button onClick={openAdd} leftIcon={<FiPlus />}>
          Adicionar Foto
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {gallery.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-[#111] relative">
                  {photo.src ? (
                    <img
                      src={photo.src}
                      alt={photo.caption || 'Gallery'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      Sem imagem
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm font-medium text-white truncate">{photo.caption || 'Sem legenda'}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{photo.category || 'Sem categoria'}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index <= 0}
                        className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30"
                        title="Mover para cima"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index >= gallery.length - 1}
                        className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30"
                        title="Mover para baixo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(photo)}
                        className="p-1.5 text-blue-400 hover:text-blue-300"
                        title="Editar"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => setDeleteId(photo.id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                        title="Excluir"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {gallery.length === 0 && (
          <p className="text-center text-gray-500 py-12">Nenhuma foto na galeria.</p>
        )}
      </motion.div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Editar Foto' : 'Adicionar Foto'}
      >
        <div className="space-y-5">
          <Upload
            label="URL da Imagem"
            value={form.src}
            onChange={(url) => setForm({ ...form, src: url })}
          />
          {form.src && (
            <ImagePreview src={form.src} alt="Preview galeria" />
          )}
          <Input
            label="Legenda"
            value={form.caption}
            onChange={(e) => setForm({ ...form, caption: e.target.value })}
            placeholder="Legenda da foto"
          />
          <Input
            label="Categoria"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Ex: shows, backstage, ensaios"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={saving || loading} disabled={saving || loading}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir foto"
        message="Tem certeza que deseja excluir esta foto da galeria?"
        loading={loading}
      />
    </motion.div>
  )
}
