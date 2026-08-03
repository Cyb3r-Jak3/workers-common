# Changelog

## v6 - 2026-08-03

### Breaking

- **Restricted the package's public entry points via `exports`.** Only the package root (`@cyb3r-jak3/workers-common`) is now resolvable. Deep imports into internal files under `dist/` (e.g. `@cyb3r-jak3/workers-common/dist/encode.js`) will now fail to resolve with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

  **Migration:** Import everything from the package root instead of a `dist/*` subpath. Every export was already re-exported from the root, so this is a mechanical find-and-replace.

  ```diff
  - import { encodeBase64 } from "@cyb3r-jak3/workers-common/dist/encode.js";
  - import { jsonResponse } from "@cyb3r-jak3/workers-common/dist/responses.js";
  + import { encodeBase64, jsonResponse } from "@cyb3r-jak3/workers-common";
  ```

  If your bundler/TypeScript config resolves the package via `main`/`types` only (no `exports` support), nothing changes — those fields are kept for compatibility.

### Fixed

- Sourcemaps shipped in `dist/*.js.map` and `dist/*.d.ts.map` previously pointed at `src/*.ts` files that were never published, producing "Sourcemap ... points to missing source files" warnings in consuming projects (e.g. Vite/Vitest). Source content is now inlined directly into the sourcemaps (`inlineSources: true`), so debugging into original TypeScript works without any published `src/` directory.
