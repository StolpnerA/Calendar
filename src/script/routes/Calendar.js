import BuildCalendarPage from "../components/BuildCalendarPage";
import { BuildStartPage, UserOnline } from "../components/BuildStartPage";
var div = document.querySelector(".render");
var Calendar = {
  name: "Calendar",
  match: text => text === "Calendar",
  onBeforeEnter: () => {
    var a = localStorage.getItem("User");
    if (a != UserOnline && a == null) {
      location.hash = "";
    }
  },
  onEnter: () => {
    //работаем с классом календаря
    let date = [];
    let t = new Date();
    let mont = t.getMonth();
    let yer = t.getFullYear();
    date.push(yer);
    date.push(mont + 1);
    let Calendar = new BuildCalendarPage();
    Calendar.buildPage();
    Calendar.exitButton();
    Calendar.addPlaceForCalendar(date);
    Calendar.addHandlerEvent(date);
    //Calendar.addCaption();
  },
  onLeave: () => {
    document.querySelector(".render").innerHTML = "";
    document.querySelector("header").innerHTML = "";
    localStorage.removeItem("User"); //удаляем активного пользователя
  }
};

export { Calendar };
