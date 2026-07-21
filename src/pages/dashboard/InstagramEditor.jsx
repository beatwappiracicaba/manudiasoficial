import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useDashboardStore from '../../store/dashboardStore'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
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

export default function InstagramEditor() {
  const instagram = useDashboardStore((s) => s.instagram)
  const loading = useDashboardStore((s) => s.loading)
  const loadInstagram = useDashboardStore((s) => s.loadInstagram)
  const updateInstagram = useDashboardStore((s) => s.updateInstagram)

  const [form, setForm] = useState({
    username: '',
    profileLink: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadInstagram()
  }, [loadInstagram])

  useEffect(() => {
    if (instagram) {
      setForm({
        username: instagram.username || '',
        profileLink: instagram.profileLink || ''
      })
    }
  }, [instagram])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateInstagram(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
      <motion.h1 variants={item} className="text-2xl font-bold text-gold">
        Configurações do Instagram
      </motion.h1>

      <motion.div variants={item}>
        <Card>
          <div className="space-y-5">
            <Input
              label="Nome de usuário"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="@manudiasoficial"
            />
            <Input
              label="Link do perfil"
              value={form.profileLink}
              onChange={(e) => setForm({ ...form, profileLink: e.target.value })}
              placeholder="https://instagram.com/manudiasoficial"
            />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex justify-end">
        <Button onClick={handleSave} loading={saving || loading} disabled={saving || loading}>
          Salvar Instagram
        </Button>
      </motion.div>
    </motion.div>
  )
}
