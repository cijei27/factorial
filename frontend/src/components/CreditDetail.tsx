// src/components/CreditPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CreditModal from "./CreditModal";
import { addCreditToCustomer } from "../services/customerService";

const CreditDetail: React.FC = () => {
  const navigate = useNavigate();

  const handleAddCredit = async (clientId: string, amount: number) => {
    try {
      await addCreditToCustomer(clientId, amount);
      alert("Crédito actualizado correctamente");
      navigate("/customers");
    } catch (error) {
      alert("Error al agregar crédito");
    }
  };

  return (
    <div>
      <CreditModal
        onAddCredit={handleAddCredit}
        onClose={() => navigate("/customers")}
      />
    </div>
  );
};

export default CreditDetail;
