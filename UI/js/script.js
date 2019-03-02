const toggle = document.querySelector(".toggle");
const sideMenu = document.querySelector("ul");

const replyButton = document.querySelector('#replyButton');
const replyForm = document.querySelector(".reply");
const replySubmitBtn = document.querySelector('.reply .btn__small');

replyButton.addEventListener('click', e => {
  e.preventDefault();
  replyForm.classList.toggle('active');
});

replySubmitBtn.addEventListener('click', e => {
  e.preventDefault();
  replyForm.classList.remove('active');
})

toggle.addEventListener("click", e => {
  e.preventDefault();
  sideMenu.classList.toggle("open");
});
