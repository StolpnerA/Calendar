import db from "./dataBase";
class signIn {
  constructor() {
    this.db = new db();
  }
  trySigninByLoginAndPass(login, password) {
    return new Promise((resolve, reject) => {
      let user = this.db.getAll(login);
      if (
        user != null &&
        user.password == password &&
        login != "" &&
        password != ""
      ) {
        sessionStorage.setItem("user", `${login}`);
        return resolve();
      }
      reject();
    });
  }

  tryRegisterWithLoginAndEmail(login, password) {
    return new Promise((resolve, reject) => {
      let user = this.db.getAll(login);
      if (!user) {
        this.db.addUser({}, login, password);
        sessionStorage.setItem("user", `${login}`);
        return resolve();
      } else {
        return reject();
      }
    });
  }
}
export default signIn;
