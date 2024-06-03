import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-archived-todos',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage {
  archivedTodos: any[] = [];

  constructor(private navCtrl: NavController, private todoService: TodoService) {}

  ionViewWillEnter() {
    this.archivedTodos = this.todoService.getArchivedTodos();
  }

  formatDeadline(deadline: Date): string {
    if (!deadline) return '';
    const formattedDate = new Date(deadline);
    return formattedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
