import calendarPage from "../components/CalendarPage";
//import { userOnline } from "../components/signIn";
var div = document.querySelector("div");
var Calendar = {
  name: "Calendar",
  match: text => text === "Calendar",
  onBeforeEnter: () => {
    // при заходе на страницу проверяеться, залогино ли ты заходишь , если нет то пошел вон!

    if (!sessionStorage.getItem("user")) location.hash = "";
  },
  onEnter: () => {
    // тут создаеться массив с годом и месяцем для передачи его в рендер
    let dateMonth = [];
    let date = new Date();
    let mont = date.getMonth();
    let yer = date.getFullYear();
    dateMonth.push(yer);
    dateMonth.push(mont + 1);
    //
    let calendar = new calendarPage(); // создание экземпляра класса
    calendar.Render(dateMonth); // рендер страницы и добавление обработчика
  },
  onLeave: () => {
    //при выходе с страницы чистица header ,div
    document.querySelector("header").innerHTML = "";
    div.innerHTML = "";
  }
};

export { Calendar };
