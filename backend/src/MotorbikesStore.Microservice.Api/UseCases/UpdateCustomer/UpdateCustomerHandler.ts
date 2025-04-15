import { validate } from "class-validator";
import { UpdateCustomerCommand } from "./UpdateCustomerCommand";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Email } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Email";
import { Credit } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

interface IUpdateCustomerRequest {
  id: string;
  name: string;
  email: string;
  credit: number;
}

export default class UpdateCustomerHandler {
  private updateCustomerUseCase: any; // Se recomienda tiparlo adecuadamente

  constructor(updateCustomerUseCase: any) {
    this.updateCustomerUseCase = updateCustomerUseCase;
  }

  async handle(requestData: IUpdateCustomerRequest): Promise<any> {
    // Creamos el comando utilizando los datos primitivos
    const command = new UpdateCustomerCommand(
      requestData.id,
      requestData.name,
      requestData.email,
      requestData.credit
    );

    // Validamos el comando
    const errors = await validate(command);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Convertimos los datos primitivos en Value Objects para la capa de dominio
    const input = {
      id: command.id,
      name: command.name,
      email: command.email,
      credit: command.credit,
    };
    // Ejecutamos el use case y devolvemos la respuesta
    const customer = await this.updateCustomerUseCase.execute(input);
    return customer
      ? { success: true, customer }
      : { success: false, message: "Customer not updated" };
  }
}
