import * as actionTypes from '../action/actionType';

const initialState = {
    todos: [
        { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
        { id: 2, title: 'Movie', content: 'watch movie', done: false },
        { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
      ],
    selectedTodo: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_TODO:
            const newTodo ={
                id: action.id,
                title: action.title,
                content: action.content,
                done: action.done,
            }
            return {...state, todos: [...state.todos, newTodo]};
        case actionTypes.DELETE_TODO:
            const deleted = state.todos.filter((todo) => {
                return todo.id !== action.targetID;
            });
            return {...state, todos: deleted};
        case actionTypes.TOGGLE_DONE:
            const modified = state.todos.map((todo => {
                if (todo.id === action.targetID) {
                    return {...todo, done: !todo.onde};
                }
                else{
                    return {...todo };
                }
            }));
            return {...state, todos: modified};
        case actionTypes.GET_TODO:
            return {...state, selectedTodo: action.target};
        case actionTypes.GET_ALL:
            return {...state, todos: action.todos};
        default:
            return state;
    }
}

export default reducer;