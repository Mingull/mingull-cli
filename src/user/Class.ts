export class User {
	private _name: string;
	private _username: string;
	private _password: string;
	private _age: number;
	private _role: "user" | "admin";

	constructor(name: string, username: string, password: string, age: number) {
		this._name = name;
		this._username = username;
		this._password = password;
		this._age = age;
		this._role = "user";
	}

	getName(): string {
		return this._name;
	}

	setName(name: string): void {
		this._name = name;
	}

	getUsername(): string {
		return this._username;
	}

	setUsername(username: string): void {
		this._username = username;
	}

	getPassword(): string {
		return this._password;
	}

	setPassword(password: string): void {
		this._password = password;
	}

	getAge(): number {
		return this._age;
	}

	setAge(age: number): void {
		this._age = age;
	}

	getRole(): "user" | "admin" {
		return this._role;
	}

	setRole(role: "user" | "admin"): void {
		this._role = role;
	}
}
