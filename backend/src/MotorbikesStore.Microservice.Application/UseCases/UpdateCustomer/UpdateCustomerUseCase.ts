import UpdateCustomerInput from "./UpdateCustomerInput";
import { IUseCase } from "../../Interfaces/IUseCase";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";
import { Email } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Email";
import { Credit } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

export class UpdateCustomerUseCase
  implements IUseCase<UpdateCustomerInput, Customer | null>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: UpdateCustomerInput): Promise<Customer | null> {
    // 1. Buscar el cliente actual.
    const customer = await this.customerRepository.findById(input.id);
    if (!customer) {
      throw new Error("Customer not found");
    }

    // 2. Actualizar los campos necesarios
    customer.updateName(input.name);
    customer.updateEmail(input.email);
    customer.updateCredit(input.credit);
    // 3. Persiste customer
    const updatedCustomer = await this.customerRepository.update(
      input.id,
      customer
    );
    return updatedCustomer;
  }
}
