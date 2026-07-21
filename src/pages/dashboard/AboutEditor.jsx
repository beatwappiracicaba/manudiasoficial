import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useDashboardStore from '../../store/dashboardStore'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import Upload from '../../components/ui/Upload'
import ImagePreview from '../../components/ui/ImagePreview'
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

export default function AboutEditor() {
  const about = useDashboardStore((s) => s.about)
  const loading = useDashboardStore((s) => s.loading)
  const updateAbout = useDashboardStore((s) => s.updateAbout)

  const [form, setForm] = useState({
    title: '',
    text: '',
    image: ''
  })

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    useDashboardStore.getState().initialize()
  }, [])

  useEffect(() => {
    if (about) {
      setForm({
        title: about.title || '',
        text: about.text || '',
        image: about.image || ''
      })
    }
  }, [about])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateAbout(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
      <motion.h1 variants={item} className="text-2xl font-bold text-gold">
        Editor do Sobre
      </motion.h1>

      <motion.div variants={item}>
        <Card>
          <div className="space-y-5">
            <Input
              label="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título da seção"
            />
            <Textarea
              label="Texto"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Conteúdo da seção sobre"
              rows={8}
            />
            <Upload
              label="Imagem"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
            />
            {form.image && (
              <ImagePreview src={form.image} alt="Preview sobre" />
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex justify-end">
        <Button onClick={handleSave} loading={saving || loading} disabled={saving || loading}>
          Salvar Sobre
        </Button>
      </motion.div>
    </motion.div>
  )
}
