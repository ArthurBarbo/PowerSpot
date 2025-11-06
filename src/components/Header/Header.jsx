import { useContext, useEffect, useState } from "react";
import "Header.css";
export default function Header(){
return(
    <header className="header__container"
    >
        <h1 className="header__text">OLAAA</h1>
        <img src="./powerspot-logo.png"
        alt="PowerSpot Logo"
        className="header__logo"
        />
    </header>
)
}