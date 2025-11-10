import MapModal from "../MapModal/MapModal";
import "./Main.css";
export default function Main(){
    return(
        <main className="main__container">
            <h2 className="main__text">Encontre os melhores pontos de recarga para veículos elétricos perto de você!</h2>
            <MapModal></MapModal>
            <p className="main__description">
                
            </p>
        </main>
    )
}