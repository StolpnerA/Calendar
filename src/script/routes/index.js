import indexPage from "../pages/IndexPage";


var div = document.querySelector("div");

var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => {
    let index = new indexPage(); // создание экземплара класа indexPage
    index.renderPage(); //рендер страницы
    index.addHendler(); // добавление обработчика
  },
  onLeave: () => {
    document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
  }
};

export { index };
