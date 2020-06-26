export var ADD_TODO = 'ADD_TODO';
export var REMOVE_TODO = 'REMOVE_TODO';
export var SET_VISIVILITY_FILTER = 'SET_VISIVILITY_FILTER';
export var TOGGLE_TODO = 'TOGGLE_TODO';

export var VisibiltyFilter = {
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ALL: 'SHOW_ALL',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/* Creadores de acciones */

export function addTodo( text ) {
	return { type: ADD_TODO, text };
}

export function toggleTodo( index ) {
	return { type: TOGGLE_TODO, index };
}

export function removeTodo( index ) {
	return { type: REMOVE_TODO, index };
}

export function setVisiblityFilter( filter ) {
	return { type: SET_VISIVILITY_FILTER, filter };
}