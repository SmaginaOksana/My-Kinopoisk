import "./userFormStyles.scss";
import { main } from "../../vars";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function registrPage(auth) {
  const wrapperForm = document.createElement("div");
  wrapperForm.classList.add("wrapperForm");
  const templateRegistr = `<form name="registrForm" class="registrForm">
  <img src="./images/userAdd.png" alt="userAdd" class='userAdd' /><h1>Sign up to get started</h1>
  <h2>Create your Origami account!</h2>
  <input type="text" name="firstname" placeholder="Firstname" />
  <input type="text" name="surname" placeholder="Surname" />
  <input type="text" name="email" placeholder="Email" />
  <input type="text" name="password" placeholder="Password" />
  <input type="text" name="confirmPassword" placeholder="Confirm password" />
<button class='signUpButton'><img src="./images/userAdd.png" alt="userAdd" />Sign up</button></form>
<h2>Already an user? <a href="/authPage" class='logIn'>Log in!</a></h2>
<h2>By creating an account you agree with Privacy Policy.</h2><h2 class='error none'></h2>`;
  wrapperForm.innerHTML += templateRegistr;
  main.append(wrapperForm);

  const registrForm = document.forms.registrForm;
  const { firstname, surname, email, password, confirmPassword } =
    registrForm.elements;
  const errorPhrase = document.querySelector(".error");

  registrForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      firstname.value === "" ||
      surname.value === "" ||
      email.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      errorPhrase.classList.remove("none");
      errorPhrase.textContent = `Заполните все поля`;
      return;
    } else if (password.value !== confirmPassword.value) {
      errorPhrase.classList.remove("none");
      errorPhrase.textContent = `Пароли не совпадают`;
      return;
    } else if (password.value.length < 7) {
      errorPhrase.classList.remove("none");
      errorPhrase.textContent = `Пароль должен быть не менее 7 символов`;
      return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log(error);
        errorPhrase.classList.remove("none");
        errorPhrase.innerHTML = `Пользователь с такими данными уже существует`;
      });
  });
}
