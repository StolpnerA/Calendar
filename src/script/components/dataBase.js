class db {
  constructor() {
    this.firebase = window.firebase;
  }

  addUser(task, login, pass) {
    //метод добавления пользователя в систему и создание примитивного структуры хранения данных
    if (!task || !login || !pass) return;
    var obj = {
      password: pass,
      tasks: task
    };
    var users = this.firebase.database().ref("auth/");

    users.push({
       login,
       password: pass,
     });
    // localStorage.setItem(`${login}`, JSON.stringify(obj)); // сохранение пользователя в системе
  }
  getAll(login) {
    var ls = JSON.parse(localStorage.getItem(`${login}`)); // превращение нашего текста с объектом в нормальный объект
    return ls;
  }
  SaveEventInDB(taskTitle, taskDescription, dateDay) {
    // сохранение Заголовка в системе + создание системы хранения для текства и коментраиев и готова задача или нет
    var obj = this.getAll(sessionStorage.getItem("user"));
    obj.tasks[`${dateDay}`] = obj.tasks[`${dateDay}`] || {
      title: [],
      text: [],
      done: []
    };
    var arrTitle = obj.tasks[`${dateDay}`].title;
    arrTitle.push(taskTitle);
    var arrDescription = obj.tasks[`${dateDay}`].text;
    arrDescription.push(taskDescription);
    var arrDone = obj.tasks[`${dateDay}`].done;
    arrDone.push(false);

    var events = this.firebase.database().ref("events/");

    window.console.log(obj);

    events.push(
       ...obj
     );
    localStorage.setItem(
      `${sessionStorage.getItem("user")}`,
      JSON.stringify(obj)
    );
  }
    deleteEventInDB(dateDay, text) {
      if (dateDay == "") return;
    //удаление пока только заголовка
    if (dateDay == '') return;
    var obj = this.getAll(sessionStorage.getItem("user"));
    var index = obj.tasks[`${dateDay}`].title.indexOf(text);
    obj.tasks[`${dateDay}`].title.splice(index, 1);
    obj.tasks[`${dateDay}`].text.splice(index, 1);
    obj.tasks[`${dateDay}`].done.splice(index, 1);
    localStorage.setItem(
      `${sessionStorage.getItem("user")}`,
      JSON.stringify(obj)
    );
  }
  loadFromDB() {
    // загрузки пока нету тут только пока базавая прогрузка объека
    let obj = this.getAll(sessionStorage.getItem("user"));
    let cal = document.querySelector("table");
    if (Object.keys(obj).length === 0) return;
    for (let dateLoad in obj.tasks) {
      let loadData = obj.tasks[`${dateLoad}`].title;
      let res = cal.querySelector(`.${dateLoad}`);
      if (res != null) {
        if (loadData.length - 1 == 0) {
          res.innerHTML += `<div id="events">${loadData}<button class="cross">[x]</button></div>`;
        } else {
          for (var i = 0; i < loadData.length; i++) {
            var dbArr = loadData;
            res.innerHTML += `<div id="events">${dbArr[
              i
            ]}<button class="cross">[x]</button></div>`;
          }
        }
      }
    }
  }
}
export default db;
