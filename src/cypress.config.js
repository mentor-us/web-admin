const { defineConfig } = require("cypress");

require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_WEB_URL || "http://localhost:3000",
    experimentalStudio: true,
    env: {
      BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
      WEB_URL: process.env.REACT_APP_WEB_URL || "http://localhost:3000",
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
      googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    }
  }
});
