import axios from "axios";
import { Customer } from "../types/customer";

const API_URL = process.env.REACT_APP_API_URL;

interface CustomerResponse {
  success: boolean;
  message: string;
  customers?: Customer[];
}

interface CustomerIdResponse {
  success: boolean;
  message: string;
  customer: Customer;
}

// Obtener la lista de los clientes
export const getCustomers = async (): Promise<{
  success: boolean;
  message: string;
  customers: Customer[];
}> => {
  const response = await axios.get<CustomerResponse>(`${API_URL}/customers`);
  const { success, message, customers } = response.data;

  if (!success || !customers) {
    return {
      success: false,
      message: message,
      customers: [],
    };
  }

  const transformed: Customer[] = customers.map((cust: any) => ({
    id: cust.id, // Aquí ya tienes el id como lo esperas (sin necesidad de acceder a _id)
    name: cust.name,
    email: cust.email, // Accedemos al valor del email
    credit: cust.credit, // Accedemos al valor del crédito
  }));

  return {
    success: true,
    message,
    customers: transformed,
  };
};

// Obtener un cliente por ID
export const getCustomerById = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  customer?: Customer;
}> => {
  const response = await axios.get<CustomerIdResponse>(
    `${API_URL}/customers/${id}`
  );
  const { success, message, customer } = response.data;

  if (!success || !customer) {
    return {
      success: false,
      message: message || "Customer not found",
    };
  }

  // Transformamos la respuesta en tu tipo 'Customer' para el frontend
  const transformed: Customer = {
    id: customer.id,
    name: customer.name,
    email: customer.email, // Accedemos al valor del email
    credit: customer.credit, // Accedemos al valor del crédito
  };

  return {
    success: true,
    message,
    customer: transformed,
  };
};

// Crear un nuevo cliente
export const createCustomer = async (
  customer: Omit<Customer, "id">
): Promise<Customer> => {
  // Se espera que el endpoint POST /customers devuelva { success: true, customer: Customer }
  const response = await axios.post(`${API_URL}/customers`, customer, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.customer;
};

// Actualizar un cliente
export const updateCustomer = async (
  id: string,
  customer: Partial<Customer>
): Promise<Customer> => {
  // Se espera que el endpoint PUT /customers/:id devuelva { success: true, customer: Customer }
  console.log("customer", customer);
  const response = await axios.put(`${API_URL}/customers/${id}`, customer, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.customer;
};

// Eliminar un cliente
export const deleteCustomer = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  // Se espera que el endpoint DELETE /customers/:id devuelva { success: boolean, message: string }
  const response = await axios.delete(`${API_URL}/customers/${id}`);
  return response.data;
};

// Incrementar crédito de un cliente
export const addCreditToCustomer = async (
  id: string,
  credit: number
): Promise<Customer> => {
  // Se espera que el endpoint PATCH /customers/:id/add-credit devuelva { success: true, customer: Customer }
  const response = await axios.patch(
    `${API_URL}/customers/${id}/add-credit`,
    { credit },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.customer;
};
