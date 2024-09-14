import "./userFormStyles.scss";
import { main } from "../../vars";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function authPage(auth) {
  const wrapperForm = document.createElement("div");
  wrapperForm.classList.add("wrapperForm");
  const templateAuth = `<form name="authForm" class="authForm">
  <img src="./images/userAdd.png" alt="userAdd" class='userAdd' />
  <h1>Log in to get started</h1>
  <input type="text" name="email" placeholder="Email" /><input
    type="text"
    name="password"
    placeholder="Password"/><button class='logInButton'>Log in</button></form>
    <h2>Not an user yet? <a href="/registrPage" class='signUp'>Sign up here</a></h2>
    <h2 class='error none'></h2>`;
  wrapperForm.innerHTML += templateAuth;
  main.append(wrapperForm);

  const authForm = document.forms.authForm;
  const { email, password } = authForm.elements;
  const errorPhrase = document.querySelector(".error");

  authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (email.value === "" || password.value === "") {
      errorPhrase.classList.remove("none");
      errorPhrase.textContent = `Заполните все поля`;
      return;
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log(error);
        errorPhrase.classList.remove("none");
        errorPhrase.textContent = `Неверный логин или пароль`;
      });
  });
}
