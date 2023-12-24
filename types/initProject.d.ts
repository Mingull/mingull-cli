export type Project = {
    name: string;
    language: "JavaScript" | "TypeScript";
    packageManager: "npm" | "pnpm" | "yarn";
    type: "node" | "react" | "reactNative";
};
export declare const initProject: () => Promise<{
    type: "node" | "react" | "reactNative";
    packageManager: "npm" | "pnpm" | "yarn";
    language: "JavaScript" | "TypeScript";
    name: string;
} | undefined>;
