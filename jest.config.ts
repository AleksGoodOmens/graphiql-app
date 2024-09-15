import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	// Add more setup options before each test is run
	setupFilesAfterEnv: ['./jest.setup.ts'],
	collectCoverage: false,
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!**/node_modules/**',
		'!**/dist/**',
	],
	coverageDirectory: 'coverage',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@/app/(.*)$': '<rootDir>/src/app/$1',
		'^@/components/(.*)$': '<rootDir>/src/components/$1',
	},
}

export default createJestConfig(config)
