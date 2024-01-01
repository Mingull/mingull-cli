import { Command } from "commander";
import { login } from "./user/login";
import { initProject } from "./initProject";
import { isObjectEmpty } from "./utils/isObjectEmpty";

const program = new Command();

program
	.name("Practice CLI")
	.description("This CLI made for initializing projects and managing them")
	.option("-i, --init", "Initialize the CLI")
	.option("-g, --git", "Initialize the project with git")
	.argument("[name]", "Name of the project")
	.version("0.0.1", "-v, --version")
	.showHelpAfterError()
	.action(async (name: string | undefined, opts: { init: boolean | string; git: boolean }) => {
		if (!isObjectEmpty(opts)) return program.help();
		if (opts.init) {
			console.log(await initProject({ name, ...opts }));
			return;
		}
	});

export { program };
