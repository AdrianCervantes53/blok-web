import { useState, type FormEvent } from 'react'
import type { Note } from '../types'

type NoteFormProps = {
  initial?: Pick<Note, 'title' | 'content'>
  submitLabel: string
  onSubmit: (payload: { title: string; content: string }) => Promise<void>
  onCancel?: () => void
}

export function NoteForm({ initial, submitLabel, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await onSubmit({ title: title.trim(), content })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label className="field">
        <span>Título</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          placeholder="Título de la nota"
        />
      </label>
      <label className="field">
        <span>Contenido</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="Escribe aquí…"
        />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving || !title.trim()}>
          {saving ? 'Guardando…' : submitLabel}
        </button>
        {onCancel ? (
          <button type="button" className="btn ghost" onClick={onCancel} disabled={saving}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  )
}
