const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ne5pkg",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
