import Map from "../Map/Map";
import Card from "../Card/Card";
import Articles from "../Articles/Articles";
import InfoSection from "../InfoSection/InfoSection";
import "./Main.css";
import { useState } from "react";

export default function Main() {
  const [cards, setCards] = useState([]);

  return (
    <main className="main__container">
      <h2 className="main__text">Encontre os melhores pontos de recarga próximos a você!</h2>
      <div className="main__cards">
        {cards.map(c => (
          <Card key={c.id} {...c} />
        ))}
      </div>

      {/* Passa função para Map atualizar os cards */}
      <Map setCardsForUI={setCards} />

      <Articles />
      <InfoSection />
    </main>
  );
}