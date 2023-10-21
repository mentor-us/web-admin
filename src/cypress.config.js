const { configureXrayPlugin, addXrayResultUpload } = require("cypress-xray-plugin");

const { defineConfig } = require("cypress");
const fs = require("fs");
const { dumpDB, restoreDB } = require("./cypress/support/db");

require("dotenv").config();

module.exports = defineConfig({
  video: true,
  e2e: {
    async setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures && fs.existsSync(results.video)) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });

      on("task", {
        dumpDB(filename) {
          return dumpDB(filename, config.env.DB_URI, config.env.DB_NAME);
        },
        restoreDB(filename) {
          return restoreDB(filename, config.env.DB_URI, config.env.DB_NAME);
        }
      });

      // Xray plugin config
      // ------------------------------------
      await configureXrayPlugin(config, {
        jira: {
          attachVideos: true
        },
        xray: {
          uploadResults: true,
          uploadScreenshots: true
        },
        plugin: {
          normalizeScreenshotNames: true
        }
      });
      await addXrayResultUpload(on);
      // ------------------------------------
    },
    baseUrl: "http://localhost:3000/",
    experimentalStudio: true
  },

  component: {
    setupNodeEvents(on) {
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures && fs.existsSync(results.video)) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    },
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    }
  }
});
