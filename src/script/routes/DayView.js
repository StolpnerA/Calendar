import dayViewPage from "../components/dayViewPage";
var dayView = {
  name: "dayView",
  match: text => text === "dayView",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => {
    let dayView = new dayViewPage();
    dayView.renderHeader();
    dayView.exitButton();
  },
  onLeave: () => {
    document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
    document.querySelector("header").innerHTML = "";
  }
};
export { dayView };
