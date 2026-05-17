import { useState } from "react"; //strumeto per far ricordare react
import Hamburger from "./Hamburger";

function NavBar(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clickHamburger = () =>{
        setIsMenuOpen(!isMenuOpen);
    }

    return(
        <>
            <nav className={`header__nav ${isMenuOpen ? "open" : ""}`} id="headerNav">
                <ul className="header__nav-list">
                    <li><a href="index.html#catalogo">Catalogo</a></li>
                    <li><a href="#postazioni">Postazioni</a></li>
                    <li><a href="#chat">Chat</a></li>
                    <li><button className="buttonNav" id="openPopup">Login / Signup</button></li>
                </ul>
            </nav>

            <Hamburger gestioneClick={clickHamburger}/>
        </>
    );
}

export default NavBar;