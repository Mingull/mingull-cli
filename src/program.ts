import { Command } from "commander";
import { login } from "./user/login";
import { initProject } from "./initProject";
import { isObjectEmpty } from "./utils/helper";

const program = new Command();

program
	.name("Practice CLI")
	.description("This CLI made for initializing projects and managing them")
	.option("-i, --init", "Initialize the CLI")
	.version("0.0.1", "-v, --version")
	.showHelpAfterError()
	.action(async (opts: { init: boolean }) => {
		if (!isObjectEmpty(opts)) return program.help();
		if (opts.init) {
			console.log(await initProject());
			return;
		}
	});

export { program };
