import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Column, Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [CommonModule, DragDropModule, TaskCardComponent, AddTaskModalComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
})
export class BoardComponent {
    columns: Signal<Column[]>;
    showAddModal = false;

    constructor(
        private taskService: TaskService,
        private authService: AuthService
    ) {
        this.columns = this.taskService.columns;
    }

    drop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            // Reordering within the same column is visual only for this demo unless we strictly store indices
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            // Moving to another column
            const task = event.previousContainer.data[event.previousIndex];
            const targetStatus = event.container.id as TaskStatus;

            this.taskService.updateTaskStatus(task.id, targetStatus);
        }
    }

    onSaveTask(task: Task) {
        this.taskService.addTask(task);
    }

    logout() {
        this.authService.logout();
    }
}
