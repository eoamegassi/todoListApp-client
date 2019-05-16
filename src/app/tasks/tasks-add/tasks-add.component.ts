import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.css']
})
export class TasksAddComponent implements OnInit {
  @Input() task: Task = {
    id: 0,
    name: '',
    dueDate: '',
    completed: false
  };

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  addTask(task) {
    this.taskService.createTask(task)
      .subscribe(
        (newTask: Task) => {
          this.taskService.onTaskAdded.emit(newTask);
        }
      );
  }
}
