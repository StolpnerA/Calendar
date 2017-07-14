import db from "./dataBase";
var userOnline = "";
class signIn {
  constructor() {
    this.db = new db();
  }
  trySigninByLoginAndPass(login, password) {
    return new Promise((resolve, reject) => {
      let users = this.db.getAll();
      for (var name in users) {
        let user = users[name] || {};
        if (
          name == login &&
          user.password == password &&
          login != "" &&
          password != ""
        ) {
          userOnline = login;
          localStorage.setItem("user", login);
          return resolve();
        }
      }
      reject();
    });
  }
  tryRegisterWithLoginAndEmail(login, password) {
    return new Promise((resolve, reject) => {
      let users = this.db.getAll();
      if (!users) {
        userOnline = login;
        this.db.addUser({}, login, password);
        localStorage.setItem("user", login);
        return resolve();
      } else {
        for (var name in users) {
          if (name == login || login == "") {
            return reject();
          }
        }
        userOnline = login;
        this.db.addUser({}, login, password);
        localStorage.setItem("user", login);
        resolve();
      }
    });
  }
}
export { signIn, userOnline };
