var UserOnline = "";
var BuildStartPage = function() {
  var div = document.querySelector(".render");
  var CreateDiv = `
            <div class="container">
            <div class="form-group">
                <label for="usr">Логин:</label>
                <input type="text" class="form-control" id="usr">
            </div>
            <div class="form-group">
                <label for="pwd">Пароль:</label>
                <input type="password" class="form-control" id="pwd">
            </div>
            <div  id="eror"></div>
                <button type="button" class="btn btn-large btn-success" id="butAut" >Вход</button>
                <a href="#Calendar">fsdf</a>
        </div>
        </div>`;
  div = div.innerHTML = CreateDiv; // отрисовка страницы
  document.querySelector("#butAut").addEventListener("click", () => {
    // добавление
    var log = usr.value;
    var password = pwd.value;
    var state = false;

    if (localStorage.getItem("calendar") == null) {
      // проверяем в первые ли на этой странице пользователь,если да , то добавлеяем в ls
      var obj = {};
      obj[`${log}`] = {
        login: usr.value,
        password: pwd.value,
        date: {}
      };
      let ls = JSON.stringify(obj);
      localStorage.setItem("calendar", ls);
    } else {
      // если пользователь здесь бывал раньше то ищем его логин
      var ls = JSON.parse(localStorage.getItem("calendar"));
      for (var name in ls) {
        if (name == log) {
          state = true;
        }
      }
    }
    if (state == true) {
      //авторизация
      // если логин найдем проверям логин и пароль
      for (var aut in ls[`${log}`]) {
        if (ls[`${log}`].login == log && ls[`${log}`].password == password) {
          // проверка логина и паролья
          eror.innerHTML = "";
          localStorage.setItem("User", `${log}`);
          UserOnline = log;
          location.hash = "Calendar";
        } else {
          eror.innerHTML = `<span style = "color: red">Ошибка:Неверный логин или пароль</span>`;
        }
      }
    } else {
      //регистрация
      // если логин не найден, то регистрируем пользователя
      var ls = JSON.parse(localStorage.getItem("calendar"));
      ls[`${log}`] = {
        login: usr.value,
        password: pwd.value,
        date: {}
      };
      localStorage.setItem("calendar", JSON.stringify(ls));
      localStorage.setItem("User", `${log}`);
      UserOnline = log;
      location.hash = "Calendar";
    }
  });
  return div;
};
export { BuildStartPage, UserOnline }; // экспортируем функцию в роутер index
