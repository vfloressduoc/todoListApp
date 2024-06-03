import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
})
export class TodayPage {
  todosDueSemana: Todo[] = [];

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

  markAsDone(todo: Todo) {
    this.todoService.archiveTodo(this.todosDueSemana.indexOf(todo)); // Archive by index
    this.presentToast('Tarea marcada como completada! Bien hecho :]');
    this.loadTodosDueSemana(); // Refresh the list after marking as done
  }

  editTodo(todo: Todo) {
    this.presentEditTodoAlert(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(this.todosDueSemana.indexOf(todo)); // Delete by index
    this.presentToast('Tarea eliminada!');
    this.loadTodosDueSemana(); // Refresh the list after deleting
  }

  async presentEditTodoAlert(todo: Todo) {
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
          text: 'Editar tarea',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            const newDeadline = new Date(inputData.editTodoDeadline + 'T00:00:00');
            this.todoService.editTodo(this.todosDueSemana.indexOf(todo), todoText, newDeadline); // Edit by index
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

  formatDeadline(deadline: Date): string {
    if (!deadline) return '';
    const formattedDate = new Date(deadline);
    return formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
