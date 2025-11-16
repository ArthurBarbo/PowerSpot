import { useContext, useEffect, useState } from "react";
import "./Header.css";
export default function Header({openLogin}) {
return(
    <header className="header__container"
    >
        <img src="/powerspot__logo.png"
        alt="PowerSpot Logo"
        className="header__logo"
        />
        <h2 className="header__text header__menu">Contato</h2>
        
        <h2 className="header__text header__menu"
    onClick={() => {
    const section = document.getElementById("sobre-nos");
    section?.scrollIntoView({ behavior: "smooth" });
  }}>Sobre Nós</h2>

        <h2 className="header__text header__menu" onClick={openLogin}>Acesse suas preferências</h2>
    </header>
)
}