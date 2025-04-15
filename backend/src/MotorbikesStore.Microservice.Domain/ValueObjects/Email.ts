export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new Error("El formato del email no es válidoo");
    }
    this._value = value;
  }

  // Getter para acceder al valor del email
  get value(): string {
    return this._value;
  }
  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
  toJSON() {
    return this.value; // Solo expone el valor del email
  }
}
