export default {
    preset: 'ts-jest',
    testEnvironment: 'miniflare',

    collectCoverage: true,

    coverageDirectory: 'coverage',

    coverageProvider: 'v8',

    coverageReporters: ['cobertura'],
}
