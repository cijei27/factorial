import ListCustomersByCreditHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/ListCustomersByCredit/ListCustomersByCreditHandler";
import { ListCustomersByCreditUseCase } from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/ListCustomersByCredit/ListCustomersByCreditUseCase";
import { Customer } from "../../../../src/MotorbikesStore.Microservice.Domain/Entities/Customer";
import { Credit } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Credit";
import { Email } from "../../../../src/MotorbikesStore.Microservice.Domain/ValueObjects/Email";

describe("ListCustomersByCreditHandler", () => {
  let mockListCustomersByCreditUseCase: Partial<ListCustomersByCreditUseCase>;
  let handler: ListCustomersByCreditHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockListCustomersByCreditUseCase = {
      execute: jest.fn(),
    };
    handler = new ListCustomersByCreditHandler(
      mockListCustomersByCreditUseCase as ListCustomersByCreditUseCase
    );
  });

  it("should return success and customers array when customers are found", async () => {
    // Arrange
    const expectedCustomers: Customer[] = [
      new Customer("david", "david@gmail.com", 100, "1"),
      new Customer("paco", "paco@gmail.com", 200, "2"),
    ];

    (mockListCustomersByCreditUseCase.execute as jest.Mock).mockResolvedValue(
      expectedCustomers
    );

    // Act
    const result = await handler.handle();

    // Assert
    expect(result.success).toBe(true);
    expect(result.customers).toEqual(expectedCustomers);
  });

  it("should return error if no customers are found", async () => {
    // Arrange
    (mockListCustomersByCreditUseCase.execute as jest.Mock).mockResolvedValue(
      []
    );

    // Act
    const result = await handler.handle();

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Customers not found");
  });
});
