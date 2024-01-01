import { Prettify } from "./prettify";

export type DeepObject<T> = {
	[K in keyof T]: T[K] extends object ? Prettify<DeepObject<T[K]>> : T[K];
};
