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
  
    console.log('Today:', today);
    console.log('Next week:', nextWeek);
  
    this.todosDueSemana = this.todoService.getTodos().filter(todo => {
      const deadlineDate = new Date(todo.deadline);
      console.log('Todo:', todo.text, 'Deadline:', deadlineDate);
      return deadlineDate >= today && deadlineDate <= nextWeek;
    });
  
    console.log('Filtered Todos:', this.todosDueSemana);
  }

  markAsDone(todo: any) {
    this.todoService.archiveTodo(todo);
    this.presentToast('Task marked as done');
  }

  editTodo(todo: any) {
    this.presentEditTodoAlert(todo);
  }

  deleteTodo(todo: any) {
    this.todoService.deleteTodo(todo);
    this.presentToast('Task deleted');
  }

  async presentEditTodoAlert(todo: any) {
    const editTodoAlert = await this.alertController.create({
      header: 'Edit A Todo',
      message: 'Change Your Todo',
      inputs: [
        {
          type: 'text',
          name: 'editTodoInput',
          value: todo.text,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Edit todo',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            this.todoService.editTodo(todo, todoText, todo.deadline); // Add the missing 'deadline' argument
            this.presentToast('Todo is edited');
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
