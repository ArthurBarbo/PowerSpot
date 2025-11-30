import Map from "../Map/Map";
import Card from "../Card/Card";
import Articles from "../Articles/Articles";
import "./Main.css";
import { useState, useEffect, useRef } from "react";
// import { getFavoriteCards } from "../Api/cards"; // sua função pra buscar favoritos

export default function Main({ reloadTrigger, user }) {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all" | "fav"
  const mapRef = useRef(null);

  // Buscar favoritos só se o usuário estiver logado
  // useEffect(() => {
  //   // if (user) {
  //   //   const token = localStorage.getItem("token");
  //   //   getFavoriteCards(token).then((favCards) => setFavorites(favCards));
  //   // } else {
  //   setFavorites([]); // limpar caso deslogue
  // }
  // }, [user]);

  const handleShowOnMap = (id) => {
    const mapElement = document.querySelector(".map__container");
    if (mapElement) mapElement.scrollIntoView({ behavior: "smooth" });

    window.dispatchEvent(new CustomEvent("showOnMap", { detail: id }));
  };

  const handleToggleFavorite = (card) => {
    if (!user) return; // segurança extra
    setFavorites((prev) =>
      prev.some((f) => f.id === card.id)
        ? prev.filter((f) => f.id !== card.id)
        : [...prev, card]
    );
  };

  const cardsToRender = viewMode === "fav" ? favorites : cards;

  return (
    <main className="main__container">
      <h2 className="main__text">
        {user ? (
          <>
            <span className="main__user-name">{user.name}</span>, aqui estão os pontos de recarga mais próximos!
          </>
        ) : (
          "Encontre os melhores pontos de recarga próximos a você!"
        )}
      </h2>

      <div className="main__filters">
        <button
          className={`main__filter-btn ${viewMode === "all" ? "active" : ""}`}
          onClick={() => setViewMode("all")}
        >
          Todos
        </button>

        {/* Só exibe se estiver logado e tiver favoritos */}
        {user && favorites.length > 0 && (
          <button
            className={`main__filter-btn ${viewMode === "fav" ? "active" : ""} ${favorites.length > 0 ? "main__filter-btn--appeared" : ""}`}
            onClick={() => setViewMode("fav")}
          >
            Meus carregadores
          </button>
        )}
      </div>

      <div className={`main__cards ${viewMode === "fav" ? "main__cards--fav" : ""}`}>
        {cardsToRender.map((c) => (
          <Card
            key={c.id}
            {...c}
            user={user} // passa user para o card controlar botão de salvar
            onShowOnMap={() => handleShowOnMap(c.id)}
            onToggleFavorite={() => handleToggleFavorite(c)}
            isFavorite={favorites.some((f) => f.id === c.id)}
          />
        ))}
      </div>

      <Map setCardsForUI={setCards} reloadTrigger={reloadTrigger} />
      <Articles />
    </main>
  );
}