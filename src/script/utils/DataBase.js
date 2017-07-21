class DataBase {
  constructor() {
    this.firebase = window.firebase;
  }

  addUser(login, pass) {

    //метод добавления пользователя в систему и создание примитивного структуры хранения данных
    if (!login || !pass) return;
    const users = this.firebase.database().ref("auth/");

    users.push({
      login,
      password: pass,
    });
    // localStorage.setItem(`${login}`, JSON.stringify(obj)); // сохранение пользователя в системе
  }
  getAll(login) {
    // var ls = JSON.parse(localStorage.getItem(`${login}`)); // превращение нашего текста с объектом в нормальный объект
    // return ls;
  }
  SaveEventInDB(taskTitle, taskDescription, dateDay) {
    // сохранение Заголовка в системе + создание системы хранения для текства и коментраиев и готова задача или нет

    const tasks = this.firebase.database().ref('tasks/');

    tasks.push({
      title: taskTitle,
      text: taskDescription,
      done: false,
      date: dateDay
    });
  }

  deleteEventInDB(id) {
    console.log(id);

	this.firebase.database().ref(`tasks/${id}`).remove();

    // if (dateDay == "") return;
    // //удаление пока только заголовка
    // if (dateDay == '') return;
    // var obj = this.getAll(sessionStorage.getItem("user"));
    // var index = obj.tasks[`${dateDay}`].title.indexOf(text);
    // obj.tasks[`${dateDay}`].title.splice(index, 1);
    // obj.tasks[`${dateDay}`].text.splice(index, 1);
    // obj.tasks[`${dateDay}`].done.splice(index, 1);
    // localStorage.setItem(
    //   `${sessionStorage.getItem("user")}`,
    //   JSON.stringify(obj)
    // );
  }
  loadFromDB() {
    // загрузки пока нету тут только пока базавая прогрузка объека

    return new Promise((resolve) => {
      let cal = document.querySelector("table");

      const tasks = this.firebase.database().ref('tasks/');

      tasks.on("value", function(snapshot) {
        //  console.log(snapshot.val() );

        resolve(snapshot.val());


         // удаление предыдущих
         const tasksDom = document.querySelectorAll('#events');
         tasksDom.forEach(item => {
           item.remove();
         });

         // тут оставшийся код от страницы календаря

         for (let taskKey in snapshot.val()) {

           let task = snapshot.val()[taskKey];

           if (!cal) {
             return;
           }

           let res = cal.querySelector(`.${task.date}`);
           if (res != null) {
               res.innerHTML += `<div id="events" data-id=${taskKey}>${task.title}<button class="cross">[x]</button></div>`;


           }
         }
      }, function (error) {
         console.log("Error: " + error.code) ;

      });

    })
  }

}

export default DataBase;
