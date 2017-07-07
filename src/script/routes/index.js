var div = document.querySelector('div.main');
var index = {
    name: 'index',
    match: '',
    onBeforeEnter: () => console.log(`onBeforeEnter index`),
    onEnter: () => console.log(`onEnter index`), //Когда пользователь не авторизован, то показывать произвольный текст на экране
    onLeave: () => console.log('onLeave index')
};

export { index };