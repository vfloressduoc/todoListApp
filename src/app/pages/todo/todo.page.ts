import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model'; // Adjust the path as per your project structure

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
    this.presentToast('Tarea marcada como completada! Bien hecho :]');
  }

  editTodo(index: number) {
    const todo = this.todos[index];
    this.presentEditTodoAlert(todo.text, todo.deadline, index);
  }

  deleteTodo(index: number) {
    this.todoService.deleteTodo(index);
    this.presentToast('Tarea eliminada!');
  }

  async presentEditTodoAlert(todoText: string, deadline: Date, todoIndex: number) {
    const formattedDeadline = deadline ? new Date(deadline.getTime() - (deadline.getTimezoneOffset() * 60000)).toISOString().substring(0, 10) : null;
  
    const editTodoAlert = await this.alertController.create({
      header: 'Edita tu tarea',
      message: 'Cambiar tarea y fecha límite',
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
        { text: 'Cancelar' },
        {
          text: 'Edita tu tarea',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            const newDeadline = new Date(inputData.editTodoDeadline + 'T00:00:00');
            this.todoService.editTodo(todoIndex, todoText, newDeadline);
            this.presentToast('Tarea editada!');
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
      header: 'Agregar Tarea',
      message: 'Ingrese el texto de la tarea y la fecha límite',
      inputs: [
        {
          type: 'text',
          name: 'addTodoInput',
          placeholder: 'Tarea',
        },
        {
          type: 'date',
          name: 'addTodoDeadline',
          min: new Date().toISOString(), // Ensure minimum date is today
        },
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Agregar Tarea',
          handler: (inputData) => {
            const todoText = inputData.addTodoInput;
            const deadlineString = inputData.addTodoDeadline;
            const deadline = new Date(deadlineString + 'T00:00:00'); 
            this.todoService.addTodo(todoText, deadline);
            this.presentToast('Tarea agregada!');
          },
        },
      ],
    });
  
    await addTodoAlert.present();
  }
} 
