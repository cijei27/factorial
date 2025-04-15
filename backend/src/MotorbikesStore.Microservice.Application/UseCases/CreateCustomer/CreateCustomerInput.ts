export default class CreateCustomerInput {
  public name: string;
  public email: string;
  public credit: number;

  constructor(name: string, email: string, credit: number) {
    this.name = name;
    this.email = email;
    this.credit = credit;
  }
}
