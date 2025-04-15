import UpdateCustomerHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/UpdateCustomer/UpdateCustomerHandler";
import { UpdateCustomerUseCase } from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/UpdateCustomer/UpdateCustomerUseCase";
import { Customer } from "../../../../src/MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Email } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Email";
import { Credit } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Credit";

describe("UpdateCustomerHandler", () => {
  let mockUpdateCustomerUseCase: Partial<UpdateCustomerUseCase>;
  let handler: UpdateCustomerHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockUpdateCustomerUseCase = {
      execute: jest.fn(),
    };
    handler = new UpdateCustomerHandler(
      mockUpdateCustomerUseCase as UpdateCustomerUseCase
    );
  });

  it("should return success and updated customer when update is successful", async () => {
    // Arrange
    const requestData = {
      id: "507f1f77bcf86cd799439011",
      name: "DAvid ramirez",
      email: "david.ramirez@gmail.com",
      credit: 150,
    };

    // Creamos el expectedCustomer usando los Value Objects
    const expectedCustomer: Customer = new Customer(
      "DAvid ramirez",
      "david.ramirez@gmail.com",
      150,
      "507f1f77bcf86cd799439011"
    );

    (mockUpdateCustomerUseCase.execute as jest.Mock).mockResolvedValue(
      expectedCustomer
    );

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.customer).toEqual(expectedCustomer);
  });

  it("should return error if update fails", async () => {
    // Arrange
    const requestData = {
      id: "507f1f77bcf86cd799439011",
      name: "pedro pascal",
      email: "pedro@gmail.com",
      credit: 150,
    };

    (mockUpdateCustomerUseCase.execute as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Customer not updated");
  });
});
