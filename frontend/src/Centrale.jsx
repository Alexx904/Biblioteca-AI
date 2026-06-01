import Catalogo from "./Catalogo";
import Postazioni from "./Postazioni";
import Chat from "./Chat";
import Informazioni from "./Informazioni";

function Centrale(){
    return (
        <>
            <main className="main">
                <Catalogo/>
                <Postazioni/>
                <Chat/>
                <Informazioni/>
            </main>
        </>
    );
}

export default Centrale;