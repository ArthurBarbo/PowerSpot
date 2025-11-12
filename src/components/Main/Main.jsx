import Map from "../Map/Map";
import "./Main.css";
export default function Main(){
    return(
        <main className="main__container">
            <h2 className="main__text">Encontre os melhores pontos de recarga próximos a você!</h2>
            <Map></Map>
            <p className="main__description">
                
            </p>
        </main>
    )
}