import db from "./dataBase";
class calendarPage {
  Render(dateMonth) {
    this.buildHeader();
    this.exitButton();
    this.RenderPage();
    this.renderButtonCalendar();
    this.renderCalendar(dateMonth);
    this.addHandlerEvent(dateMonth);
    // что-то на подобии конструктора, тут рендерица календарь и добавляюцца обработчики
  }
  buildHeader() {
    //тут рендерица кто зашел и кнопка выхода
    var header = document.querySelector("header");
    var div = document.querySelector("div");
    header = header.innerHTML = `
  <div class="col-md-9"></div>
            <div class="col-md-3">
            <p class="lead">${sessionStorage.getItem(
              "user"
            )} <button class="btn btn-default" id="exit">Выход</button><p>
            </div>`;
    div = div.innerHTML = ` 
  <div class="contant">
            </div>`;
  }
  exitButton() {
    //обработчик выхода на главную страницу
    document.querySelector("#exit").addEventListener("click", () => {
      location.hash = "";
    });
  }
  RenderPage(dateMonth) {
    //знаю не лучшее название, тут создаються дивы для рендара календаря и кнопок
    var placeButtonRender = (document.querySelector(
      ".contant"
    ).innerHTML = `<div class="ButtonPlace"></div>`);
    var placeCalendarRender = (document.querySelector(
      ".contant"
    ).innerHTML += `<br><br> <div class="CalendarPlace"></div>`);
    console.log(dateMonth);
  }
  renderButtonCalendar() {
    // сама отрисовка кнопок
    document.querySelector(".ButtonPlace").innerHTML = `    
          <div align="center">
                <button class="btn btn-default" id="backButton">Назад</button>
                <span class="material-design-iconic-font" id="tegMonth"></span>
                <button class="btn btn-default" id="forwardButton">Вперед</button>
            </div>`;
  }
  renderCalendar(dateMonth) {
    //вот тут рендарица календарь на текущий месяц
    var year = dateMonth[0]; // разбераеться масив для получения года и месяца
    var month = dateMonth[1];

    var arrMonth = [
      //массив с месяцами для отображения какой сейчас месяц и год
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ];
    var showMonth = month - 1; // минусуем месяц т.к меняли начало года не с 0 а с 1
    document.querySelector("#tegMonth").innerHTML =
      arrMonth[showMonth] + " " + year;
    function createCalendar(year, month) {
      var elem = document.querySelector(".CalendarPlace");
      var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      var d = new Date(year, mon);
      var table = `<table class="table table-bordered table-hover"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;
      // заполнить первый ряд от понедельника
      // и до дня, с которого начинается месяц
      for (var i = 0; i < getDay(d); i++) {
        table += "<td></td>";
      }
      // ячейки календаря с датами
      while (d.getMonth() == mon) {
        table += `<td class="d${d.getDate()}_${month}_${year}">${d.getDate()}</td>`;

        if (getDay(d) % 7 == 6) {
          // вс, последний день - перевод строки
          table += "</tr><tr>";
        }
        d.setDate(d.getDate() + 1);
      }
      // добить таблицу пустыми ячейками, если нужно
      if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
          table += "<td></td>";
        }
      }
      // закрыть таблицу
      table += "</tr></table>";
      // только одно присваивание innerHTML
      elem.innerHTML = table;
      let dataBase = new db();

      dataBase.loadFromDB();
    }
    function getDay(date) {
      // получить номер дня недели, от 0(пн) до 6(вс)
      var day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    }
    createCalendar(year, month); //вызов внутренней функции рендара каледаря
    return dateMonth; // возращяем дату на которую производился рендар календаря
  }
  addHandlerEvent(dateMonth) {
    // тут добавляються обработчики для листания месяцев + обработчики на удаление и добавлени заголовков
    document
      .querySelector("#backButton")
      .addEventListener("click", () => this.addEventForBackButoon(dateMonth));
    document
      .querySelector("#forwardButton")
      .addEventListener("click", () =>
        this.addEventForForwardButton(dateMonth)
      );
    document
      .querySelector("table")
      .addEventListener("dblclick", () => this.renderMadal(event));
    document
      .querySelector("table")
      .addEventListener("click", () => this.delCaption(event));
  }
  addEventForForwardButton(dateMonth) {
    // тут код добавление месяца или года в зависимости какой месяц пришел + вызов функции рендара полученной даты
    var year = dateMonth[0];
    var month = dateMonth[1];
    if (month === 12) {
      year = year + 1;
      month = 1;
      dateMonth[0] = year;
      dateMonth[1] = month;
    } else {
      month = month + 1;
      dateMonth[1] = month;
    }
    document.querySelector(".CalendarPlace").innerHTML = ""; // очистка календаря для того что бы даты менялись
    this.renderCalendar(dateMonth); // тут сам вызов данного метада для рендара
  }
  addEventForBackButoon(dateMonth) {
    // тут код вычита месяца или года в зависимости какой месяц пришел + вызов функции рендара полученной даты
    var year = dateMonth[0];
    var month = dateMonth[1];
    if (month === 1) {
      year = year - 1;
      month = 12;
      dateMonth[0] = year;
      dateMonth[1] = month;
    } else {
      month = month - 1;
      dateMonth[1] = month;
    }
    document.querySelector(".CalendarPlace").innerHTML = ""; // очистка календаря для того что бы даты менялись
    this.renderCalendar(dateMonth); // тут сам вызов данного метада для рендара
  }
  addCaption(taskTitle, taskDescription, data) {
    let dataBase = new db();
    document.querySelector(
      `.${data}`
    ).innerHTML += `<div>${taskTitle}<button class="cross">[x]</button></div>`;
    dataBase.SaveEventInDB(taskTitle, taskDescription, data);
  }
  delCaption(e) {
    // тут код для удаления заголовка
    var target = e.target;
    if (target.tagName != "BUTTON") return;
    var text = target.parentNode.innerHTML.slice(0, -34);
    var date = target.parentNode.parentNode.className;
    target.parentNode.remove();
    let dataBase = new db(); //создание экземпляра класса базы данных
    dataBase.deleteEventInDB(date, text); // вызов метода из базы для удаления евента принимает на вход текст заголовка и тег в какой записали
  }
  renderMadal(e) {
    var target = e.target;
    if (target.tagName !== "TD") return;
    var data = target.className;
    let tbody = document.querySelector("tbody");
    tbody.innerHTML += `
        <div class="note-create-form">
                    <div class="note-header">
                         <span class="day">${data}</span>
                         <span class="glyphicon glyphicon glyphicon-remove closeModal"></span>
                    </div>
                    <div class="note-title"><input type="text" placeholder="Title" id="taskTitleInput"></div>
                    <div class="note-body">
                                <textarea id="taskDescriptionInput">
                                
</textarea>
                            </div>
                            <button class="btn btn-default my-btn-default">Save</button>
                        </div>`;
    let modal = document.querySelector(".note-create-form");
    let closeModal = modal.querySelector(".closeModal");
    let save = modal.querySelector("button");
    modal.style.display = "flex";
    taskDescriptionInput.value = "";
    closeModal.addEventListener("click", () => (modal.style.display = "none"));
    save.addEventListener("click", () => {
      let taskTitle = taskTitleInput.value;
      let taskDescription = taskDescriptionInput.value;
      if (taskTitle) this.addCaption(taskTitle, taskDescription, data);
    });
  }
}
export default calendarPage;
