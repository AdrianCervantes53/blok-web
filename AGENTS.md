# AGENTS.md — blok-web

> Lee primero `../AGENTS.md` (el harness compartido en `blok-app`) para las
> reglas de proyecto: convenciones de commits, una feature a la vez, dónde
> viven los specs. Este archivo cubre solo lo específico de este repo.

## Reglas específicas de React / TypeScript

- Usa `pnpm`, nunca `npm` (`pnpm install`, `pnpm dev`, `pnpm add`, etc.).
- Estado compartido vía Context (ej. `AuthContext`) — sin librería externa de state management.
- Valores de Context que se pasan a consumidores memoízalos con `useCallback`/`useMemo` para evitar rerenders innecesarios en cada consumidor.
- Un módulo nuevo sigue el patrón de `modules/notas/`: `types.ts` → `api.ts` → `useX.ts` (hook) → `XPage.tsx`.
- Llamadas de login/registro usan el flag `auth: false` en el cliente HTTP (no llevan JWT porque el usuario aún no tiene uno).
- Variables de entorno de Vite son de compile-time, no runtime — no asumas que se pueden cambiar sin rebuild.
- `.env` nunca se commitea — verifica que siga en `.gitignore` antes de tocarlo.

## Si te bloqueas

Documenta el bloqueo en `../progress/current.md` (harness compartido) y para la sesión.
