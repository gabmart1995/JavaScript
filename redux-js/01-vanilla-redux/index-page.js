import { store, selectTodos, selectFilter } from './store.js';
import * as actions from './state-todo/actions.js';

class IndexPage {

	constructor() {
		
		this.leaveSucription = this.leaveSucription.bind( this );
		this.render = this.render.bind( this );

		this.unsubscribe = store.subscribe( this.render );
	}

	addTodo( $event ) {
		store.dispatch( actions.addTodo( form.description.value ) );
		$event.preventDefault();
	}

	leaveSucription() {
		this.unsubscribe();
	}

	toggleTodo( index ) {
		store.dispatch( actions.toggleTodo( index ) );
	}

	removeTodo( index ) {
		store.dispatch( actions.removeTodo( index ) );
	}

	handleChange( tbody ) {

		var change = tbody.getElementsByClassName('change');
		var drop = tbody.getElementsByClassName('delete');

		if ( change ) {

			for ( let i = 0; i < change.length; i++ ) {
				change[i].addEventListener('click', () => this.toggleTodo( i ));
			}
		}

		if ( drop ) {

			for ( let i = 0; i < drop.length; i++ ) {
				drop[i].addEventListener('click', () => this.removeTodo( i ) )
			}
		} 
	}

	setFilter( $event ) {
		var value = $event.target.value;
		store.dispatch( actions.setVisiblityFilter( value ) );
	}

	render() {

		var tbody = document.getElementById('table-body');
		var todos = selectTodos( store.getState() );
		var filter = selectFilter( store.getState() );

		tbody.innerHTML = '';

		if ( filter === 'SHOW_ACTIVE' ) {

			todos.filter( ( todo ) => !todo.completed ).forEach( ( todo ) => {

				tbody.innerHTML += `
					<tr style="text-align: center">
						<td>${ todo.text }</td>
						<td>${ todo.completed === false ? 'no completado' : 'completado' }</td>
						<td><button class="change">cambiar completado</button></td>
						<td><button class="delete">borrar tarea</button></td>
					</tr>
				`;
			});

		} else if ( filter === 'SHOW_COMPLETED' ) {

			todos.filter( ( todo ) => todo.completed ).forEach( ( todo ) => {

				tbody.innerHTML += `
					<tr style="text-align: center">
						<td>${ todo.text }</td>
						<td>${ todo.completed === false ? 'no completado' : 'completado' }</td>
						<td><button class="change">cambiar completado</button></td>
						<td><button class="delete">borrar tarea</button></td>
					</tr>
				`;
			});

		} else {

			todos.forEach(( todo ) => {

			tbody.innerHTML += `
				<tr style="text-align: center">
					<td>${ todo.text }</td>
					<td>${ todo.completed === false ? 'no completado' : 'completado' }</td>
					<td><button class="change">cambiar completado</button></td>
					<td><button class="delete">borrar tarea</button></td>
				</tr>
			`;

			});		
		}
			
		this.handleChange( tbody );
	}
}

var form = document.forms['todo-form'];
var filter = document.forms['todo-filter'];
var index = new IndexPage();

form.addEventListener( 'submit', index.addTodo );
filter.addEventListener( 'change', index.setFilter )
window.addEventListener( 'unload', index.leaveSucription );