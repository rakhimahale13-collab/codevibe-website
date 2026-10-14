const registrationForm = document.querySelector("#registration-form");
const registrationStatus = document.querySelector("#registration-status");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registrationStatus.textContent = "Preview complete. This demo does not send or store your details.";
});
