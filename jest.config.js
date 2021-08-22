module.exports = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "config",
    "app.js",
    "tests",
    "client",
  ],
  testPathIgnorePatterns: ["./client/"],

  coverageReporters: ["text", "lcov", "clover", "html"],
};
