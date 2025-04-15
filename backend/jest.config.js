/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  // Opcional: Si necesitas mapear rutas
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
