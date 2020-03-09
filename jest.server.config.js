module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '../../coverage/server',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: [
    'json',
    'text',
    'lcov',
    'clover'
  ],
  resetModules: false,
  rootDir: './src/server',
  setupFiles: ['./test/init.js'],
  testEnvironment: 'jest-environment-node',
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
  transform: {
    '^.+\\.[t|j]s$': 'babel-jest'
  }
}
