import {Component, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );

    this.taskService.onTaskAdded.subscribe(
      (task: Task) => this.tasks.push(task)
    );
  }

  onTaskChange(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }

}
