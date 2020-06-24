import { store, selectTodos } from './store.js';
import { addTodo, toggleTodo } from './state-todo/actions.js';

class IndexPage {

	constructor() {
		
		this.leaveSucription = this.leaveSucription.bind( this );
		this.render = this.render.bind( this );

		this.unsubscribe = store.subscribe( this.render );
	}

	addTarea( $event ) {
		store.dispatch( addTodo( form.description.value ) );
		$event.preventDefault();
	}

	leaveSucription() {
		this.unsubscribe();
	}

	toggleTarea( index ) {
		store.dispatch( toggleTodo( index ) )
	}

	handleChange( tbody ) {

		var buttons = tbody.getElementsByClassName('changeState');

		if ( buttons ) {

			for ( let i = 0; i < buttons.length; i++ ) {
				buttons[i].addEventListener('click', () => this.toggleTarea( i ));
			}
		} 
	}

	render() {

		var tbody = document.getElementById('table-body');
		var todos = selectTodos( store.getState() );

		tbody.innerHTML = '';

		todos.forEach(( todo, index ) => {

			tbody.innerHTML += `
				<tr>
					<td>${ todo.text }</td>
					<td>${ todo.completed === false ? 'no completado' : 'completado' }</td>
					<td><button class="changeState">cambiar completado</button></td>
					<td><button>borrar</button></td>
				</tr>
			`;

			this.handleChange( tbody );
		});	
	}
}

var form = document.forms['todo-form'];
var index = new IndexPage();

form.addEventListener( 'submit', index.addTarea );
window.addEventListener( 'unload', index.leaveSucription );