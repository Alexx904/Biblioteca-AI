import { useState } from "react"; //strumeto per far ricordare react
import Hamburger from "./Hamburger";
import NavLink from "./NavLink"
import { Stack } from "@mui/material";

function NavBar(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const clickHamburger = () =>{
        setIsMenuOpen(!isMenuOpen);
    }

    return(
        <Stack direction="row" alignItems="center" spacing={2}>
            <NavLink name="Catalogo" link="#catalogo"/>
            <NavLink name="Postazioni" link="#postazioni"/>
            <NavLink name="Chat" link="#chat"/>
        </Stack>
    )

/*    return(
        <>
            <nav className={`header__nav ${isMenuOpen ? "open" : ""}`} id="headerNav">
                <ul className="header__nav-list">
                    <NavLink name="Catalogo" link="#catalogo"/>
                    <NavLink name="Postazioni" link="#postazioni"/>
                    <NavLink name="Chat" link="#chat"/>
                    <li><button className="buttonNav" id="openPopup">Login / Signup</button></li>
                </ul>
            </nav>

            <Hamburger gestioneClick={clickHamburger}/>
        </>
    );
}
*/
}
export default NavBar;