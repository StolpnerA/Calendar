var BuildCalendarPage = class {
  buildPage() {
    var header = document.querySelector("header");
    var div = document.querySelector(".render");
    header = header.innerHTML = `
  <div class="col-md-10"></div>
            <div class="col-md-2">
                <p class="lead">Столпнер Андрей <button class="btn btn-default" id="exit">Выход</button><p>
            </div>`;
    div = div.innerHTML = ` 
  <div class="container">
            </div>`;
  }
  exitButton() {
    document.querySelector("#exit").addEventListener("click", () => {
      location.hash = "";
    });
  }
  addPlaceForCalendar(date) {
    var contener = (document.querySelector(
      ".render"
    ).innerHTML = `<div class="container">`);
    var placeButtonRender = (document.querySelector(
      ".container"
    ).innerHTML = `<div class="ButtonPlace"></div>`);
    var placeCalendarRender = (document.querySelector(
      ".container"
    ).innerHTML += `<div class="CalendarPlace"><div id="calendar"></div></div>`);
    console.log(placeCalendarRender);
    console.log(date);
    this.renderButtonCalendar();
    this.renderCalendar(date);
  }
  //функция отрисовки кнопок смены месяца
  renderButtonCalendar() {
    document.querySelector(".ButtonPlace").innerHTML = `    
          <div align="center">
                <button class="btn btn-default" id="backButton">Назад</button>
                <span class="material-design-iconic-font">Июль</span>
                <button class="btn btn-default" id="forwardButton">Вперед</button>
            </div>`;
  }
  //функция отрисовки календаря на месяця
  renderCalendar(dateMont) {
    var year = dateMont[0];
    var month = dateMont[1];
    function createCalendar(id, year, month) {
      var elem = document.getElementById(id);
      var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      var d = new Date(year, mon);
      var table = `<table class="table table-bordered table-hover"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;
      // заполнить первый ряд от понедельника
      // и до дня, с которого начинается месяц
      // * * * | 1  2  3  4
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
    createCalendar("calendar", year, month);
    document
      .querySelector("table")
      .addEventListener("dblclick", () => this.addCaption(event));
    document
      .querySelector("table")
      .addEventListener("click", () => this.delCaption(event));
    return dateMont;
  }
  addEventForForwardButton(date) {
    var year = date[0];
    var month = date[1];
    if (month === 12) {
      year = year + 1;
      month = 1;
      date[0] = year;
      date[1] = month;
    } else {
      month = month + 1;
      date[1] = month;
    }
    document.querySelector("#calendar").innerHTML = "";
    this.renderCalendar(date);
  }
  addEventForBackButoon(date) {
    var year = date[0];
    var month = date[1];
    if (month === 1) {
      year = year - 1;
      month = 12;
      date[0] = year;
      date[1] = month;
    } else {
      month = month - 1;
      date[1] = month;
    }
    document.querySelector("#calendar").innerHTML = "";
    this.renderCalendar(date);
  }
  addHandlerEvent(dateMont) {
    document
      .querySelector("#backButton")
      .addEventListener("click", () => this.addEventForBackButoon(dateMont));
    document
      .querySelector("#forwardButton")
      .addEventListener("click", () => this.addEventForForwardButton(dateMont));
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
    console.log(obj);
    obj[data] = obj[data] || {};
    obj[data].push(q);

    console.log(caption[`${localStorage.getItem("User")}`].date);
  }
  delCaption(e) {
    var target = e.target;
    if (target.tagName !== "BUTTON") return;
    var text = target.parentNode.innerHTML.slice(0, -34);
    var date = target.parentNode.parentNode.className;
    target.parentNode.remove();
    // var LS = JSON.parse(localStorage.getItem("myCalendar"));
    // var index = LS[date].indexOf(text);
    // console.log(index);
    // LS[date].splice(index, 1);
    // if (LS[date].length === 0) delete LS[date];
    // localStorage.setItem("myCalendar", JSON.stringify(LS));
    // document.querySelector("textarea").value += del;
  }
};
export default BuildCalendarPage;
