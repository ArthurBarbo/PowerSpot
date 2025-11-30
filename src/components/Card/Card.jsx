import { useState } from "react";
import "./Card.css";
import saveIcon from "../../images/unsaved.svg";
import savedIcon from "../../images/saved.svg";

export default function Card({ id, title, description, image, distance, onShowOnMap }) {
  const [saved, setSaved] = useState(false);

  const toggleSave = () => setSaved(prev => !prev);

  return (
    <div className="card">
      {/* Ícone no topo à direita */}
      <button className="card__save-btn" onClick={toggleSave}>
        <img
          src={saved ? savedIcon : saveIcon}
          alt={saved ? "Salvo" : "Salvar"}
          className="card__save-icon"
        />
      </button>

      <img src={image} alt={title} className="card__image" />

      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>

        <p className="card__distance">
          Distância: {
            typeof distance === "number"
              ? distance < 1
                ? `${Math.round(distance * 1000)} m`
                : `${distance.toFixed(2)} km`
              : "Calculando..."
          }
        </p>

        <p className="card__touched" onClick={() => onShowOnMap(id)}>
          Mostrar no Mapa
        </p>
      </div>
    </div>
  );
}