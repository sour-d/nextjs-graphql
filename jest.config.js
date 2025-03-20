module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/tests/**/*.test.js', '**/*.test.js'],
  verbose: true,
  // setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};