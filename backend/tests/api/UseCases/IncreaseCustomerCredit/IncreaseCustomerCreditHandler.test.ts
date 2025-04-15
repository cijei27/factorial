import IncreaseCustomerCreditHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/IncreaseCustomerCredit/IncreaseCustomerCreditHandler";
import { IncreaseCustomerCreditUseCase } from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/IncreaseCustomerCredit/IncreaseCustomerCreditUseCase";
import { Customer } from "../../../../src/MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Credit } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

describe("IncreaseCustomerCreditHandler", () => {
  let mockIncreaseCustomerCreditUseCase: Partial<IncreaseCustomerCreditUseCase>;
  let handler: IncreaseCustomerCreditHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockIncreaseCustomerCreditUseCase = {
      execute: jest.fn(),
    };
    handler = new IncreaseCustomerCreditHandler(
      mockIncreaseCustomerCreditUseCase as IncreaseCustomerCreditUseCase
    );
  });

  it("should return success and updated customer when credit is increased correctly", async () => {
    // Arrange
    const requestData = { id: "507f1f77bcf86cd799439011", credit: 5000 };

    // Creamos el valor esperado con el Value Object Credit
    const expectedCustomer = new Customer(
      "Pepes",
      "pep@example.com",
      5000,
      requestData.id
    );

    (mockIncreaseCustomerCreditUseCase.execute as jest.Mock).mockResolvedValue(
      expectedCustomer
    );

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.customer).toEqual(expectedCustomer);
  });

  it("should return error with message 'Update failed' when use case returns null", async () => {
    // Arrange
    const requestData = { id: "507f1f77bcf86cd799439011", credit: 5000 };
    (mockIncreaseCustomerCreditUseCase.execute as jest.Mock).mockResolvedValue(
      null
    );

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Update failed");
  });
});
