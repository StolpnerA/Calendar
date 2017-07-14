import calendarPage from "../components/CalendarPage";
//import { userOnline } from "../components/signIn";
var div = document.querySelector("div");
var Calendar = {
  name: "Calendar",
  match: text => text === "Calendar",
  onBeforeEnter: () => {
    if (!window.userOnline) location.hash = "";
  },
  onEnter: () => {
    let dateMonth = [];
    let date = new Date();
    let mont = date.getMonth();
    let yer = date.getFullYear();
    dateMonth.push(yer);
    dateMonth.push(mont + 1);
    let calendar = new calendarPage();
    calendar.Render(dateMonth);
  },
  onLeave: () => {
    document.querySelector("header").innerHTML = "";
    div.innerHTML = "";
    window.userOnline = "";
  }
};

export { Calendar };
