import { IUseCase } from "../../Interfaces/IUseCase";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";

export class ListCustomersByCreditUseCase
  implements IUseCase<void, Customer[]>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<Customer[]> {
    return this.customerRepository.findAllSortedByCredit();
  }
}
