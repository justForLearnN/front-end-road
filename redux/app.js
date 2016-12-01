let createStore = Redux.createStore;
let _ain = document.querySelector('.ain');
let _add = document.querySelector('.add');
let _rce = document.querySelector('.reduce');

// 定义状态数的结构
let initState = {
    opacity: 1,
    size: {
        width: 100,
        height: 40
    }
}

// 定义action的结构
let change_width = {
        type: 'CHANGE-WDITH',
        value: 100
}
let change_height = {
    type: 'CHANGE-HEIGHT',
    value: 40
}

// 定义reducer函数
function todoApp(state = initState, action) {
    switch (action.type) {
        case 'CHANGE-WDITH':
            return Object.assign({}, state, {
                size: { width: action.value }
            });
        case 'CHANGE-HEIGHT':
            return Object.assign({}, state, {
                size: { height: action.value }
            });
        default:
            return state;
    }
}

// 创建store
let store = createStore(todoApp);

//  打印初始状态
console.log(store.getState());

// 每次state更新时，打印日志
let unsubscribe = store.subscribe(() => {
    let state = store.getState();
    if (state.size.width) {
        _ain.style.width = state.size.width + 'px';
    }
    if (state.size.height) {
        _ain.style.height = state.size.height + 'px';
    }
})

// store.dispatch({
//     type: 'CHANGE-WDITH',
//     value: 120
// })
//
// store.dispatch({
//     type: 'CHANGE-WDITH',
//     value: 140
// })
//
// store.dispatch({
//     type: 'CHANGE-HEIGHT',
//     value: 60
// })

_add.onclick = () => {
    let width = _ain.offsetWidth + 4;
    store.dispatch({
        type: 'CHANGE-WDITH',
        value: width
    })
}

_rce.onclick = () => {
    let width = _ain.offsetWidth - 4;
    store.dispatch({
        type: 'CHANGE-WDITH',
        value: width
    })
}
