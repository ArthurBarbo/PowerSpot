import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
export default function Header({ openLogin, onHomeClick, user }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="header__container">

            <img src="/powerspot__logo.svg"
                alt="PowerSpot Logo"
                className="header__logo"
            />
            <div
                className="header__hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <img className="header__list" src={menuOpen ? "/list_up.svg" : "/list.svg"} alt="Logo para abrir o menu" />
            </div>
            <nav className={`header__menuContainer ${menuOpen ? "open" : ""}`}>
                <Link className="header__link" to="/">
                    <h2 className="header__text header__menu"
                        onClick={() => {
                            onHomeClick?.();
                            setMenuOpen(false);
                        }}>Início</h2>
                </Link>

                <Link className="header__link" to="/contacts">
                    <h2 className="header__text header__menu">Contato</h2>
                </Link>


                <Link className="header__link" to="/about">
                    <h2 className="header__text header__menu">Sobre Nós</h2>
                </Link>


                {user ? (
                    <h2 className="header__text header__menu header__user">
                        <div className="header__info">
                            <span className="header__hello">Olá,</span>
                            <span className="header__bold">{user.name}</span>
                        </div>
                    </h2>
                ) : (
                    <h2 className="header__text header__menu" onClick={openLogin}>
                        Acesse suas preferências
                    </h2>
                )}
            </nav>
        </header >
    );
}