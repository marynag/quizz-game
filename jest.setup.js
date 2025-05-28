global.document = document;
global.window = window;

global.console = {
  ...console,
  // Приховуємо логи в тестах
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.test.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
