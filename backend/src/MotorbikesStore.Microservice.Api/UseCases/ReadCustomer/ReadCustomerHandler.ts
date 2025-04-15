import { validate } from "class-validator";
import { ReadCustomerCommand } from "./ReadCustomerCommand";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";

interface IReadCustomerRequest {
  id: string;
}

interface IReadCustomerResponse {
  success: boolean;
  message: string;
  customer?: Customer;
}

export default class ReadCustomerHandler {
  private readCustomerUseCase: any;

  constructor(readCustomerUseCase: any) {
    this.readCustomerUseCase = readCustomerUseCase;
  }

  async handle(
    requestData: IReadCustomerRequest
  ): Promise<IReadCustomerResponse> {
    const command = new ReadCustomerCommand(requestData.id);

    const errors = await validate(command);
    if (errors.length > 0) {
      return {
        success: false,
        message: "Id is mandatory to find the customer",
      };
    }

    const input = { id: command.id };
    const customer: Customer | null = await this.readCustomerUseCase.execute(
      input
    );

    if (!customer) {
      return { success: false, message: "Customer not found" };
    }
    return { success: true, message: "Customer found successfully", customer };
  }
}
