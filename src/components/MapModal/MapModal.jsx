import "./MapModal.css";

export default function MapModal(){


    return(
        <div className="mapmodal__container">
            <h2>Mapa de Pontos de Recarga</h2>
            <div className="mapmodal__map">
                <img src="Teste.jpg" alt="Mapa de Pontos de Recarga" className="mapmodal__api" />
            </div>
        </div>
    );
}