import NavBar from "./NavBar";

function Header(){
    return(
        <header className="header">
            <div className="header__container">
                <a className="header__logo" href="index.html">
                <img className="logo" src="img/logo.png" alt="logo" width="100px" height="70px"/>
                <span>Biblioteca</span>
                </a>
                <NavBar/>
            </div>
        </header>
    );
}

export default Header;