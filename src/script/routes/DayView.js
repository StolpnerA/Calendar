import dayViewPage from "../pages/dayViewPage";


var dayView = {
  name: "dayView",
  match: text => text === "dayView",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => {
    let dayView = new dayViewPage();
    dayView.buildPages();

    document.querySelector("div").innerHTML = `
      <h3>Страница дня</h3>
      <p>Делается как и страница списка</p>
    `;
  },
  onLeave: () => {
    document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
    document.querySelector("header").innerHTML = "";
  }
};

export { dayView };
