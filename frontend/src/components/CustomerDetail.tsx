import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Customer } from "../types/customer";
import { getCustomerById } from "../services/customerService";

const CustomerDetail: React.FC = () => {
  const params = useParams<Record<string, string | undefined>>();
  const id = params.id; // id: string | undefined

  // Extraemos el estado y su setter para actualizar el customer
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID de cliente");
      setLoading(false);
      return;
    }

    const fetchCustomer = async () => {
      try {
        const { success, message, customer } = await getCustomerById(id);

        if (!success || !customer) {
          // Si no se encuentra el cliente, marcamos error
          setError(message || "Cliente no encontrado");
          return;
        }
        // Si se encuentra, actualizamos el estado
        setCustomer(customer);
      } catch (err) {
        setError("Error al cargar los detalles del cliente");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error || !customer) return <p>{error || "Cliente no encontrado"}</p>;

  return (
    <div className="content-box">
      <h1 className="content-title">Detalle del Cliente</h1>
      <p className="content-subtitle">
        <strong>Identificador: </strong> {id}
      </p>
      <p className="content-subtitle">
        <strong>Nombre:</strong> {customer.name}
      </p>
      <p className="content-subtitle">
        <strong>Email:</strong> {customer.email}
      </p>
      <p className="content-subtitle">
        <strong>Crédito:</strong> {customer.credit}
      </p>
      <Link to="/customers" className="detail-button">
        Volver a la lista
      </Link>
    </div>
  );
};

export default CustomerDetail;
