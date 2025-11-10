import { useContext, useEffect, useState } from "react";
import "./Header.css";
export default function Header(){
return(
    <header className="header__container"
    >
        <img src="../../public/powerspot__logo.png"
        alt="PowerSpot Logo"
        className="header__logo"
        />
        <h2 className="header__text header__menu">Contatos</h2>
        <h2 className="header__text header__menu">Sobre Nós</h2>
        <h2 className="header__text header__menu">Acesse suas preferências</h2>
    </header>
)
}