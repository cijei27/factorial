import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../types/customer";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../services/customerService";

const CustomerForm: React.FC = () => {
  const params = useParams<Record<string, string | undefined>>();
  const id = params.id;
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    credit: 0,
  });

  useEffect(() => {
    if (isEditMode && id) {
      getCustomerById(id)
        .then((response) => {
          if (response.success === false) {
            alert(response.message || "Error al cargar el cliente");
            // Opcional: redirigir al listado si falla
            navigate("/customers");
            return;
          }
          const customer = response.customer as Customer;
          setFormData({
            name: customer.name,
            email: customer.email,
            credit: customer.credit,
          });
        })
        .catch(() => {
          alert("Error al cargar el cliente");
        });
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "credit") {
      setFormData((prev) => ({
        ...prev,
        credit: Number(value), // Aseguramos que el valor de crédito sea un número
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const customerData = {
        name: formData.name,
        email: formData.email,
        credit: formData.credit,
      };

      if (isEditMode && id) {
        await updateCustomer(id, customerData);
      } else {
        await createCustomer(customerData);
      }
      navigate("/customers");
    } catch (error) {
      alert("Error al guardar el cliente");
    }
  };

  return (
    <div className="search-container">
      <h1 className="content-title">
        {isEditMode ? "Editar Cliente" : "Crear Cliente"}
      </h1>
      <div className="search-controls">
        <form onSubmit={handleSubmit}>
          <label className="seach-label">
            Nombre:
            <input
              type="text"
              name="name"
              className="search-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className="seach-label">
            Email:
            <input
              type="email"
              name="email"
              className="search-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label className="seach-label">
            Crédito:
            <input
              type="number"
              name="credit"
              className="search-input"
              value={formData.credit}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" className="search-button">
            {isEditMode ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
