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
  testTimeout: 30000,
  coverageReporters: ["text", "lcov", "clover", "html"],
};
