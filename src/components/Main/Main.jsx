import Map from "../Map/Map";
import "./Main.css";
export default function Main(){
    return(
        <main className="main__container page">
            <h2 className="main__text">Encontre os melhores pontos de recarga para veículos elétricos perto de você!</h2>
            <Map></Map>
            <p className="main__description">
                
            </p>
        </main>
    )
}