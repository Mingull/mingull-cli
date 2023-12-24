export const isObjectEmpty = <T extends {} = {}>(obj: T): boolean => {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			return true;
		}
	}
	return false;
};
