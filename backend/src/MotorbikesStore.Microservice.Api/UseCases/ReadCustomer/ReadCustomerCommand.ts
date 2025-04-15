import { IsMongoId } from "class-validator";

export class ReadCustomerCommand {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
