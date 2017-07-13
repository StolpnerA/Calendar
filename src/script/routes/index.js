import { BuildStartPage, UserOnline } from "../components/BuildStartPage";
var div = document.querySelector(".render");
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => BuildStartPage(),
  onLeave: () => {
    document.querySelector(".render").innerHTML = "";
  }
};

export { index };
