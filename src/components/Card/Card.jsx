import "./Card.css";

export default function Card({ title, description, image }) {
    return (
        <div className="card">
            <img src={image} alt={title} className="card__image" />
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <p className="card__description">{description}</p>
                <p className="card__touched">Mostrar no Mapa</p>
            </div>
        </div>
    );
}