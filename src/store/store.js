import {
    createStore
} from 'redux';

const listReducer = (state = {
    selected: [],
    all: [],
    isLoaded: false,
}, action) => {
    switch (action.type) {
        case 'ADD_POST':
            if (state.selected.some(x => x.id === action.data.id)) {
                return state;
            }
            state = {...state, selected: [...state.selected, action.data]};
            break;
        case 'REMOVE_POST':
            return {...state, selected: state.selected.filter(x => x.id !== action.data.id)}; 
        case 'CREATE_POST':
            action.data.id = Math.max(...state.all.map(x => x.id)) + 1;
            state = {...state, all: [...state.all, action.data]};
            break;
        case 'LOAD_POST':
            state = {...state, all: [...state.all, ...action.data], isLoaded: true};
            break;
        default:
            break;
    }

    return state;
}

const store = createStore(listReducer, {
    selected: [],
    all: [],
    isLoaded: false,
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;