import { BuildStartPage } from "../components/BuildStartPage";
var index = {
  name: "StartPage",
  match: "",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => BuildStartPage(),
  onLeave: () => console.log("onLeave index")
};
export default { index };
