import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage {
  todos: Task[] = [];
  reorderIsEnabled = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.todos = tasks;
      },
      (error) => {
        console.error('Error al cargar tareas:', error);
        this.presentToast('Error al cargar tareas');
      }
    );
  }

  markAsDone(taskId: number) {
    const task = this.todos.find(t => t.id === taskId);
    if (task) {
      task.is_completed = true;
      this.taskService.updateTask(task).subscribe(
        () => {
          this.presentToast('¡Tarea marcada como completa!');
        },
        (error) => {
          console.error('Error al marcar tarea como completa:', error);
          this.presentToast('Error al marcar tarea como completa');
        }
      );
    }
  }

  editTodo(taskId: number) {
    const task = this.todos.find(t => t.id === taskId);
    if (task) {
      this.presentEditTodoAlert(task.name, task.deadline, task.id!);
    }
  }

  async presentEditTodoAlert(todoText: string, deadline: Date | null, taskId: number) {
    const formattedDeadline = deadline ? new Date(deadline.getTime() - (deadline.getTimezoneOffset() * 60000)).toISOString().substring(0, 10) : null;

    const editTodoAlert = await this.alertController.create({
      header: 'Edita tu tarea',
      message: 'Cambia la tarea y la fecha límite',
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
          text: 'Editar tarea',
          handler: (inputData) => {
            const todoText = inputData.editTodoInput;
            const newDeadline = inputData.editTodoDeadline ? new Date(inputData.editTodoDeadline + 'T00:00:00') : null;
            const updatedTask: Task = {
              id: taskId,
              name: todoText,
              description: '', 
              is_completed: false, 
              deadline: newDeadline,
              created_at: new Date(), 
            };
            this.taskService.updateTask(updatedTask).subscribe(
              () => {
                this.presentToast('¡Tarea editada!');
                this.loadTasks(); 
              },
              (error) => {
                this.presentToast('Error al editar la tarea.');
                console.error(error);
              }
            );
          },
        },
      ],
    });

    await editTodoAlert.present();
  }

  deleteTodo(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.todos = this.todos.filter(t => t.id !== taskId);
        this.presentToast('¡Tarea eliminada!');
      },
      (error) => {
        console.error('Error al eliminar tarea:', error);
        this.presentToast('Error al eliminar tarea');
      }
    );
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
      header: 'Agregar una tarea',
      message: 'Ingresa tu tarea',
      inputs: [
        {
          type: 'text',
          name: 'addTodoInput',
          placeholder: 'Cosas por hacer',
        },
        {
          type: 'date',
          name: 'addTodoDeadline',
          min: new Date().toISOString(),
        },
      ],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Agregar tarea',
          handler: (inputData) => {
            const todoText = inputData.addTodoInput;
            const deadlineString = inputData.addTodoDeadline;
            const deadline = deadlineString ? new Date(deadlineString + 'T00:00:00') : null;
            const newTask: Task = {
              name: todoText,
              description: '', 
              is_completed: false, 
              deadline: deadline,
              created_at: new Date(), 
            };
            this.taskService.addTask(newTask).subscribe(
              () => {
                this.presentToast('Tarea agregada');
                this.loadTasks(); 
              },
              (error) => {
                this.presentToast('Error al agregar la tarea.');
                console.error(error);
              }
            );
          },
        },
      ],
    });

    await addTodoAlert.present();
  }

  formatDeadline(deadline: Date | null): string {
    if (!deadline) return '';
    const formattedDate = new Date(deadline);
    return formattedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
