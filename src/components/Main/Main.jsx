import Map from "../Map/Map";
import Card from "../Card/Card";
import Articles from "../Articles/Articles";
import InfoSection from "../InfoSection/InfoSection";
import "./Main.css";
import { useState, useRef } from "react";

export default function Main() {
  const [cards, setCards] = useState([]);
  
  const mapRef= useRef(null);

  const handleShowOnMap = (id) => {
    const mapElement = document.querySelector(".map__container");
  
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" });
    }

   
    window.dispatchEvent(new CustomEvent("showOnMap", { detail: id }));
  };

  return (
    <main className="main__container">
      <h2 className="main__text">Encontre os melhores pontos de recarga próximos a você!</h2>
      <div className="main__cards">
        {cards.map((c) => (
          <Card key={c.id} {...c}
          onShowOnMap={handleShowOnMap} />
        ))}
      </div>

      
      <Map setCardsForUI={setCards} />

      <Articles />
      <InfoSection />
    </main>
  );
}