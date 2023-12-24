import { prompt } from "enquirer";

const login = async (username: string | undefined) => {
	if (username)
		return {
			username,
			...(await prompt({
				type: "password",
				name: "password",
				message: "What is your password?",
			})),
		};

	return await prompt([
		{
			type: "text",
			name: "username",
			message: "What is your username?",
		},
		{
			type: "password",
			name: "password",
			message: "What is your password?",
		},
	]);
};

export { login };
