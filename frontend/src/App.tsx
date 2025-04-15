import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerDetail from "./components/CustomerDetail";
import CustomerSearch from "./components/CustomerSearch";
import CreditDetail from "./components/CreditDetail";
import "./index.css";
import TopNav from "./components/TopNav";
import InformationSection from "./components/InformationSection";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TopNav />
      <div>
        {/* Sección Hero con Parallax */}
        <section className="parallax-section">
          {/* Columna de Texto */}
          <div className="hero-text">
            <h1>Software empresarial para tus clientes</h1>
            <p>
              La mejor solución para gestionar tus clientes de manera eficiente.
            </p>
          </div>
          {/* Columna de Imagen */}
          <div className="hero-image"></div>
        </section>
        <section className="clientes-text">
          <h2>¡Miles de clientes confian en nosotros!</h2>
          <h3>
            En Factorial empezamos manejando tus equipos ahora manejamos tus
            clientes. ¡¡Bienvenido a Factorial Pulse!!
          </h3>
        </section>
        <InformationSection />
        {/* Sección de contenido con las rutas de React Router */}
        <section className="content-section">
          <Routes>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/:id/edit" element={<CustomerForm />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/customers/search" element={<CustomerSearch />} />
            <Route path="/credit" element={<CreditDetail />} />
            <Route path="*" element={<CustomerList />} />
          </Routes>
        </section>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
