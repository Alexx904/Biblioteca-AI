function Informazioni(){
    return (
        <>
            <section className="informazioni">
                <h1 className="informazioni__title">Informazioni</h1>
                <div className="main__informazione">
                    <div className="info-card">
                        <h3>Indirizzo</h3>
                        <p>Via Giovanni Paolo II, 132<br/>Fisciano (SA) 84084</p>
                    </div>
                    <div className="info-card">
                        <h3>Orari</h3>
                        <p>Lun–Ven: 8:00–22:00<br/>Sab-Dom: chiuso</p>
                    </div>
                    <div className="info-card">
                        <h3>Contatti</h3>
                        <p>+39 089 96 2111<br/>biblioteca@unisa.it</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Informazioni;