function Catalogo(){

    return(
        <>
            <section className="main__catalogo" id="catalogo">
                <h1 className="main__catalogo__title">Catalogo Libri</h1>
                <p className="main__catalogo__subtitle">Sfoglia l'intera collezione</p>
                <div className="catalogo__cerca">
                    <label className="catalogo__cerca__label" htmlFor="catalogo__cerca">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </label>

                    <input type="search" id="catalogo__cerca" className="catalogo__cerca__input" placeholder="Cerca titolo o autore..."/>

                    <input type="checkbox" id="disponibili" className="catalogo__cerca__checkbox" />
                    <label htmlFor="disponibili">Solo Disponibili</label>
                </div>

                <div className="catalogo__filtri">
                    <div className="catalogo__filtri__button">
                        <input type="radio" value ="tutti" id="tutti" name="filtri" defaultChecked/> <label htmlFor="tutti">Tutti</label>
                        <input type="radio" value ="informatica" id="informatica" name="filtri"/> <label htmlFor="informatica">Informatica</label>
                        <input type="radio" value = "storia" id="storia" name="filtri"/> <label htmlFor="storia">Storia</label>
                        <input type="radio" value ="italiano" id="italiano" name="filtri"/> <label htmlFor="italiano">Italiano</label>

                    </div>
                </div>
            
            {/*Bisogna inserire le cards dei libri (con l'uso di javascript) */}
            </section>
        </>
    );
}

export default Catalogo;