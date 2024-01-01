import { prompt } from "enquirer";
import { safePrompt } from "./utils/safePrompt";

export type Project = {
	name: string;
	git: boolean;
	language: "JavaScript" | "TypeScript";
	packageManager: "npm" | "pnpm" | "yarn";
	type: "node" | "react" | "reactNative";
};

const promptForMissingOptions = async (options: Partial<Project>) =>
	// : Promise<Project> =>
	{
		const name = await safePrompt<Pick<Project, "name">>(
			{
				name: "name",
				type: "input",
				message: "What is the name of your project?",
				prefix: "📝",
				validate: (input: any) => {
					if (!input) return "You must provide a name for your project";
					return true;
				},
			},
			options.name
		);

		console.log({ name });

		// const git = await safePrompt<Pick<Project, "git">>(
		// 	[
		// 		{
		// 			name: "git",
		// 			type: "confirm",
		// 			message: "Do you want to initialize git?",
		// 			prefix: "📦",
		// 			validate: (input) => {
		// 				return true;
		// 			},
		// 		},
		// 	],
		// 	[options.git]
		// );

		// const language = await safePrompt<Pick<Project, "language">>({
		// 	name: "language",
		// 	type: "autocomplete",
		// 	message: "What language do you want to use?",
		// 	choices: [
		// 		{ name: "javascript", message: "JavaScript", role: "javascript", hint: "JavaScript language" },
		// 		{ name: "typescript", message: "TypeScript", role: "typescript", hint: "TypeScript language" },
		// 		{ name: "java", message: "Java", role: "java", hint: "Java language", disabled: true },
		// 		{ name: "python", message: "Python", role: "python", hint: "Python language", disabled: true },
		// 	],
		// 	prefix: "📚",
		// });

		// const packageManager = await safePrompt<Pick<Project, "packageManager">>([
		// 	{
		// 		name: "packageManager",
		// 		type: "select",
		// 		message: "What package manager do you use?",
		// 		choices: ["npm", "pnpm", "yarn"],
		// 		prefix: "📦",
		// 	},
		// ]);

		// const type = await safePrompt<Pick<Project, "type">>([
		// 	{
		// 		name: "type",
		// 		type: "autocomplete",
		// 		message: "What type of project is it?",
		// 		choices: [
		// 			{ name: "node", message: "Node", role: "node", hint: "Simple Node.js project" },
		// 			{ name: "react", message: "React", role: "react", hint: "React.js project" },
		// 			{ name: "reactNative", message: "React Native", role: "node", hint: "ReactNative.js project" },
		// 		],
		// 		prefix: "",
		// 	},
		// ]);

		// return {
		// 	...name,
		// 	...git,
		// 	...language,
		// 	...packageManager,
		// 	...type,
		// };
	};

type InitProjectOptions<T> = {
	name?: T;
	git?: boolean;
};

type InitProject<T extends string = string> = ({ ...opts }?: InitProjectOptions<T>) => void;
// => Promise<Project>;

export const initProject: InitProject = async ({ ...opts }) => {
	console.log({ opts });
	const project = await promptForMissingOptions({ ...opts });
	return project;
};
