import "./Map.css";

export default function Map(){


    return(
        <div className="map__container">
            <h2 className="map__title">Mapa de Pontos de Recarga</h2>
            <div className="map__content">
                <img src="/Teste.jpg" alt="Mapa de Pontos de Recarga" className="map__api" />
                <button className="map__btn">
            <img src="/Charge.png" alt="Atualizar Carregadores" 
            className="map__icon"/>
            <span className="map__btn-text">Atualizar</span>
        </button>
            </div>
        </div>
    );
}