import "./Card.css";

export default function Card({id, title, description, image, distance, onShowOnMap }) {
    return (
        <div className="card">
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
                <p className="card__touched"  onClick={() => onShowOnMap(id)}>Mostrar no Mapa</p>
            </div>
        </div>
    );
}