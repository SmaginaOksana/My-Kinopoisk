import "./userFormStyles.scss";
import { app } from "../../vars";
import { updateProfile } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import logOut from "./logOut";

export default function profilePage(auth) {
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    const wrapperForm = document.createElement("div");
    wrapperForm.classList.add("wrapperForm");
    const template = `
  <img class='photo' src="${photoURL}" alt="">
  <h1>Profile</h1>
  <h2>Здраствуйте, ${displayName}!</h2>
  <form name="updateProfile" class="updateProfile">
    <input type="text" placeholder="firstname" name="firstname" />
    <input type="text" placeholder="photoURL" name="url" />
    <button class="updateProfile">UpdateProfile</button>
  </form>
  <form name="newPassword" class="newPassword">
    <input type="text" placeholder="new password" name="newPassword" />
    <input
      type="text"
      placeholder="confirm new password"
      name="confirmNewPassword"
    /><button class="changePassword">Change password</button>
  </form>
  <button class="deleteUser">Delete user</button>
  <button class="close">Close profile settings</button>
  <button class="logOutBtn" name="logOutBtn">LOG OUT</button>
  <h2 class='error none'></h2>`;
    wrapperForm.innerHTML += template;
    app.append(wrapperForm);
    const photo = document.querySelector("img");
    const formUpdate = document.forms.updateProfile;
    const { firstname, url } = formUpdate.elements;
    const formPassword = document.forms.newPassword;
    const { newPassword, confirmNewPassword } = formPassword.elements;
    const errorPhrase = document.querySelector(".error");
    const deletePage = document.querySelector(".deleteUser");
    const closeProfilePage = document.querySelector(".close");
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.style.background =
      "linear-gradient(273.4deg, #75edfd 4.28%, #ff0066 93.81%)";

    formUpdate.addEventListener("submit", (event) => {
      event.preventDefault();
      if (firstname.value === "" || url.value === "") {
        errorPhrase.classList.remove("none");
        errorPhrase.textContent = `Заполните все поля`;
        return;
      }
      updateProfile(auth.currentUser, {
        displayName: firstname.value,
        photoURL: url.value,
      })
        .then(() => {
          window.location.pathname = "/userProfile";
          photo.classList.remove("none");
          photo.src = url.value;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => formUpdate.reset());
    });

    formPassword.addEventListener("submit", (event) => {
      event.preventDefault();
      if (newPassword.value === "" || confirmNewPassword.value === "") {
        errorPhrase.classList.remove("none");
        errorPhrase.textContent = `Заполните все поля`;
        return;
      } else if (newPassword.value !== confirmNewPassword.value) {
        errorPhrase.classList.remove("none");
        errorPhrase.textContent = `Пароли не совпадают`;
        return;
      } else if (newPassword.value.length < 7) {
        errorPhrase.classList.remove("none");
        errorPhrase.textContent = `Пароль должен быть не менее 7 символов`;
        return;
      }

      const newPasswordUser = newPassword.value;

      updatePassword(user, newPasswordUser)
        .then(() => {
          window.location.pathname = "/authPage";
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => formPassword.reset());
    });

    deletePage.addEventListener("click", () => {
      deleteUser(user)
        .then(() => {
          window.location.pathname = "/registrPage";
          throw new Error("Удалить пользователя не удалось. Повторите попытку");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    closeProfilePage.addEventListener("click", () => {
      window.location.pathname = "/";
    });

    logOutBtn.addEventListener("click", () => {
      logOut(auth);
    });
  }
}
