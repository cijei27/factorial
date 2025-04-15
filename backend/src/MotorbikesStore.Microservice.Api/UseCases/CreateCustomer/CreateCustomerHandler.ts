import { validate } from "class-validator";
import { CreateCustomerCommand } from "./CreateCustomerCommand";

interface ICreateCustomerRequest {
  name: string;
  email: string;
  credit: number;
}
export default class CreateCustomerHandler {
  private createCustomerUseCase: any;

  constructor(createCustomerUseCase: any) {
    this.createCustomerUseCase = createCustomerUseCase;
  }

  async handle(requestData: ICreateCustomerRequest): Promise<any> {
    const command = new CreateCustomerCommand(
      requestData.name,
      requestData.email,
      requestData.credit
    );

    const errors = await validate(command);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const input = {
      name: command.name,
      email: command.email,
      credit: command.credit,
    };
    const customer = await this.createCustomerUseCase.execute(input);
    return customer
      ? { success: true, customer }
      : { success: false, message: "Customer not found" };
  }
}
