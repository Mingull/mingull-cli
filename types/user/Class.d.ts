export declare class User {
    private _name;
    private _username;
    private _password;
    private _age;
    private _role;
    constructor(name: string, username: string, password: string, age: number);
    getName(): string;
    setName(name: string): void;
    getUsername(): string;
    setUsername(username: string): void;
    getPassword(): string;
    setPassword(password: string): void;
    getAge(): number;
    setAge(age: number): void;
    getRole(): "user" | "admin";
    setRole(role: "user" | "admin"): void;
}
