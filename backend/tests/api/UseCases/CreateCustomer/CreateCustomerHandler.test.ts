import CreateCustomerHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/CreateCustomer/CreateCustomerHandler";
import CreateCustomerUseCase from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/CreateCustomer/CreateCustomerUseCase";
import { Customer } from "../../../../src/MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Email } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Email";
import { Credit } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

describe("CreateCustomerHandler", () => {
  let mockCreateCustomerUseCase: Partial<CreateCustomerUseCase>;
  let handler: CreateCustomerHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockCreateCustomerUseCase = {
      execute: jest.fn(),
    };
    handler = new CreateCustomerHandler(
      mockCreateCustomerUseCase as CreateCustomerUseCase
    );
  });

  it("should return success and created customer when all parameters are correct", async () => {
    // Arrange
    const requestData = {
      name: "Pepe",
      email: "quierotrabajarenfactorial@Factorial.com",
      credit: 60000,
    };

    // Definimos el customer esperado, con los Value Objects de Email y Credit
    const expectedCustomer = new Customer(
      requestData.name,
      requestData.email,
      requestData.credit
    );

    (mockCreateCustomerUseCase.execute as jest.Mock).mockResolvedValue(
      expectedCustomer
    );

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.customer.name).toBe(expectedCustomer.name);
    expect(result.customer.email.value).toBe(expectedCustomer.email.value);
    expect(result.customer.credit.value).toBe(expectedCustomer.credit.value);
  });

  it("should return error if use case returns null", async () => {
    // Arrange
    const requestData = {
      name: "Pepe",
      email: "quierotrabajarenfactorial@Factorial.com",
      credit: 60000,
    };

    // Mock para devolver null (caso de error)
    (mockCreateCustomerUseCase.execute as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Customer not found");
  });
});
