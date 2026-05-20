function Postazioni(){
    return(
        <>
            <section className="main__postazioni" id="postazioni">
                <h1 className="main__postazioni__title">Postazioni di Studio</h1>
                <p className="main__postazioni__subtitle">Seleziona aula, data e orario — poi clicca sulla postazione</p>
                <div className="prenotazione__postazione">
                    <label htmlFor="date__postazione">Seleziona Data: </label><br /><span><input type="date" id="date__postazione" className="prenotazione__postazione__date" required/></span>
                    <label htmlFor="ora__postazione">Ora di inizio</label><br /><span><input type="time" id="ora__postazione" className="prenotazione__postazione__ora" min="08:00" max="21:30" required/></span>
                </div>

                <div className="prenotazione__aula">
                    <div className="aula__button">
                        <input type="radio" value ="aulaA" id="aulaA" name="aule" defaultChecked/> <label htmlFor="aulaA">Aula A</label>
                        <input type="radio" value ="aulaB" id="aulaB" name="aule"/> <label htmlFor="aulaB">Aula B</label>            
                    </div>
                </div>

                <div className="info__prenotazione__aula">
                    <p className="postazioni_libere">(js) Libere</p> {/*<!-- da inserire con javascript numero dinamico di postazioni libere in base all'aula--> */}
                    <p className="postazioni_occupate">(js) Occupate</p> 
                    <p className="postazioni_totali">(js) Totali</p>
                </div>

        {/*<!-- inserire cartina con posti da prenotare con js-->*/}
            </section>
        </>
    );
}

export default Postazioni;