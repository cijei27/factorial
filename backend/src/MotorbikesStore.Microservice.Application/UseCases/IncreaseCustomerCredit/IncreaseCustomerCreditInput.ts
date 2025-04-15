import { Credit } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Credit";
export default class IncreaseCustomerCreditInput {
  public id: string;
  public credit: Credit;

  constructor(id: string, credit: number) {
    this.id = id;
    this.credit = new Credit(credit);
  }
}
