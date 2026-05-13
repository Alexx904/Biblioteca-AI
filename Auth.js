const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popup = document.getElementById('popup');

const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

openPopupBtn.addEventListener('click', () => {
    popup.classList.remove('hidden');
});

closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

loginTab.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
});

// serve per evitare che la pagina si ricarichi quando clicco "Accedi" o "Crea account"
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Tentativo di login in corso...');
    // codice database
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Tentativo di registrazione in corso...');
    // codice database
});