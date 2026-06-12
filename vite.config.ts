// This is not actually used but needed for running the tests with cloudflare vitest
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
    coverage: {
        provider: 'istanbul',
        reporter: ['text', 'cobertura'],
    },
    },
  plugins: [
    cloudflareTest({
      miniflare: {
        compatibilityFlags: ["nodejs_compat"],
        compatibilityDate: "2022-10-31",
      },
    }),
  ],
});
