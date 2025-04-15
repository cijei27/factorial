import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { ICustomerRepository } from "../../../MotorbikesStore.Microservice.Domain/Interfaces/ICustomerRepository";
import IncreaseCustomerCreditInput from "./IncreaseCustomerCreditInput";
import { IUseCase } from "../../Interfaces/IUseCase";
export class IncreaseCustomerCreditUseCase
  implements IUseCase<IncreaseCustomerCreditInput, Customer | null>
{
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: IncreaseCustomerCreditInput): Promise<Customer | null> {
    // 1. Buscar el cliente actual.
    const customer = await this.customerRepository.findById(input.id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    // 2. Actualizar el crédito en la entidad (el método addCredit usa el VO Credit).
    customer.addCredit(input.credit.value);
    // 3. Persiste sólo el campo 'credit' actualizado.
    const updatedCustomer = await this.customerRepository.increaseCredit(
      input.id,
      { credit: customer.credit }
    );
    return updatedCustomer;
  }
}
