
import EventBus from './utils/eventBus';
import Router from './utils/router';

import { index } from './routes/index';
// Все роуты

const routes = [index];

const eventBus = new EventBus();

new Router({routes}, eventBus);