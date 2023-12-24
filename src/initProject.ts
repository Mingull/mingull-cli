import { prompt } from "enquirer";

export type Project = {
	name: string;
	language: "JavaScript" | "TypeScript";
	packageManager: "npm" | "pnpm" | "yarn";
	type: "node" | "react" | "reactNative";
};

export const initProject = async () => {
	try {
		const name = await prompt<Pick<Project, "name">>({
			name: "name",
			type: "input",
			message: "What is the name of your project?",
			prefix: "📝",
		});

		const language = await prompt<Pick<Project, "language">>({
			name: "language",
			type: "autocomplete",
			message: "What language do you want to use?",
			choices: [
				{ name: "javascript", message: "JavaScript", role: "javascript", hint: "JavaScript language" },
				{ name: "typescript", message: "TypeScript", role: "typescript", hint: "TypeScript language" },
				{ name: "java", message: "Java", role: "java", hint: "Java language", disabled: true },
				{ name: "python", message: "Python", role: "python", hint: "Python language", disabled: true },
			],
			prefix: "📚",
		});

		const packageManager = await prompt<Pick<Project, "packageManager">>([
			{
				name: "packageManager",
				type: "select",
				message: "What package manager do you use?",
				choices: ["npm", "pnpm", "yarn"],
				prefix: "📦",
			},
		]);

		const type = await prompt<Pick<Project, "type">>([
			{
				name: "type",
				type: "autocomplete",
				message: "What type of project is it?",
				choices: [
					{ name: "node", message: "Node", role: "node", hint: "Simple Node.js project" },
					{ name: "react", message: "React", role: "react", hint: "React.js project" },
					{ name: "reactNative", message: "React Native", role: "node", hint: "ReactNative.js project" },
				],
				prefix: "📚",
			},
		]);

		return {
			...name,
			...language,
			...packageManager,
			...type,
		};
	} catch (err) {
		console.error(err);
	}
};
