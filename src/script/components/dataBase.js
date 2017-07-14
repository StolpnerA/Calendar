class db {
  addUser(task, login, pass) {
    if (!task || !login || !pass) return;
    let ls = this.getAll();
    ls[`${login}`] = {
      password: pass,
      tasks: task
    };
    localStorage.setItem("users", JSON.stringify(ls));
  }
  getAll() {
    var ls = JSON.parse(localStorage.getItem("users")) || {};
    return ls;
  }
}
export default db;
