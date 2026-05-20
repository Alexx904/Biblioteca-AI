import { use, useEffect, useState } from "react"

function Auth(){

    useEffect(() => {
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

        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Tentativo di registrazione in corso...");

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
            console.log("Tentativo di login in corso...");

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

        userInfoToggle.onclick = (e) => {
            e.stopPropagation();
            logoutTendina.classList.toggle("hidden");
        };

        window.onclick = (e) => {
            if (!logoutTendina.classList.contains("hidden")) {
                logoutTendina.classList.add("hidden");
            }
        };

        logoutButton.onclick = (e) => {
            userProfile.classList.add("hidden");
            logoutTendina.classList.add("hidden");

            openPopupBtn.classList.remove("hidden");

            userNameDisplay.textContent= "Nome";
            alert("Logout avvenuto");
        };
    }, []); //[] servono per eseguire una sola volta il codice

    
    return(
        <>
            <div id="profilo__Utente" className="profilo__Utente hidden">
                <div className="user__info" id="user__info__toggle">
                    <span className="user__icon">👤</span>
                    <span id="user__name">Nome</span>
                </div>

                <div id="logout__tendina" className="logout__utente hidden">
                    <button id="logoutBtn">Logout</button>
                </div>
            </div>

            <div id="popup" className="popup hidden">
                <div className="popup-box">

                    <button id="closePopup" className="close">&times;</button>

                    <h2>Biblioteca</h2>

                    <div className="tabs">
                        <button id="loginTab" className="active">Accedi</button>
                        <button id="registerTab">Registrati</button>
                    </div>
                    
                    
                    <form id="loginForm">
                        <input type="email" id="loginEmail" placeholder="Email"/>
                        <input type="password" id="loginPassword" placeholder="Password"/>
                        <button type="submit">Accedi</button>
                    </form>

                    <form id="registerForm" className="hidden">
                        <input type="text" id="regNome" placeholder="Nome completo"/>
                        <input type="text" id="regMatricola" placeholder="Matricola"/>
                        <input type="text" id="regFacolta" placeholder="Facoltà"/>
                        <input type="email" id="regEmail" placeholder="Email"/>
                        <input type="password" id="regPassword" placeholder="Password"/>
                        <button type="submit">Crea account</button>
                    </form>

                </div>
            </div>
        </>
    );
}

export default Auth;