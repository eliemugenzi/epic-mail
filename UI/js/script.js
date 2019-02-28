const toggle = document.querySelector(".toggle");
const sideMenu = document.querySelector("ul");
toggle.addEventListener("click", e => {
  e.preventDefault();
  sideMenu.classList.toggle("open");
});
