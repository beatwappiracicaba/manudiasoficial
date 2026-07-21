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

export default function HeroEditor() {
  const hero = useDashboardStore((s) => s.hero)
  const loading = useDashboardStore((s) => s.loading)
  const updateHero = useDashboardStore((s) => s.updateHero)

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: '',
    mainImage: ''
  })

  const [buttons, setButtons] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    useDashboardStore.getState().initialize()
  }, [])

  useEffect(() => {
    if (hero) {
      setForm({
        title: hero.title || '',
        subtitle: hero.subtitle || '',
        description: hero.description || '',
        backgroundImage: hero.backgroundImage || '',
        mainImage: hero.mainImage || ''
      })
      setButtons(hero.buttons || [])
    }
  }, [hero])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateHero({ ...form, buttons })
    } finally {
      setSaving(false)
    }
  }

  const addButton = () => {
    setButtons([...buttons, { id: Date.now(), text: '', link: '', variant: 'primary' }])
  }

  const removeButton = (id) => {
    setButtons(buttons.filter((btn) => btn.id !== id))
  }

  const updateButton = (id, field, value) => {
    setButtons(buttons.map((btn) => (btn.id === id ? { ...btn, [field]: value } : btn)))
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
      <motion.h1 variants={item} className="text-2xl font-bold text-gold">
        Editor do Hero
      </motion.h1>

      <motion.div variants={item}>
        <Card>
          <div className="space-y-5">
            <Input
              label="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Título principal"
            />
            <Input
              label="Subtítulo"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Subtítulo"
            />
            <Textarea
              label="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrição breve"
              rows={4}
            />
            <Upload
              label="Imagem de Fundo"
              value={form.backgroundImage}
              onChange={(url) => setForm({ ...form, backgroundImage: url })}
            />
            {form.backgroundImage && (
              <ImagePreview src={form.backgroundImage} alt="Preview fundo" />
            )}
            <Upload
              label="Imagem Principal"
              value={form.mainImage}
              onChange={(url) => setForm({ ...form, mainImage: url })}
            />
            {form.mainImage && (
              <ImagePreview src={form.mainImage} alt="Preview principal" />
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Botões</h2>
            <Button onClick={addButton} variant="secondary">
              Adicionar Botão
            </Button>
          </div>
          <div className="space-y-4">
            {buttons.map((btn) => (
              <div key={btn.id} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-5">
                  <Input
                    label="Texto"
                    value={btn.text}
                    onChange={(e) => updateButton(btn.id, 'text', e.target.value)}
                  />
                </div>
                <div className="col-span-5">
                  <Input
                    label="Link"
                    value={btn.link}
                    onChange={(e) => updateButton(btn.id, 'link', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    variant="danger"
                    onClick={() => removeButton(btn.id)}
                    className="w-full"
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
            {buttons.length === 0 && (
              <p className="text-gray-500 text-sm">Nenhum botão adicionado.</p>
            )}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex justify-end">
        <Button onClick={handleSave} loading={saving || loading} disabled={saving || loading}>
          Salvar Hero
        </Button>
      </motion.div>
    </motion.div>
  )
}
