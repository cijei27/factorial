import React from "react";
import "./../index.css";
import { Link } from "react-router-dom";

const InformationSection: React.FC = () => {
  return (
    <section className="time-management">
      {/* Contenido principal (Título y texto introductorio) */}
      <div className="time-management__intro">
        <h2 className="time-management__title">
          Gestiona el tiempo de tu equipo y el de tus clientes pero sin perder
          el tuyo
        </h2>
        <p className="time-management__text">
          Obtén visibilidad sobre la información de los créditos de tus
          clientes. ¿Por qué la automatización de tus clientes puede ser tan
          importante para ti?
        </p>
      </div>

      {/* Tarjetas inferiores */}
      <div className="time-management__cards">
        <div className="time-management__card">
          <h3>Búsqueda de clientes</h3>
          <p>
            Revisa los datos de los clientes y comprueba sus puntos débiles para
            medir tu productividad.
          </p>
          <Link to="/customers/search" className="time-management__card-link">
            Cómo lo busco &rarr;
          </Link>
        </div>
        <div className="time-management__card">
          <h3>Nuevos Clientes</h3>
          <p>
            Coordina nuevas incorporaciones a tu listado con esta espléndida
            funcionalidad. Ahora costes y aprueba solicitudes al instante.
          </p>
          <Link to="/customers/new" className="time-management__card-link">
            Cómo lo doy de alta &rarr;
          </Link>
        </div>
        <div className="time-management__card">
          <h3>Gestión del crédito</h3>
          <p>
            Planifica y asigna créditos a tus clientes para que utilicen
            Factorial.
          </p>
          <Link to="/credit" className="time-management__card-link">
            Cómo le añado crédito &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
