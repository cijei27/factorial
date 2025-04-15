import { Email } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Email";
import { Credit } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

export default class UpdateCustomerInput {
  public id: string;
  public name: string;
  public email: Email;
  public credit: Credit;

  constructor(id: string, name: string, email: string, credit: number) {
    this.id = id;
    this.name = name;
    this.email = new Email(email); // Instancia de Email como un Value Object
    this.credit = new Credit(credit); // Instancia de Credit como un Value Object
  }
}
