class db {
  addUser(task, login, pass) {
    if (!task || !login || !pass) return;
    var obj = {
      password: pass,
      tasks: task
    };
    localStorage.setItem(`${login}`, JSON.stringify(obj));
  }
  getAll(login) {
    var ls = JSON.parse(localStorage.getItem(`${login}`));
    return ls;
  }
}
export default db;
