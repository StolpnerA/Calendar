import Router from "./utils/Router";
import { index } from "./routes/index";
import { Calendar } from "./routes/Calendar";
import { dayView } from "./routes/DayView";
const routes = [index, Calendar, dayView];
new Router({ routes });
