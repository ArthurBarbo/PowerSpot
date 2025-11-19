import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
export default function Header({openLogin}) {

    const location = useLocation();
    const showSobreNos = location.pathname ==="/";

return(
    <header className="header__container">  

        <img src="/powerspot__logo.svg"
        alt="PowerSpot Logo"
        className="header__logo"
        />
    
        <Link className="header__link" to="/">
        <h2 className="header__text header__menu">Início</h2>
        </Link>

        <Link className="header__link" to="/contacts">
        <h2 className="header__text header__menu">Contato</h2>
        </Link>
        {showSobreNos &&(
        <h2 className="header__text header__menu"
    onClick={() => {
    const section = document.getElementById("sobre-nos");
    section?.scrollIntoView({ behavior: "smooth" });
  }}>
    Sobre Nós
    </h2>
        )}
        <h2 className="header__text header__menu" onClick={openLogin}>Acesse suas preferências</h2>
    </header>
)
}