class db {
  addUser(task, login, pass) {
    //метод добавления пользователя в систему и создание примитивного структуры хранения данных
    if (!task || !login || !pass) return;
    var obj = {
      password: pass,
      tasks: task
    };
    localStorage.setItem(`${login}`, JSON.stringify(obj)); // сохранение пользователя в системе
  }
  getAll(login) {
    var ls = JSON.parse(localStorage.getItem(`${login}`)); // превращение нашего текста с объектом в нормальный объект
    return ls;
  }
  SaveEventInDB(caption, dateDay) {
    // сохранение Заголовка в системе + создание системы хранения для текства и коментраиев и готова задача или нет
    var obj = this.getAll(window.userOnline);
    if (obj.tasks[`${dateDay}`]) {
      var arr = obj.tasks[`${dateDay}`].title;
      arr.push(caption);
    } else {
      obj.tasks[`${dateDay}`] = {
        title: [],
        text: [],
        done: [],
        comments: []
      };
      var arr = obj.tasks[`${dateDay}`].title;
      arr.push(caption);
    }
    localStorage.setItem(`${window.userOnline}`, JSON.stringify(obj));
  }
  deleteEventInDB(dateDay, text) {
    //удаление пока только заголовка
    var obj = this.getAll(window.userOnline);
    var index = obj.tasks[`${dateDay}`].title.indexOf(text);
    obj.tasks[`${dateDay}`].title.splice(index, 1);
    localStorage.setItem(`${window.userOnline}`, JSON.stringify(obj));
  }
  loadFromDB() {
    // загрузки пока нету тут только пока базавая прогрузка объека
    var obj = this.getAll(window.userOnline);
  }
}
export default db;
