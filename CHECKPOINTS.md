# CHECKPOINTS.md — blok-web

Verificaciones antes de marcar cualquier trabajo en este repo como terminado.

## Después de implementar

- [ ] `pnpm run build` pasa (incluye `tsc -b`, así que cubre type-check)
- [ ] `pnpm run lint` (oxlint) sin errores
- [ ] Sin `console.log` de debug

## Antes de marcar como terminado

- [ ] `.env` no quedó commiteado (confirmar en el diff, ya se coló una vez)
- [ ] Ningún secreto o credencial quedó hardcodeado en el diff
- [ ] Commit en rama propia, Conventional Commits, no directo a `master`

## Huecos conocidos (no fingir que existen)

- No hay framework de testing instalado (`package.json` no tiene script `test`). Hasta que se agregue, "verificado" para features nuevas significa: build limpio + lint limpio + revisión manual en `pnpm dev`.
- Decisión pendiente sobre JWT en `localStorage` vs `httpOnly` cookies — ver `../ROADMAP.md` del harness.
