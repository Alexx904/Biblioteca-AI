
function Hamburger({gestioneClick}){

    return(
        <>
            <button className="hamburger" id="hamburgerBtn" onClick={gestioneClick}>
                    ☰
            </button>   
        </>
    );
}

export default Hamburger;