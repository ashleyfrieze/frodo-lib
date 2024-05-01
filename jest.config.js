/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',


    "testTimeout": 30000,
    "testRunner": "jest-jasmine2",
    "roots": [
      "<rootDir>/src/"
    ],
    "testMatch": [
      "**/?(*.)(test).ts"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/"
    ],
    "snapshotResolver": "<rootDir>/snapshotResolve.js",
    "verbose": false
};