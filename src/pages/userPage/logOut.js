import { signOut } from "firebase/auth";

export default function logOut(auth) {
  signOut(auth)
    .then(() => {
      window.location.pathname = "/authPage";
      throw new Error("Выход не удался. Повторите попытку");
    })
    .catch((error) => {
      console.log(error);
    });
}
