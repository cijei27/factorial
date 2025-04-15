import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../services/customerService";
import { Customer } from "../types/customer";

const CustomerSearch: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(null);
    setCustomer(null);

    if (!id.trim()) {
      setError("Por favor, ingresa un identificador.");
      return; // No hacemos la búsqueda
    }

    setLoading(true);

    try {
      // getCustomerById retorna { success, message, customer }
      const { success, message, customer } = await getCustomerById(id);

      if (!success || !customer) {
        // Si no hay success o el campo customer está indefinido => error
        setError(message || "Cliente no encontrado");
        return; // Evitamos asignar el estado 'customer'
      }

      // Si todo OK, asignamos el customer al estado
      setCustomer(customer);
    } catch (err) {
      // Errores de red / server
      setError("Error en la búsqueda o no se encontró el cliente.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = () => {
    if (customer) {
      navigate(`/customers/${customer.id}`);
    }
  };

  return (
    <div className="search-container">
      <h1 className="content-title">Buscar Cliente</h1>
      <p className="content-subtitle">
        Ingresa el identificador del cliente para buscar su información.
      </p>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Ingrese identificador del cliente"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="search-input"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="search-button"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {customer && (
        <div className="result-box">
          <h2 className="content-title">Cliente Encontrado</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Crédito</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.credit}</td>
                <td>
                  <button onClick={handleViewDetail} className="detail-button">
                    Más Detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
