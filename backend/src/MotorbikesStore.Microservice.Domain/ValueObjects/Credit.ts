export class Credit {
  private readonly _value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error("El crédito debe ser un valor positivo");
    }
    this._value = value;
  }

  add(amount: number): Credit {
    if (amount < 0) {
      throw new Error("La cantidad a añadir debe ser positiva");
    }
    return new Credit(this._value + amount);
  }
  get value(): number {
    return this._value;
  }

  toJSON() {
    return this.value; // Solo expone el valor del email
  }
}
