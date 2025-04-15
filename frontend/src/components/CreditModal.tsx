import React, { useState } from "react";

interface CreditModalProps {
  onAddCredit: (clientId: string, amount: number) => void;
  onClose: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ onAddCredit, onClose }) => {
  const [clientId, setClientId] = useState<string>("");
  const [credit, setCredit] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) {
      alert("Por favor, ingrese el identificador del cliente");
      return;
    }
    if (credit <= 0) {
      alert("Ingrese un monto de crédito mayor que 0");
      return;
    }
    onAddCredit(clientId, credit);
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modal-title">
      <div className="modal">
        <h2 className="content-title" id="modal-title">
          Añadir Crédito a Cliente
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="seach-label">
            Identificador del Cliente:
            <input
              type="text"
              value={clientId}
              className="search-input"
              onChange={(e) => setClientId(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="seach-label">
            Cantidad de Crédito:
            <input
              type="number"
              value={credit}
              className="search-input"
              onChange={(e) => setCredit(Number(e.target.value))}
              required
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="detail-button">
              Agregar
            </button>
            <button type="button" onClick={onClose} className="detail-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditModal;
