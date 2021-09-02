import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'todo-app';
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';

  constructor() {
    this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    this.todos.push(new Todo(2, 'Ir ao mercado', true));
    this.todos.push(new Todo(3, 'Cortar o cabelo', false));
  }

  remove(task: Todo) {
    const index = this.todos.indexOf(task);
    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(task: Todo) {
    task.done = true;
  }

  markAsRedo(task: Todo) {
    task.done = false;
  }
}
