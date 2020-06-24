import * as actions from './actions.js';

const initialState = {
	todos: [],
	visibilityFilter: actions.VisibiltyFilter.SHOW_ALL
};

// se combinan los reducers
const todoApp = Redux.combineReducers({
	todos,
	visibilityFilter
});

// todo reducer
function todos( state = initialState.todos, action ) {

	switch ( action.type ) {
		
		case 'ADD_TODO':
			return [
				...state,
				{
					text: action.text,
					completed: false
				}
			]

		case 'TOGGLE_TODO':
			return state.map( ( todo, index ) => {

				if ( index === action.index ) {
					return {
						...todo,
						completed: !todo.completed
					};
				}

				return todo;
			});

		case 'REMOVE_TODO':
			return state.filter( ( todo, index ) => action.index !== index );
		
		default: 
			return state;
	} 
}

// filter reducer
function visibilityFilter( state = initialState.visibilityFilter, action ) {
	
	switch ( action.type ) {

		case 'SET_VISIVILITY_FILTER':
			return action.filter;

		default:
			return state;
	}
}

export default todoApp;
