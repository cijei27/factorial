import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";
import ReadCustomerInput from "./ReadCustomerInput";

export default class ReadCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: ReadCustomerInput): Promise<Customer | null> {
    return await this.customerRepository.findById(input.id);
  }
}
