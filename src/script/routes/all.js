// import dayViewPage from "../pages/dayViewPage";

import Task from '../components/Task';


var all = {
  name: "all",
  match: text => text === "all",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: (url, db) => {
    // let all = new dayViewPage();
    // all.buildPages();

    const mainDiv = document.querySelector("div");

    db.loadFromDB().then(data => {
      console.log(data);

      Object.keys(data).forEach(item => {
        const element = document.createElement('div');
        mainDiv.append(element);

        data[item].id = item;

        new Task(element, data[item], db).renderTask();
      })
    })

  },
  onLeave: () => {
    document.querySelector("div").innerHTML = ""; // при покидании данной страницы производиться очистка
    document.querySelector("header").innerHTML = "";
  }
};

export { all };
