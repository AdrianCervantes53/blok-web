export type Note = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
}

export type NoteCreate = {
  title: string
  content: string
}

export type NoteUpdate = {
  title?: string
  content?: string
}
