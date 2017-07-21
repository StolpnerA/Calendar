import calendarPage from "../pages/CalendarPage";


var div = document.querySelector("div");

var calendar = {
  name: "calendar",
  match: text => text === "calendar",
  onBeforeEnter: () => {
    // при заходе на страницу проверяеться, залогино ли ты заходишь , если нет то пошел вон!

    if (!sessionStorage.getItem("user")) window.location.hash = "";
  },
  onEnter: (url, db) => {
    console.log(db);
    // тут создаеться массив с годом и месяцем для передачи его в рендер
    let dateMonth = [];
    let date = new Date();
    let mont = date.getMonth();
    let yer = date.getFullYear();
    dateMonth.push(yer);
    dateMonth.push(mont + 1);
    //
    let calendar = new calendarPage(db); // создание экземпляра класса
    calendar.Render(dateMonth); // рендер страницы и добавление обработчика
  },
  onLeave: () => {
    //при выходе с страницы чистица header ,div
    document.querySelector("header").innerHTML = "";
    div.innerHTML = "";
  }
};

export { calendar };
