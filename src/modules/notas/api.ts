import { apiRequest } from '../../core/api/client'
import type { Note, NoteCreate, NoteUpdate } from './types'

export function listNotas(): Promise<Note[]> {
  return apiRequest<Note[]>('/notas')
}

export function getNota(id: number): Promise<Note> {
  return apiRequest<Note>(`/notas/${id}`)
}

export function createNota(payload: NoteCreate): Promise<Note> {
  return apiRequest<Note>('/notas', { method: 'POST', body: payload })
}

export function updateNota(id: number, payload: NoteUpdate): Promise<Note> {
  return apiRequest<Note>(`/notas/${id}`, { method: 'PATCH', body: payload })
}

export function deleteNota(id: number): Promise<void> {
  return apiRequest<void>(`/notas/${id}`, { method: 'DELETE' })
}
