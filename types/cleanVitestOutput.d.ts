/**
 * This function cleans the output of Vitest by removing unnecessary properties.
 * It also sorts the test results by the test name.
 */
export declare const cleanVitestOutput: (result: string, context: {
    rootFolder: string;
}) => {
    startTime?: number | undefined;
    numFailedTestSuites?: number | undefined;
    numFailedTests?: number | undefined;
    numPassedTestSuites?: number | undefined;
    numPassedTests?: number | undefined;
    numPendingTestSuites?: number | undefined;
    numPendingTests?: number | undefined;
    numTodoTests?: number | undefined;
    numTotalTestSuites?: number | undefined;
    numTotalTests?: number | undefined;
    testResults: {
        name: string;
        startTime?: number;
        endTime?: number;
        assertionResults: {
            duration?: number;
        }[];
    }[];
};
