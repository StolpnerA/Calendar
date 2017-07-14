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
  SaveEventInDB(caption, dateDay) {
    var obj = this.getAll(window.userOnline);
    if (obj.tasks[`${dateDay}`]) {
      var arr = obj.tasks[`${dateDay}`].title;
      arr.push(caption);
    } else {
      obj.tasks[`${dateDay}`] = {
        title: [],
        text: [],
        comments: []
      };
      var arr = obj.tasks[`${dateDay}`].title;
      arr.push(caption);
    }
    localStorage.setItem(`${window.userOnline}`, JSON.stringify(obj));
  }
  deleteEventInDB(dateDay, text) {
    var obj = this.getAll(window.userOnline);
    var index = obj.tasks[`${dateDay}`].title.indexOf(text);
    obj.tasks[`${dateDay}`].title.splice(index, 1);
    localStorage.setItem(`${window.userOnline}`, JSON.stringify(obj));
  }
  loadFromDB() {
    var obj = this.getAll(window.userOnline);
  }
}
export default db;
