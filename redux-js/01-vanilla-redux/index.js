import { store } from './store.js';
import { addTodo, toggleTodo } from './state-todo/actions.js';

class IndexPage {

	constructor() {
		this.unsubscribe = store.subscribe( this.render );
		this.leaveSucription = this.leaveSucription.bind( this );
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

	render() {

		var tbody = document.getElementById('table-body');
		const { todos } = store.getState();

		tbody.innerHTML = '';

		todos.forEach(( todo, index ) => {

			tbody.innerHTML += `
				<tr>
					<td>${ todo.text }</td>
					<td>${ todo.completed == false ? 'no completado' : 'completado' }</td>
					<td><button>cambiar</button></td>
				</tr>
			`;
		});
	}	
}

var form = document.forms['todo-form'];
var index = new IndexPage();

form.addEventListener( 'submit', index.addTarea );
document.addEventListener( 'unload', index.leaveSucription );