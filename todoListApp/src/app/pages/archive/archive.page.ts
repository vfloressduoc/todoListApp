import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks.filter(task => task.is_completed);
    });
  }
}
