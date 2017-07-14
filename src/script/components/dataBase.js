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
    //obj.tasks = caption;
    debugger;
    if (obj.tasks[`${dateDay}`]) {
      var arr = obj.tasks[`${dateDay}`].title;
      arr.push(caption);
      console.log(arr);
      console.log(obj);
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
}
export default db;
