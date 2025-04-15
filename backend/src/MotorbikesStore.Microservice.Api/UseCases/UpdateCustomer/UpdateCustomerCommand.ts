import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
} from "class-validator";

export class UpdateCustomerCommand {
  @IsMongoId()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsNumber()
  public credit: number;

  constructor(id: string, name: string, email: string, credit: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.credit = credit;
  }
}
