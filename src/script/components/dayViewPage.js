import db from "./dataBase";
class dayViewPage {
  buildPages() {
    this.renderHeader();
    this.exitButton();
  }
  renderHeader() {
    var header = document.querySelector("header");
    var div = document.querySelector("div");
    header = header.innerHTML = `
  <div class="col-md-9"></div>
            <div class="col-md-3">
            <p class="lead">${sessionStorage.getItem(
              "user"
            )} <button class="btn btn-default" id="exit">Выход</button><p>
            </div>`;
    div = div.innerHTML = ` 
  <div class="contant">
            </div>`;
  }
  exitButton() {
    //обработчик выхода на главную страницу
    document.querySelector("#exit").addEventListener("click", () => {
      location.hash = "";
    });
  }
}
export default dayViewPage;
