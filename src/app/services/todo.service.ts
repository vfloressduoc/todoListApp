import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private archivedTodos: Todo[] = [];

  constructor() {}

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: string, deadline: Date): void {
    this.todos.push({ text: todo, deadline: deadline, done: false });
  }

  archiveTodo(todoIndex: number): void {
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived);
  }

  getArchivedTodos(): Todo[] {
    return this.archivedTodos;
  }

  editTodo(todoIndex: number, todoText: string, deadline: Date): void {
    this.todos[todoIndex] = { text: todoText, deadline: deadline, done: this.todos[todoIndex].done };
  }

  deleteTodo(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos.splice(todoIndex, 1);
    }
  }
}
