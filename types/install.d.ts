/// <reference types="node" />
/// <reference types="node" />
import { ExecSyncOptionsWithBufferEncoding } from "child_process";
export declare const npm: (cmd: string, opts?: ExecSyncOptionsWithBufferEncoding) => string | Buffer;
export declare const npx: (cmd: string, opts?: ExecSyncOptionsWithBufferEncoding) => string | Buffer;
