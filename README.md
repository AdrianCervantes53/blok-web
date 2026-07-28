# Blok Web

Cliente React (Vite + TypeScript) para **Blok**. Consume `blok-api` con JWT.

## Stack

- React 19 + React Router
- Vite (proxy `/api` → `http://localhost:8000`)
- Estructura modular: `core/` + `modules/notas/`

## Arranque

1. API arriba: en `blok-api` → `docker compose up`
2. En esta carpeta:

```bash
cp .env.example .env
npm install
npm run dev
```

Abre http://localhost:5173

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/login` | Login |
| `/register` | Registro |
| `/` | Notas (protegida) |

## Estructura

```
src/
├── core/
│   ├── api/client.ts
│   └── auth/          # context, storage, ProtectedRoute
├── modules/notas/     # api, hooks, components, pages
└── pages/             # login, register
```
