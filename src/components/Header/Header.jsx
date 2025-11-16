import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header({openLogin}) {
return(
    <header className="header__container">
        <Link className="header__link" to="/">

        <img src="/powerspot__logo.png"
        alt="PowerSpot Logo"
        className="header__logo"
        />
        </Link>

        <Link className="header__link" to="/">
        <h2 className="header__text header__menu">Início</h2>
        </Link>

        <Link className="header__link" to="/contacts">
        <h2 className="header__text header__menu">Contato</h2>
        </Link>
        <h2 className="header__text header__menu"
    onClick={() => {
    const section = document.getElementById("sobre-nos");
    section?.scrollIntoView({ behavior: "smooth" });
  }}>Sobre Nós</h2>

        <h2 className="header__text header__menu" onClick={openLogin}>Acesse suas preferências</h2>
    </header>
)
}