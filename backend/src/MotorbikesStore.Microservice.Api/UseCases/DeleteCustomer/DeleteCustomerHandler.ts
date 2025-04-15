import { validate } from "class-validator";
import { DeleteCustomerCommand } from "./DeleteCustomerCommand";

interface IHandlerResponse {
  success: boolean;
  message: string;
}

interface IDeleteCustomerRequest {
  id: string;
}

export default class DeleteCustomerHandler {
  private deleteCustomerUseCase: any;

  constructor(deleteCustomerUseCase: any) {
    this.deleteCustomerUseCase = deleteCustomerUseCase;
  }
  async handle(requestData: IDeleteCustomerRequest): Promise<IHandlerResponse> {
    const command = new DeleteCustomerCommand(requestData.id);

    const errors = await validate(command);
    if (errors.length > 0) {
      return {
        success: false,
        message: "Id is mandatory to delete the customer",
      };
    }
    const input = { id: command.id };
    const deletedCustomer = await this.deleteCustomerUseCase.execute(input);
    if (!deletedCustomer) {
      return { success: false, message: "Customer not found" };
    }
    return { success: true, message: "Customer deleted successfully" };
  }
}
