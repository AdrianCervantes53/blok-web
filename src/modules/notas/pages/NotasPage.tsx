import { useState } from 'react'
import { useAuth } from '../../../core/auth/AuthContext'
import { NoteForm } from '../components/NoteForm'
import { useNotas } from '../hooks/useNotas'
import type { Note } from '../types'

export function NotasPage() {
  const { user, logout } = useAuth()
  const { notes, loading, error, create, update, remove } = useNotas()
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [selected, setSelected] = useState<Note | null>(null)

  async function handleCreate(payload: { title: string; content: string }) {
    await create(payload)
    setMode('list')
  }

  async function handleUpdate(payload: { title: string; content: string }) {
    if (!selected) return
    await update(selected.id, payload)
    setSelected(null)
    setMode('list')
  }

  async function handleDelete(note: Note) {
    const ok = window.confirm(`¿Eliminar “${note.title}”?`)
    if (!ok) return
    await remove(note.id)
    if (selected?.id === note.id) {
      setSelected(null)
      setMode('list')
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand">Blok</p>
          <p className="muted small">{user?.email}</p>
        </div>
        <div className="actions">
          <button type="button" className="btn primary" onClick={() => setMode('create')}>
            Nueva nota
          </button>
          <button type="button" className="btn ghost" onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <main className="content">
        {mode === 'create' ? (
          <section className="panel">
            <h1>Nueva nota</h1>
            <NoteForm
              submitLabel="Crear"
              onSubmit={handleCreate}
              onCancel={() => setMode('list')}
            />
          </section>
        ) : null}

        {mode === 'edit' && selected ? (
          <section className="panel">
            <h1>Editar nota</h1>
            <NoteForm
              initial={selected}
              submitLabel="Guardar"
              onSubmit={handleUpdate}
              onCancel={() => {
                setSelected(null)
                setMode('list')
              }}
            />
          </section>
        ) : null}

        {mode === 'list' ? (
          <section className="panel">
            <div className="section-head">
              <h1>Notas</h1>
              <p className="muted">CRUD contra blok-api · JWT</p>
            </div>

            {loading ? <p className="muted">Cargando…</p> : null}
            {error ? <p className="error">{error}</p> : null}

            {!loading && !error && notes.length === 0 ? (
              <p className="muted">Aún no hay notas. Crea la primera.</p>
            ) : null}

            <ul className="note-list">
              {notes.map((note) => (
                <li key={note.id} className="note-item">
                  <div>
                    <h2>{note.title}</h2>
                    <p className="note-preview">{note.content || 'Sin contenido'}</p>
                    <p className="muted small">
                      Actualizada {new Date(note.updated_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="actions">
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={() => {
                        setSelected(note)
                        setMode('edit')
                      }}
                    >
                      Editar
                    </button>
                    <button type="button" className="btn danger" onClick={() => handleDelete(note)}>
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  )
}
