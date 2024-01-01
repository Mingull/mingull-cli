import Enquirer, { PromptOptions as EPromptOptions, prompt } from "enquirer";
import { Prettify } from "./prettify";
import { DeepObject } from "./deep";

// Overload 1: Single question, single valueToSkip
export async function safePrompt<N = unknown, V = unknown, R extends DeepObject<N> = DeepObject<N>>(
	questions: PromptOptions<N> | ((e: Enquirer) => PromptOptions<N>),
	valuesToSkip: V | (() => V)
): Promise<R>;

// Overload 2: Multiple questions, single valueToSkip
export async function safePrompt<N = unknown, V = unknown, R extends DeepObject<N> = DeepObject<N>>(
	questions: (PromptOptions<N> | ((e: Enquirer) => PromptOptions<N>))[],
	valuesToSkip: V | (() => V)
): Promise<R>;

// Overload 3: Multiple questions, multiple valuesToSkip
export async function safePrompt<N = unknown, V = unknown, R extends DeepObject<N> = DeepObject<N>>(
	questions: (PromptOptions<N> | ((e: Enquirer) => PromptOptions<N>))[],
	valuesToSkip: (V | (() => V))[]
): Promise<R>;

export async function safePrompt<N = unknown, V = unknown, R extends DeepObject<N> = DeepObject<N>>(
	questions:
		| PromptOptions<N>
		| ((e: Enquirer) => PromptOptions<N>)
		| (PromptOptions<N> | ((e: Enquirer) => PromptOptions<N>))[],
	valuesToSkip?: V | (() => V) | (V | (() => V))[]
): Promise<R> {
	// if valuesToSkip then return object of valuesToSkip with the right question name as key
	// return {
	//  questionName: valuesToSkip,
	// };
	if (valuesToSkip) {
		if (Array.isArray(valuesToSkip) && Array.isArray(questions)) {
			console.log("multiple questions and multiple valuesToSkip");
		}

		if (!Array.isArray(valuesToSkip) && Array.isArray(questions)) {
			console.log("multiple questions and single valueToSkip");

			if (typeof valuesToSkip === "function" && typeof questions[0] === "function") {
				const skippedQuestions = {
					[questions[0](new Enquirer()).name as keyof N]: (valuesToSkip as () => V)(),
				};

				const remainingQuestions = await prompt(questions.slice(1) as EPromptOptions[]);

				return { ...skippedQuestions, ...remainingQuestions } as R;
			}
			if (typeof valuesToSkip !== "function" && typeof questions[0] === "function") {
				const skippedQuestions = {
					[questions[0](new Enquirer()).name as keyof N]: valuesToSkip,
				};

				const remainingQuestions = await prompt(questions.slice(1) as EPromptOptions[]);

				return { ...skippedQuestions, ...remainingQuestions } as R;
			}
			if (
				typeof valuesToSkip === "function" &&
				questions[0] !== undefined &&
				typeof questions[0] !== "function"
			) {
				const skippedQuestions = {
					[questions[0].name as keyof N]: (valuesToSkip as () => V)(),
				};

				const remainingQuestions = await prompt(questions.slice(1) as EPromptOptions[]);

				return { ...skippedQuestions, ...remainingQuestions } as R;
			}

			const skippedQuestions =
				questions[0] !== undefined
					? {
							[questions[0].name as keyof N]: valuesToSkip as V,
					  }
					: {};

			const remainingQuestions = await prompt(questions.slice(1) as EPromptOptions[]);

			return { ...skippedQuestions, ...remainingQuestions } as R;
		}

		if (!Array.isArray(valuesToSkip) && !Array.isArray(questions)) {
			console.log("single question and single valueToSkip");

			if (typeof questions === "function" && typeof valuesToSkip === "function") {
				console.log("both are functions");
				let question = questions(new Enquirer());
				return { [question.name as keyof N]: (valuesToSkip as () => V)() } as R;
			}

			if (typeof questions === "function" && typeof valuesToSkip !== "function") {
				console.log("question is function, valueToSkip is not");
				let question = questions(new Enquirer());
				return { [question.name as keyof N]: valuesToSkip } as R;
			}

			if (typeof questions !== "function" && typeof valuesToSkip === "function") {
				console.log("question is not function, valueToSkip is");
				return { [questions.name as keyof N]: (valuesToSkip as () => V)() } as R;
			}

			console.log("neither are functions");
			return { [questions.name as keyof N]: valuesToSkip as V } as R;
		}
	}

	console.log("questions and no valueToSkip");
	// if valuesToSkip is undefined, then it's a single question
	return await prompt(questions as EPromptOptions);
}


/**
 * types from node_modules/.pnpm/enquirer%402.4.1/node_modules/enquirer/index.d.ts
 * modified by me
 */
interface BasePromptOptions<N = unknown> {
	name: keyof N | (() => keyof N);
	type: string | (() => string);
	message: string | (() => string) | (() => Promise<string>);
	prefix?: string;
	initial?: any;
	required?: boolean;
	enabled?: boolean | string;
	disabled?: boolean | string;
	format?(value: string): string | Promise<string>;
	result?(value: string): string | Promise<string>;
	skip?: ((state: object) => boolean | Promise<boolean>) | boolean;
	validate?(value: string): boolean | string | Promise<boolean | string>;
	onSubmit?(name: string, value: any, prompt: Enquirer.Prompt): boolean | Promise<boolean>;
	onCancel?(name: string, value: any, prompt: Enquirer.Prompt): boolean | Promise<boolean>;
	stdin?: NodeJS.ReadStream;
	stdout?: NodeJS.WriteStream;
}

interface Choice {
	name: string;
	message?: string;
	value?: unknown;
	hint?: string;
	role?: string;
	enabled?: boolean;
	disabled?: boolean | string;
}

interface ArrayPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "autocomplete" | "editable" | "form" | "multiselect" | "select" | "survey" | "list" | "scale";
	choices: (string | Choice)[];
	maxChoices?: number;
	multiple?: boolean;
	initial?: number;
	delay?: number;
	separator?: boolean;
	sort?: boolean;
	linebreak?: boolean;
	edgeLength?: number;
	align?: "left" | "right";
	scroll?: boolean;
}

interface BooleanPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "confirm";
	initial?: boolean;
}

interface StringPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "input" | "invisible" | "list" | "password" | "text";
	initial?: string;
	multiline?: boolean;
}

interface NumberPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "numeral";
	min?: number;
	max?: number;
	delay?: number;
	float?: boolean;
	round?: boolean;
	major?: number;
	minor?: number;
	initial?: number;
}

interface SnippetPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "snippet";
	newline?: string;
	template?: string;
}

interface SortPromptOptions<N = unknown> extends BasePromptOptions<N> {
	type: "sort";
	hint?: string;
	drag?: boolean;
	numbered?: boolean;
}

type PromptOptions<N = string> =
	| BasePromptOptions<N>
	| ArrayPromptOptions<N>
	| BooleanPromptOptions<N>
	| StringPromptOptions<N>
	| NumberPromptOptions<N>
	| SnippetPromptOptions<N>
	| SortPromptOptions<N>;
