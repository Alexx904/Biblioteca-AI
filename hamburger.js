const hamburgerBtn = document.getElementById("hamburgerBtn");
const headerNav = document.getElementById("headerNav");

hamburgerBtn.addEventListener("click", () => {
    headerNav.classList.toggle("open");
});