import { useContext, useEffect, useState } from "react";
import {logo} from "../../../public/header_logo.png"


return(
    <header className="header__container"
    >
        <img src={logo}
        alt="PowerSpot Logo"
        className="header__logo"
        />
    </header>
)