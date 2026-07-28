import { useCallback, useEffect, useState } from 'react'
import { createNota, deleteNota, listNotas, updateNota } from '../api'
import type { Note, NoteCreate, NoteUpdate } from '../types'

export function useNotas() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setNotes(await listNotas())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar las notas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = useCallback(async (payload: NoteCreate) => {
    const note = await createNota(payload)
    setNotes((prev) => [note, ...prev])
    return note
  }, [])

  const update = useCallback(async (id: number, payload: NoteUpdate) => {
    const note = await updateNota(id, payload)
    setNotes((prev) => prev.map((item) => (item.id === id ? note : item)))
    return note
  }, [])

  const remove = useCallback(async (id: number) => {
    await deleteNota(id)
    setNotes((prev) => prev.filter((item) => item.id !== id))
  }, [])

  return { notes, loading, error, refresh, create, update, remove }
}
