import { IsMongoId } from "class-validator";

export class DeleteCustomerCommand {
  @IsMongoId()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
