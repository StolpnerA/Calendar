class calendarPage {
  Render(dateMonth) {
    this.buildHeader();
    this.exitButton();
    this.RenderPage();
    this.renderButtonCalendar();
    this.renderCalendar(dateMonth);
    this.addHandlerEvent(dateMonth);
  }
  buildHeader() {
    var header = document.querySelector("header");
    var div = document.querySelector("div");
    header = header.innerHTML = `
  <div class="col-md-9"></div>
            <div class="col-md-3">
            <p class="lead">${window.userOnline} <button class="btn btn-default" id="exit">Выход</button><p>
            </div>`;
    div = div.innerHTML = ` 
  <div class="contant">
            </div>`;
  }
  exitButton() {
    document.querySelector("#exit").addEventListener("click", () => {
      location.hash = "";
    });
  }
  RenderPage(dateMonth) {
    var placeButtonRender = (document.querySelector(
      ".contant"
    ).innerHTML = `<div class="ButtonPlace"></div>`);
    var placeCalendarRender = (document.querySelector(
      ".contant"
    ).innerHTML += `<br><br> <div class="CalendarPlace"></div>`);
    console.log(dateMonth);
  }
  renderButtonCalendar() {
    document.querySelector(".ButtonPlace").innerHTML = `    
          <div align="center">
                <button class="btn btn-default" id="backButton">Назад</button>
                <span class="material-design-iconic-font" id="tegMonth"></span>
                <button class="btn btn-default" id="forwardButton">Вперед</button>
            </div>`;
  }
  renderCalendar(dateMonth) {
    var year = dateMonth[0];
    var month = dateMonth[1];
    var arrMonth = [
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
    var showMonth = month - 1;
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
    }
    function getDay(date) {
      // получить номер дня недели, от 0(пн) до 6(вс)
      var day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    }
    createCalendar(year, month);

    return dateMonth;
  }
  addHandlerEvent(dateMonth) {
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
      .addEventListener("dblclick", () => this.addCaption(event));
    document
      .querySelector("table")
      .addEventListener("click", () => this.delCaption(event));
  }
  addEventForForwardButton(dateMonth) {
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
    document.querySelector(".CalendarPlace").innerHTML = "";
    this.renderCalendar(dateMonth);
  }
  addEventForBackButoon(dateMonth) {
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
    document.querySelector(".CalendarPlace").innerHTML = "";
    this.renderCalendar(dateMonth);
  }
  addCaption(e) {
    var target = e.target;
    if (target.tagName !== "TD") return;
    var data = target.className;
    var q = prompt("Введите заголовок события?", "Пожрать");
    if (!q) return;
    target.innerHTML += `<div id="events">${q}<button class="cross">[x]</button></div>`;
    var caption = JSON.parse(localStorage.getItem("calendar"));
    var obj = caption[`${localStorage.getItem("User")}`].date;
    this.saveInDB(data, q);
  }
  delCaption(e) {
    var target = e.target;
    if (target.tagName !== "BUTTON") return;
    var text = target.parentNode.innerHTML.slice(0, -34);
    var date = target.parentNode.parentNode.className;
    target.parentNode.remove();
  }
}
export default calendarPage;
