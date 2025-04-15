import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";
import CreateCustomerInput from "./CreateCustomerInput";
import { IUseCase } from "../../Interfaces/IUseCase";

export interface CreateCustomerOutput {
  customer: Customer;
}
export default class CreateCustomerUseCase
  implements IUseCase<CreateCustomerInput, CreateCustomerOutput>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
    const newCustomer = new Customer(input.name, input.email, input.credit);
    const created = await this.customerRepository.create(newCustomer);

    return { customer: created };
  }
}
