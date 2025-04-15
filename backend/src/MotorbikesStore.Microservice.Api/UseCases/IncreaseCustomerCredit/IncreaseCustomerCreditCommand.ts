import { IsNotEmpty } from "class-validator";

export class IncreaseCustomerCreditCommand {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  credit: number;

  constructor(id: string, credit: number) {
    this.id = id;
    this.credit = credit;
  }
}
