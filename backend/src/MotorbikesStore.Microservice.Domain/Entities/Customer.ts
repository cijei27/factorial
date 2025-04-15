import { Email } from "../ValueObjects/Email";
import { Credit } from "../ValueObjects/Credit";

export class Customer {
  public readonly id?: string; // Lo dejamos opcional para que Mongoose lo asigne
  public name: string;
  public email: Email;
  public credit: Credit;

  constructor(name: string, email: string, credit: number = 0, id?: string) {
    if (!name || name.trim() === "") {
      throw new Error("El nombre es obligatorio");
    }

    this.name = name;
    this.email = new Email(email); // Usando el ValueObject Email
    this.credit = new Credit(credit); // Usando el ValueObject Credit

    if (id) {
      this.id = id;
    }
  }

  // Método para actualizar el nombre
  updateName(newName: string) {
    if (!newName || newName.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    this.name = newName;
  }
  updateEmail(newEmail: Email): void {
    this.email = newEmail; // Usamos el ValueObject para manejar la validación
  }

  updateCredit(newCredit: Credit): void {
    this.credit = newCredit; // Usamos el ValueObject para manejar la validación
  }
  addCredit(amount: number): void {
    this.credit = this.credit.add(amount); // Usando el ValueObject Credit
  }
}
