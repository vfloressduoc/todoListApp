import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage {
  todos: Todo[] = [];
  reorderIsEnabled = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private todoService: TodoService
  ) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex: number) {
    this.todoService.archiveTodo(todoIndex);
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  markAsDone(index: number) {
    const todo = this.todos[index];
    this.todoService.archiveTodo(index);
    this.presentToast('Task marked as done! Well done :]');
  }

  editTodo(index: number) {
    const todo = this.todos[index];
    this.presentEditTodoAlert(todo.text, todo.deadline, index);
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodo(index);
    this.presentToast('Task deleted!');
  }

  async presentEditTodoAlert(todoText: string, deadline: Date, todoIndex: number) {
    const formattedDeadline = deadline ? new Date(deadline.getTime() - (deadline.getTimezoneOffset() * 60000)).toISOString().substring(0, 10) : null;

    const editTodoAlert = await this.alertController.create({
      header: 'Edit your task',
      message: 'Change task and deadline',
      inputs: [
        {
          type: 'text',
          name: 'editTodoInput',
          value: todoText,
        },
        {
          type: 'date',
          name: 'editTodoDeadline',
          value: formattedDeadline,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Edit task',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            const newDeadline = new Date(inputData.editTodoDeadline + 'T00:00:00');
            this.todoService.editTodo(todoIndex, todoText, newDeadline);
            this.presentToast('Task edited!');
          },
        },
      ],
    });

    await editTodoAlert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  openToDoAlert() {
    this.presentAddTodoAlert();
  }

  async presentAddTodoAlert() {
    const addTodoAlert = await this.alertController.create({
      header: 'Add A Todo',
      message: 'Enter Your Todo',
      inputs: [
        {
          type: 'text',
          name: 'addTodoInput',
          placeholder: 'Todo Text',
        },
        {
          type: 'date',
          name: 'addTodoDeadline',
          min: new Date().toISOString(),
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Add todo',
          handler: (inputData) => {
            const todoText = inputData.addTodoInput;
            const deadlineString = inputData.addTodoDeadline;
            const deadline = new Date(deadlineString + 'T00:00:00');
            this.todoService.addTodo(todoText, deadline);
            this.presentToast('Todo is added');
          },
        },
      ],
    });

    await addTodoAlert.present();
  }

  formatDeadline(deadline: Date): string {
    if (!deadline) return '';
    const formattedDate = new Date(deadline);
    return formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
