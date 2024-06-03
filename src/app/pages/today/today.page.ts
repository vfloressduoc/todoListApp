import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage {
  todosDueSemana: any[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private todoService: TodoService
  ) {
    this.loadTodosDueSemana();
  }

  loadTodosDueSemana() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    this.todosDueSemana = this.todoService.getTodos().filter(todo => {
      const deadlineDate = new Date(todo.deadline);
      return deadlineDate >= today && deadlineDate <= nextWeek;
    });
  }

  markAsDone(todo: any) {
    this.todoService.archiveTodo(todo);
    this.presentToast('Tarea marcada como completada! Bien hecho :]');
    this.loadTodosDueSemana(); // Refresh the list after marking as done
  }

  editTodo(todo: any) {
    this.presentEditTodoAlert(todo);
  }

  deleteTodo(todo: any) {
    this.todoService.deleteTodo(todo);
    this.presentToast('Tarea eliminada!');
    this.loadTodosDueSemana(); // Refresh the list after deleting
  }

  async presentEditTodoAlert(todo: any) {
    const editTodoAlert = await this.alertController.create({
      header: 'Edita tu tarea',
      message: 'Cambiar tarea y fecha límite',
      inputs: [
        {
          type: 'text',
          name: 'editTodoInput',
          value: todo.text,
        },
        {
          type: 'date',
          name: 'editTodoDeadline',
          value: new Date(todo.deadline).toISOString().split('T')[0],
        },
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Edit todo',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            const newDeadline = new Date(inputData.editTodoDeadline + 'T00:00:00');
            this.todoService.editTodo(todo, todoText, newDeadline);
            this.presentToast('Tarea editada!');
            this.loadTodosDueSemana(); // Refresh the list after editing
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
}
