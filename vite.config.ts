// This is not actually used but needed for running the tests with cloudflare vitest
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    coverage: {
        provider: 'istanbul',
        reporter: ['text', 'cobertura']
    },
    poolOptions: {
        workers: {
            miniflare: {
                compatibilityFlags: ["nodejs_compat"],
                compatibilityDate: '2022-10-31',
            }
        }
    }
  },
});