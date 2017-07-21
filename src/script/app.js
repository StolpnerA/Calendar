import Router from "./utils/Router";

import DataBase from './utils/DataBase';

import Header from './components/Header';

import { index } from "./routes/index";
import { calendar } from "./routes/calendar";
import { dayView } from "./routes/dayView";
import { all } from "./routes/all";

const routes = [index, calendar, dayView, all];

const dataBase = new DataBase();

const header = document.createElement('section'); // костыль потому что на каждой странице затирается, в идеале div / header
header.className = 'app-header';
document.body.prepend(header);
new Header(header).renderHeader();

new Router({ routes }, dataBase);
