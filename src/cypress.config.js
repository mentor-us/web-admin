const { defineConfig } = require("cypress");
const fs = require("fs");

require("dotenv").config();

module.exports = defineConfig({
  video: true,
  e2e: {
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
    baseUrl: "http://localhost:3000/",
    experimentalStudio: true,
    env: {
      BACKEND_URL: "https://mentorus.hieucckha.me/"
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    }
  }
});
