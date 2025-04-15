import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";

interface IListCustomersByCreditResponse {
  success: boolean;
  message: string;
  customers?: Customer[];
}

export default class ListCustomersByCreditHandler {
  private listCustomersByCreditUseCase: any;

  constructor(listCustomersByCreditUseCase: any) {
    this.listCustomersByCreditUseCase = listCustomersByCreditUseCase;
  }

  async handle(): Promise<IListCustomersByCreditResponse> {
    const customers: Customer[] =
      await this.listCustomersByCreditUseCase.execute();

    if (!customers || customers.length === 0) {
      return { success: false, message: "Customers not found" };
    }
    return {
      success: true,
      message: "Customers found successfully",
      customers,
    };
  }
}
