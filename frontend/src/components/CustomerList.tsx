import React, { useState, useEffect } from "react";
import { Customer } from "../types/customer";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { Link, useNavigate } from "react-router-dom";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showList, setShowList] = useState<boolean>(false);
  const navigate = useNavigate();

  // Cargar los clientes
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { success, message, customers } = await getCustomers();

      if (!success) {
        alert(message || "No hay clientes");
        navigate("/customers/new");
        return;
      }

      setCustomers(customers);
      setShowList(true);
    } catch (err) {
      setError("Error al cargar todos clientes");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un cliente
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Está seguro de eliminar el cliente?")) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter((c) => c.id !== id));
      } catch (err) {
        alert("Error eliminando el cliente");
      }
    }
  };

  // Mientras no se muestre la lista, mostramos el botón para cargar clientes.
  if (!showList) {
    return (
      <div>
        <h1 className="content-title">
          Ayudamos a empresas a gestionar sus clientes y sus créditos. Porque
          para nosotros tu tiempo y el de tus clientes es nuestra mayor
          prioridad
        </h1>
        <button
          className="detail-button"
          onClick={fetchCustomers}
          disabled={loading}
        >
          {loading ? "Cargando clientes..." : "Quiero gestionar"}
        </button>
        {error && <p>{error}</p>}
      </div>
    );
  }

  // Una vez cargados los clientes, se muestra la tabla
  return (
    <div>
      <h1 className="content-title">Listado de Clientes</h1>
      {customers.length === 0 ? (
        <div className="content-box">
          <p style={{ textAlign: "center" }}>
            No hay clientes, por favor añade un nuevo cliente.
          </p>
          {/* Botón que redirige a la creación de clientes */}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/customers/new" className="detail-button">
              Añadir Cliente
            </Link>
          </div>
        </div>
      ) : (
        <div className="content-box">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Crédito</th>
                <th>Identificador</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  {/* Asegurándonos de acceder correctamente al valor */}
                  <td>{customer.email}</td>
                  <td>{customer.credit}</td>
                  <td>{customer.id}</td>
                  <td>
                    <Link
                      to={`/customers/${customer.id}/edit`}
                      className="detail-button"
                    >
                      Editar
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="detail-button"
                    >
                      Eliminar
                    </button>{" "}
                    |{" "}
                    <Link
                      to={`/customers/${customer.id}`}
                      className="detail-button"
                    >
                      Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
