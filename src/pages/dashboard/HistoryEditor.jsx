import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi'
import useDashboardStore from '../../store/dashboardStore'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Upload from '../../components/ui/Upload'
import ImagePreview from '../../components/ui/ImagePreview'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'

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

const emptyForm = { year: '', title: '', description: '', image: '' }

export default function HistoryEditor() {
  const history = useDashboardStore((s) => s.history)
  const loading = useDashboardStore((s) => s.loading)
  const loadHistory = useDashboardStore((s) => s.loadHistory)
  const addHistoryItem = useDashboardStore((s) => s.addHistoryItem)
  const updateHistoryItem = useDashboardStore((s) => s.updateHistoryItem)
  const deleteHistoryItem = useDashboardStore((s) => s.deleteHistoryItem)
  const reorderHistoryItems = useDashboardStore((s) => s.reorderHistoryItems)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (record) => {
    setEditingId(record.id)
    setForm({
      year: record.year || '',
      title: record.title || '',
      description: record.description || '',
      image: record.image || ''
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await updateHistoryItem(editingId, form)
      } else {
        await addHistoryItem(form)
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
      await deleteHistoryItem(deleteId)
      setDeleteId(null)
    }
  }

  const moveUp = async (index) => {
    if (index <= 0) return
    const newHistory = [...history]
    const temp = newHistory[index - 1]
    newHistory[index - 1] = newHistory[index]
    newHistory[index] = temp
    await reorderHistoryItems(newHistory)
  }

  const moveDown = async (index) => {
    if (index >= history.length - 1) return
    const newHistory = [...history]
    const temp = newHistory[index + 1]
    newHistory[index + 1] = newHistory[index]
    newHistory[index] = temp
    await reorderHistoryItems(newHistory)
  }

  const columns = [
    { key: 'year', label: 'Ano' },
    { key: 'title', label: 'Título' },
    { key: 'description', label: 'Descrição' }
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gold">Editor da Timeline</h1>
        <Button onClick={openAdd} leftIcon={<FiPlus />}>
          Adicionar Item
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Card padding="none">
          <Table
            columns={columns}
            data={history}
            renderRow={(row) => (
              <>
                <td className="px-4 py-3 text-sm text-gray-300">{row.year}</td>
                <td className="px-4 py-3 text-sm text-white">{row.title}</td>
                <td className="px-4 py-3 text-sm text-gray-400 line-clamp-1">{row.description}</td>
              </>
            )}
            actions={(row) => (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(history.findIndex((h) => h.id === row.id))}
                  disabled={history.findIndex((h) => h.id === row.id) <= 0}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30"
                  title="Mover para cima"
                >
                  <FiChevronUp />
                </button>
                <button
                  onClick={() => moveDown(history.findIndex((h) => h.id === row.id))}
                  disabled={history.findIndex((h) => h.id === row.id) >= history.length - 1}
                  className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30"
                  title="Mover para baixo"
                >
                  <FiChevronDown />
                </button>
                <button
                  onClick={() => openEdit(row)}
                  className="p-1.5 text-blue-400 hover:text-blue-300"
                  title="Editar"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => setDeleteId(row.id)}
                  className="p-1.5 text-red-400 hover:text-red-300"
                  title="Excluir"
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
          />
        </Card>
      </motion.div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Editar Item' : 'Adicionar Item'}
      >
        <div className="space-y-5">
          <Input
            label="Ano"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="Ex: 2023"
          />
          <Input
            label="Título"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título do evento"
          />
          <Textarea
            label="Descrição"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Descrição"
            rows={4}
          />
          <Upload
            label="Imagem"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
          {form.image && (
            <ImagePreview src={form.image} alt="Preview timeline" />
          )}
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
        title="Excluir item"
        message="Tem certeza que deseja excluir este item da timeline?"
        loading={loading}
      />
    </motion.div>
  )
}
