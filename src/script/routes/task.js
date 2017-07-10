var div = document.querySelector('div.main');
var index = {
    name: 'index',
    match: '',
    onBeforeEnter: () => console.log(`onBeforeEnter index`),
    onEnter: () => console.log(`onEnter index`),
    onLeave: () => console.log('onLeave index')
};

export { task };