import todoApp from './state-todo/reducer.js';
import * as actions from './state-todo/actions.js';

export var store = Redux.createStore( todoApp );

// console.log( store.getState() );

// var unsubscribe = store.subscribe( renderTodos ); 

// despachamos las acciones
// store.dispatch( actions.addTodo('Aprender sobre acciones') );
// store.dispatch( actions.addTodo('Apender sobre reducers') );
// store.dispatch( actions.addTodo('Renderizar resultados') );
// store.dispatch( actions.toggleTodo( 0 ) );
// store.dispatch( actions.toggleTodo( 1 ) );
// store.dispatch( actions.toggleTodo( 2 ) );

// nos dejamos de suscribir
// unsubscribe();