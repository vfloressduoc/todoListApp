import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss'],
})
export class WeekPage implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks.filter(task => !task.is_completed && this.isDueThisWeek(task.deadline));
    });
  }

  isDueThisWeek(deadline: Date | null): boolean {
    if (!deadline) {
      return false;
    }
    const now = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    return new Date(deadline) <= endOfWeek;
  }

  toggleCompletion(task: Task) {
    task.is_completed = !task.is_completed;
    this.taskService.updateTask(task).subscribe();
  }
}
