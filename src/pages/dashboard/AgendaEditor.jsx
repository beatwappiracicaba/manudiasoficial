import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import useDashboardStore from '../../store/dashboardStore'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
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

const emptyForm = { date: '', location: '', venue: '', status: 'pending' }

export default function AgendaEditor() {
  const agenda = useDashboardStore((s) => s.agenda)
  const loading = useDashboardStore((s) => s.loading)
  const loadAgenda = useDashboardStore((s) => s.loadAgenda)
  const addAgendaItem = useDashboardStore((s) => s.addAgendaItem)
  const updateAgendaItem = useDashboardStore((s) => s.updateAgendaItem)
  const deleteAgendaItem = useDashboardStore((s) => s.deleteAgendaItem)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteId, setDeleteId] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAgenda()
  }, [loadAgenda])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (row) => {
    setEditingId(row.id)
    setForm({
      date: row.date || '',
      location: row.location || '',
      venue: row.venue || '',
      status: row.status || 'pending'
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (editingId) {
        await updateAgendaItem(editingId, form)
      } else {
        await addAgendaItem(form)
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
      await deleteAgendaItem(deleteId)
      setDeleteId(null)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR')
  }

  const statusLabel = (status) => {
    if (status === 'confirmed') return 'Confirmado'
    if (status === 'pending') return 'Pendente'
    return status
  }

  const statusClass = (status) => {
    if (status === 'confirmed') return 'text-green-400'
    if (status === 'pending') return 'text-yellow-400'
    return 'text-gray-400'
  }

  const columns = [
    { key: 'date', label: 'Data', render: () => formatDate(row.date) },
    { key: 'location', label: 'Localização' },
    { key: 'venue', label: 'Local' },
    { key: 'status', label: 'Status' }
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gold">Editor da Agenda</h1>
        <Button onClick={openAdd} leftIcon={<FiPlus />}>
          Adicionar Evento
        </Button>
      </motion.div>

      <motion.div variants={item}>
        <Card padding="none">
          <Table
            columns={columns}
            data={agenda}
            renderRow={(row) => (
              <>
                <td className="px-4 py-3 text-sm text-gray-300">{formatDate(row.date)}</td>
                <td className="px-4 py-3 text-sm text-white">{row.location}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{row.venue}</td>
                <td className={`px-4 py-3 text-sm font-medium ${statusClass(row.status)}`}>
                  {statusLabel(row.status)}
                </td>
              </>
            )}
            actions={(row) => (
              <div className="flex items-center gap-1">
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
        title={editingId ? 'Editar Evento' : 'Adicionar Evento'}
      >
        <div className="space-y-5">
          <Input
            label="Data"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            label="Localização"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Cidade, UF"
          />
          <Input
            label="Local / Venue"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            placeholder="Nome do local"
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            options={[
              { value: 'pending', label: 'Pendente' },
              { value: 'confirmed', label: 'Confirmado' }
            ]}
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
        title="Excluir evento"
        message="Tem certeza que deseja excluir este evento da agenda?"
        loading={loading}
      />
    </motion.div>
  )
}
