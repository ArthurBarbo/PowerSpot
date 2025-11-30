import "./Card.css";
import saveIcon from "../../images/unsaved.svg";
import savedIcon from "../../images/saved.svg";

export default function Card({
  id,
  title,
  description,
  image,
  distance,
  onShowOnMap,
  onToggleFavorite,
  isFavorite
}) {
  return (
    <div className="card">

      {/* Botão de salvar */}
      <button className="card__save-btn" onClick={onToggleFavorite}>
        <img
          src={isFavorite ? savedIcon : saveIcon}
          alt={isFavorite ? "Salvo" : "Salvar"}
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