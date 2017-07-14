import indexPage from "../components/IndexPage";
var div = document.querySelector("div");
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => {
    let index = new indexPage();
    index.renderPage();
    index.addHendler();
  },
  onLeave: () => {
    document.querySelector("div").innerHTML = "";
  }
};

export { index };
