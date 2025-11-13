import Map from "../Map/Map";
import Card from "../Card/Card";
import Articles from "../Articles/Articles";
import InfoSection from "../InfoSection/InfoSection";
import "./Main.css";

export default function Main(){

    // template para Api, informar Nome distancia e velocidade de carregamento
    const cards = [
        {id: 1, title: "Estação de Recarga Rápida", description: "Recarga seu veículo elétrico em tempo recorde com nossa estação de recarga rápida."},
        {id: 2, title: "Ponto de Recarga Solar", description: "Aproveite a energia limpa e sustentável com nosso ponto de recarga alimentado por energia solar."},
        {id: 3, title: "Recarga Inteligente", description: "Nossa estação de recarga inteligente otimiza o tempo e o consumo de energia para você."},
        {id: 4, title: "Estação de Recarga 24/7", description: "Recarga seu veículo a qualquer hora do dia ou da noite com nossa estação de recarga 24 horas."},
        {id: 5, title: "Recarga Rápida em Shopping", description: "Enquanto faz suas compras"}
    ];

    return(
        <main className="main__container">
            <h2 className="main__text">Encontre os melhores pontos de recarga próximos a você!</h2>
            <div className="main__cards">
            {cards.map((card)=>(
                <Card key={card.id} {...card}/>
            ))}
            </div>
            <Map />
            <p className="main__description"></p>
            <Articles />
            <InfoSection/>
        </main>
    )
}