// tests/unit/DeleteCustomerHandler.test.ts
import DeleteCustomerHandler from "../../../../src/MotorbikesStore.Microservice.Api/UseCases/DeleteCustomer/DeleteCustomerHandler";
import { DeleteCustomerUseCase } from "../../../../src/MotorbikesStore.Microservice.Application/UseCases/DeleteCustomer/DeleteCustomerUseCase";

interface IHandlerResponse {
  success: boolean;
  message: string;
}

interface IDeleteCustomerRequest {
  id: string;
}
describe("DeleteCustomerHandler", () => {
  let mockDeleteCustomerUseCase: Partial<DeleteCustomerUseCase>;
  let handler: DeleteCustomerHandler;

  beforeEach(() => {
    // Arrange: Creamos un mock del use case
    mockDeleteCustomerUseCase = {
      execute: jest.fn(),
    };
    handler = new DeleteCustomerHandler(
      mockDeleteCustomerUseCase as DeleteCustomerUseCase
    );
  });

  it("should return success and message 'Customer deleted successfully' when everything is ok", async () => {
    // Arrange
    const requestData: IDeleteCustomerRequest = {
      id: "507f1f77bcf86cd799439011",
    };
    // Simulamos que el use case devuelve true (éxito)
    (mockDeleteCustomerUseCase.execute as jest.Mock).mockResolvedValue(true);

    // Act
    const result: IHandlerResponse = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe("Customer deleted successfully");
  });

  it("should return error with message 'Customer not found' when everything fails", async () => {
    // Arrange
    const requestData: IDeleteCustomerRequest = {
      id: "507f1f77bcf86cd799439011",
    };
    // Simulamos que el use case devuelve false indicando que no se encontró el cliente
    (mockDeleteCustomerUseCase.execute as jest.Mock).mockResolvedValue(false);

    // Act
    const result: IHandlerResponse = await handler.handle(requestData);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe("Customer not found");
  });
});
