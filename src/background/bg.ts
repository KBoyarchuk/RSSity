class User {
  constructor(public name: string) {
    this.name = name;
  }
  greet() {
    return `Hello, I'm ${this.name}!`;
  }
}

export { User };
