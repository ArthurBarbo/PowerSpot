import "./Card.css";
import EletricStation1 from "/charging-station-1.svg";
import EletricStation2 from "/charging-station-2.svg";
import EletricStation3 from "/charging-station-3.svg";
import EletricStation4 from "/charging-station-4.svg";
import EletricStation5 from "/charging-station-5.svg";
import EletricStation6 from "/charging-station-6.svg";

const images = [EletricStation1, EletricStation2, EletricStation3, EletricStation4, EletricStation5, EletricStation6];


export default function Card({ title, description }) {
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <div className="card">
            <img src={randomImage} alt={title} className="card__image" />
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <p className="card__description">{description}</p>
                <p className="card__touched">Mostrar no Mapa</p>
            </div>
        </div>
    );
}   