import signIn from "../utils/User";
// import db from "./dataBase";


class indexPage {
  renderPage() {
    // тут производиться рендер нашей входной страницы
    var div = document.querySelector("div");
    var CreateDiv = `
    <div class="container">
      <div class = 'error'>Неверный логин или пароль</div>
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
      </div>
    </div>`;
    div = div.innerHTML = CreateDiv; // отрисовка страницы
  }

  addHendler() {
    // тут добавляеца оброботчик на кнопку входа с промисом
    document.querySelector("#butAut").addEventListener("click", () => {
      var log = window.usr.value;
      var pass = window.pwd.value;
      let userIn = new signIn();
      Promise.resolve()
      .then(() => userIn.trySigninByLoginAndPass(log, pass))
      .catch(() => userIn.tryRegisterWithLoginAndEmail(log, pass))
      .then(() => (window.location.hash = "calendar"))
      .catch(
        (error) => {
          (document.querySelector(".error").style.display = "block")
        }
      );
    });
  }
}

export default indexPage; // экспортируем функцию в роутер index
