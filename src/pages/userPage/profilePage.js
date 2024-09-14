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
    const photoURL = user.photoURL;
    const wrapperForm = document.createElement("div");
    wrapperForm.classList.add("wrapperForm");
    const template = `
  <img class='photo' src="${
    !photoURL ? "../../../images/user.png" : photoURL
  }" alt="">
  <h1>Profile</h1>
  <h2>Здраствуйте, ${!displayName ? "Пользователь" : displayName}!</h2>
  <h2>Вы можете внести свои данные в профиль...</h2>
  <form name="updateProfile" class="updateProfile">
    <input type="text" placeholder="firstname" name="firstname" />
    <input type="text" placeholder="photoURL" name="url" />
    <button class="updateProfile">UpdateProfile</button>
  </form>
  <h2>Вы можете изменить пароль...</h2>
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
    logOutBtn.style.background = "rgb(1, 148, 80)";

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
          photo.classList.remove("none");
          photo.src = url.value;
          window.location.pathname = "/userProfile";
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
