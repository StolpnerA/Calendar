import Router from "./utils/Router";
import { index } from "./routes/index";
import { Calendar } from "./routes/Calendar";
const routes = [index, Calendar];
new Router({ routes });
