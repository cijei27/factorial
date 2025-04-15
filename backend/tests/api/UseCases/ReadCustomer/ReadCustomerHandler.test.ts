import ReadCustomerHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/ReadCustomer/ReadCustomerHandler";
import ReadCustomerUseCase from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/ReadCustomer/ReadCustomerUseCase";
import { Customer } from "../../../../src/MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Credit } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Credit";
import { Email } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Email";

describe("ReadCustomerHandler", () => {
  let mockReadCustomerUseCase: Partial<ReadCustomerUseCase>;
  let handler: ReadCustomerHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockReadCustomerUseCase = {
      execute: jest.fn(),
    };
    handler = new ReadCustomerHandler(
      mockReadCustomerUseCase as ReadCustomerUseCase
    );
  });

  it("should return success and customer when found", async () => {
    // Arrange
    const requestData = { id: "507f1f77bcf86cd799439011" };
    const expectedCustomer: Customer = new Customer(
      "pedro tomas",
      "petomas@gmail.com",
      100,
      "507f1f77bcf86cd799439011"
    );

    (mockReadCustomerUseCase.execute as jest.Mock).mockResolvedValue(
      expectedCustomer
    );

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.customer).toEqual(expectedCustomer);
  });

  it("should return error if customer not found", async () => {
    // Arrange
    const requestData = { id: "507f1f77bcf86cd799439011" };
    (mockReadCustomerUseCase.execute as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Customer not found");
  });
});
