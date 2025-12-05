import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';
import { TaskModalComponent, TaskFormData } from '../task-modal/task-modal';
import { ColumnConfig, TaskColumn } from '../../models/task.model';

@Component({
  selector: 'app-board',
  imports: [CommonModule, DragDropModule, TaskModalComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class BoardComponent implements OnInit, OnDestroy {
  columns: ColumnConfig[] = [];
  isModalOpen: boolean = false;
  selectedColumn: TaskColumn = TaskColumn.TODO;

  private subscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.taskService.columns$.subscribe((columns) => {
        this.columns = columns;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Open modal to add a new task
   */
  openAddTaskModal(column: TaskColumn): void {
    this.selectedColumn = column;
    this.isModalOpen = true;
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.isModalOpen = false;
  }

  /**
   * Handle task submission from modal
   */
  onTaskSubmit(taskData: TaskFormData): void {
    this.taskService.addTask(taskData);
    this.isModalOpen = false;
  }

  /**
   * Handle drag and drop event
   */
  onDrop(event: CdkDragDrop<any[]>, targetColumn: TaskColumn): void {
    const sourceColumn = event.previousContainer.data[0] as TaskColumn;
    const taskId = event.item.data;

    if (event.previousContainer === event.container) {
      // Reorder within the same column
      this.taskService.reorderTask(taskId, targetColumn, event.currentIndex);
    } else {
      // Move to a different column
      this.taskService.moveTask(taskId, sourceColumn, targetColumn, event.currentIndex);
    }
  }

  /**
   * Get connected drop list IDs for drag and drop
   */
  getConnectedLists(): string[] {
    return this.columns.map((col) => col.id);
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Track by function for performance
   */
  trackByColumnId(index: number, column: ColumnConfig): string {
    return column.id;
  }

  /**
   * Track by function for tasks
   */
  trackByTaskId(index: number, task: any): string {
    return task.id;
  }
}
