function Hero(){

    return(
        <>
            <section className="hero">
                <h1 className="hero__title">Biblioteca</h1>
                <p className="hero__text">Prenota libri, riserva postazioni di studio. La tua biblioteca è sempre con te.</p>
                <img className="hero__image" src="img/hero.jpg" alt="hero"/>
                <ul className="hero__link">
                    <li><a href="#catalogo">Esplora il catalogo</a></li>
                    <li><a href="#postazioni">Prenota postazione</a></li>
                </ul>

                <div className="hero__info">
                    <p className="hero__info__text"><span className="hero__info__number">12000+</span><br />Volumi in catalogo</p>
                    <p className="hero__info__text"><span className="hero__info__number">36</span><br />Postazioni Studio</p>
                    <p className="hero__info__text"><span className="hero__info__number">8:00-22:00</span><br />Orari di Apertura</p>
                    <p className="hero__info__text"><span className="hero__info__number">3</span><br />Aule disponibili</p>
                </div>
            </section>
        </>
    );
}

export default Hero;