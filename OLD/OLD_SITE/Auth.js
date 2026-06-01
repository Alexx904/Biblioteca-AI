const openPopupBtn = document.getElementById("openPopup");
const closePopupBtn = document.getElementById("closePopup");
const popup = document.getElementById("popup");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const userProfile = document.getElementById("profilo__Utente");
const userNameDisplay = document.getElementById("user__name");
const userInfoToggle = document.getElementById("user__info__toggle");
const logoutTendina = document.getElementById("logout__tendina");
const logoutButton = document.getElementById("logoutBtn");

openPopupBtn.addEventListener("click", () => {
    popup.classList.remove("hidden"); /* classList è un array che contiene le classi di css */
});

closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

loginTab.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
});

registerTab.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
});

// serve per evitare che la pagina si ricarichi quando clicco "Accedi" o "Crea account"
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Tentativo di login in corso...");
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Tentativo di registrazione in corso...");
});

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datiUtente = {
        nome: document.getElementById("regNome").value,
        matricola: document.getElementById("regMatricola").value,
        facolta: document.getElementById("regFacolta").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value
        };

    try{
        const response = await fetch("http://localhost:3000/api/registrazione", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datiUtente)
        });

        if(response.status === 200){
            alert("Registrazione avvenuta con successo!");
            registerForm.reset(); //svuota i campi

            document.getElementById("popup").classList.add("hidden");
        }
    }catch(error){
        console.log("Errore di connessione al server", error);
        alert("Impossibile collegarsi al server")
    }
});

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const credenziali={
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    try{
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credenziali)
        });

        const risultato = await response.json();

        if(response.status === 200){
            alert("Login avvenuto");
            loginForm.reset();
            document.getElementById("popup").classList.add("hidden");
            openPopupBtn.classList.add("hidden");

            userProfile.classList.remove("hidden");
            userNameDisplay.textContent= risultato.utente.nome;
        }else{
            alert("Errore di Login " + risultato.messaggio);
        }
    } catch(error){
        console.log("Errore di connessione al server", error);
        alert("Impossibile collegarsi al server");
    }
});

userInfoToggle.addEventListener("click", (e) => {
    logoutTendina.classList.toggle("hidden");
})

logoutButton.addEventListener("click", (e) => {
    userProfile.classList.add("hidden");
    logoutTendina.classList.add("hidden");

    openPopupBtn.classList.remove("hidden");

    userNameDisplay.textContent= "Nome";
    alert("Logout avvenuto");
});