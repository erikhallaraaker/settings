import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    displayName: "DISPLAY_NAME",
    collectCoverage: true,
    collectCoverageFrom: [
        "./src/**/*.{ts,tsx}",
        "!./src/**/*.styled.{ts,tsx}",
        "!./src/**/*.stories.{ts,tsx}",
    ],
    coverageReporters: ["html", "text", "text-summary", "cobertura"],
    moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src/$1",
    },
    resetMocks: false,
    restoreMocks: true,
    setupFiles: [
        "jest-localstorage-mock",
    ],
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.ts",
    ],
    testEnvironment: "jsdom",
    testURL: "http://test.no/",
    transform: {
        "\\.[jt]sx?$": "babel-jest",
        ".+\\.(css|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub",
    },
    verbose: true,
};

export default config;
