import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public taskform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskform = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    // this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    // this.todos.push(new Todo(2, 'Ir ao mercado', true));
    // this.todos.push(new Todo(3, 'Cortar o cabelo', false));
    this.load();
  }

  add() {
    const task = this.taskform.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, task, false));
    this.save();
    this.clear();
  }

  remove(task: Todo) {
    const index = this.todos.indexOf(task);
    if (index != -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  clear() {
    this.taskform.reset();
  }

  markAsDone(task: Todo) {
    task.done = true;
    this.save();
  }

  markAsRedo(task: Todo) {
    task.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    this.todos = JSON.parse(data!); // Outra solucao possivel: if (data) { this.todos = JSON.parse(data) } else { this.todos = [] }
  }
}
