import { IsString, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCustomerCommand {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  credit: number;

  constructor(name: string, email: string, credit: number) {
    this.name = name;
    this.email = email;
    this.credit = credit;
  }
}
