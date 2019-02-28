const toggle = document.querySelector(".toggle");
const navMobile = document.querySelector(".nav__mobile");

toggle.addEventListener("click", e => {
  e.preventDefault();
  navMobile.classList.toggle("active");
});
