import { Customer } from "../Entities/Customer";

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  update(id: string, data: Partial<Customer>): Promise<Customer | null>;
  delete(id: string): Promise<boolean>;
  findAllSortedByCredit(): Promise<Customer[]>;
  increaseCredit(id: string, data: Partial<Customer>): Promise<Customer | null>;
}
