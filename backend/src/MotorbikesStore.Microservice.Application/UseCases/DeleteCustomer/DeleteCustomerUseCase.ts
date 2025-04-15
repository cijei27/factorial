import { IUseCase } from "../../Interfaces/IUseCase";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";

export class DeleteCustomerUseCase implements IUseCase<string, boolean> {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(id: string): Promise<boolean> {
    return this.customerRepository.delete(id);
  }
}
