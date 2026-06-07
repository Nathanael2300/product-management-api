import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin.js";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "test/e2e/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    specPattern: "test/e2e/**/*.cy.js",
    supportFile: "test/e2e/support/e2e.js",
    fixturesFolder: "test/e2e/fixtures",

    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
  },
});
