/* eslint-disable no-param-reassign */
const { configureXrayPlugin, addXrayResultUpload } = require("cypress-xray-plugin");
const { verifyDownloadTasks } = require("cy-verify-downloads");
const { defineConfig } = require("cypress");
const fs = require("fs");
const cypressOnFix = require("cypress-on-fix");
const cypressSplit = require("cypress-split");
const { dumpDB, restoreDB } = require("./cypress/support/db");

require("dotenv").config();

const packageVersion = require("./package.json").version;

module.exports = defineConfig({
  video: true,
  e2e: {
    async setupNodeEvents(cypressOn, config) {
      const on = cypressOnFix(cypressOn);
      on("before:browser:launch", async (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--inprivate");
          launchOptions.args.push("--profile-directory=Default");
        } else if (browser.name === "edge") {
          launchOptions.args.push("--inprivate");
          launchOptions.args.push("--profile-directory=Default");
        } else if (browser.name === "firefox") {
          /* empty */
        }

        return launchOptions;
      });

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
        },
        downloads: (downloadspath) => {
          if (!fs.existsSync(downloadspath)) {
            fs.mkdirSync(downloadspath);
          }
          return fs.readdirSync(downloadspath);
        },
        ...verifyDownloadTasks
      });

      // Xray plugin config
      // ------------------------------------
      await configureXrayPlugin(config, {
        jira: {
          attachVideos: true
        },
        xray: {
          uploadScreenshots: true
        },
        plugin: {
          normalizeScreenshotNames: true
        }
      });
      await addXrayResultUpload(on);
      // ------------------------------------

      // Cypress split plugin config
      cypressSplit(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000/",
    experimentalStudio: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      BACKEND_URL: "http://localhost:8080/",
      PROJECT_VERSION: packageVersion,
      DB_DUMP_TEST: `data_dump_test_${packageVersion}.tar` // Data test filename - use for test
    }
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
      framework: "react",
      bundler: "vite"
    }
  }
});
