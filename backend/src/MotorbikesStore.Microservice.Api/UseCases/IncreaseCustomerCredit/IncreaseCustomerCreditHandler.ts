import { validate } from "class-validator";
import { IncreaseCustomerCreditCommand } from "./IncreaseCustomerCreditCommand";
import { Customer } from "../../../MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Credit } from "../../../MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

interface IIncreaseCustomerCreditRequest {
  id: string;
  credit: number;
}

export default class IncreaseCustomerCreditHandler {
  private increaseCustomerCreditUseCase: any; // Se recomienda tiparlo adecuadamente

  constructor(increaseCustomerCreditUseCase: any) {
    this.increaseCustomerCreditUseCase = increaseCustomerCreditUseCase;
  }

  async handle(requestData: IIncreaseCustomerCreditRequest): Promise<any> {
    // Creamos el comando a partir de datos primitivos
    const command = new IncreaseCustomerCreditCommand(
      requestData.id,
      requestData.credit
    );

    // Validamos el comando
    const errors = await validate(command);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    // Convertimos el crédito en su Value Object
    const input = {
      id: command.id,
      credit: new Credit(command.credit),
    };

    // Ejecutamos el use case y devolvemos la respuesta
    const customer = await this.increaseCustomerCreditUseCase.execute(input);
    return customer
      ? { success: true, customer }
      : { success: false, message: "Update failed" };
  }
}
