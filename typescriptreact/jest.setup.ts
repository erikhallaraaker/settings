import "@testing-library/jest-dom/extend-expect";

global.console = {
    ...global.console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};
