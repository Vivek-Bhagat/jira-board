import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskColumn, ColumnConfig } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'jira_board_tasks';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private columnsSubject = new BehaviorSubject<ColumnConfig[]>(this.initializeColumns());
  public columns$: Observable<ColumnConfig[]> = this.columnsSubject.asObservable();

  constructor() {
    if (this.isBrowser) {
      this.loadTasksFromStorage();
    }
  }

  /**
   * Initialize the board columns
   */
  private initializeColumns(): ColumnConfig[] {
    return [
      { id: TaskColumn.TODO, title: 'To Do', tasks: [] },
      { id: TaskColumn.IN_PROGRESS, title: 'In Progress', tasks: [] },
      { id: TaskColumn.NEED_REVIEW, title: 'Need Review', tasks: [] },
      { id: TaskColumn.COMPLETED, title: 'Completed', tasks: [] },
    ];
  }

  /**
   * Load tasks from localStorage
   */
  private loadTasksFromStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const columns: ColumnConfig[] = JSON.parse(storedData);
        // Convert date strings back to Date objects
        columns.forEach((column) => {
          column.tasks.forEach((task) => {
            task.createdAt = new Date(task.createdAt);
          });
        });
        this.columnsSubject.next(columns);
      } catch (error) {
        console.error('Error loading tasks from storage:', error);
      }
    }
  }

  /**
   * Save tasks to localStorage
   */
  private saveTasksToStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    const columns = this.columnsSubject.value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(columns));
  }

  /**
   * Get all columns
   */
  getColumns(): ColumnConfig[] {
    return this.columnsSubject.value;
  }

  /**
   * Add a new task
   * @param task - The task to add
   */
  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const columns = [...this.columnsSubject.value];
    const columnIndex = columns.findIndex((col) => col.id === task.column);

    if (columnIndex !== -1) {
      const newTask: Task = {
        ...task,
        id: this.generateId(),
        createdAt: new Date(),
      };

      columns[columnIndex] = {
        ...columns[columnIndex],
        tasks: [...columns[columnIndex].tasks, newTask],
      };

      this.columnsSubject.next(columns);
      this.saveTasksToStorage();
    }
  }

  /**
   * Move task from one column to another
   * @param taskId - ID of the task to move
   * @param fromColumn - Source column
   * @param toColumn - Destination column
   * @param newIndex - New index in destination column
   */
  moveTask(taskId: string, fromColumn: TaskColumn, toColumn: TaskColumn, newIndex: number): void {
    const columns = [...this.columnsSubject.value];
    const fromColumnIndex = columns.findIndex((col) => col.id === fromColumn);
    const toColumnIndex = columns.findIndex((col) => col.id === toColumn);

    if (fromColumnIndex !== -1 && toColumnIndex !== -1) {
      const taskIndex = columns[fromColumnIndex].tasks.findIndex((t) => t.id === taskId);

      if (taskIndex !== -1) {
        const task = { ...columns[fromColumnIndex].tasks[taskIndex], column: toColumn };

        // Remove from source column
        columns[fromColumnIndex] = {
          ...columns[fromColumnIndex],
          tasks: columns[fromColumnIndex].tasks.filter((t) => t.id !== taskId),
        };

        // Add to destination column
        const newTasks = [...columns[toColumnIndex].tasks];
        newTasks.splice(newIndex, 0, task);
        columns[toColumnIndex] = {
          ...columns[toColumnIndex],
          tasks: newTasks,
        };

        this.columnsSubject.next(columns);
        this.saveTasksToStorage();
      }
    }
  }

  /**
   * Reorder task within the same column
   * @param taskId - ID of the task to reorder
   * @param column - Column containing the task
   * @param newIndex - New index in the column
   */
  reorderTask(taskId: string, column: TaskColumn, newIndex: number): void {
    const columns = [...this.columnsSubject.value];
    const columnIndex = columns.findIndex((col) => col.id === column);

    if (columnIndex !== -1) {
      const taskIndex = columns[columnIndex].tasks.findIndex((t) => t.id === taskId);

      if (taskIndex !== -1) {
        const tasks = [...columns[columnIndex].tasks];
        const [task] = tasks.splice(taskIndex, 1);
        tasks.splice(newIndex, 0, task);

        columns[columnIndex] = {
          ...columns[columnIndex],
          tasks,
        };

        this.columnsSubject.next(columns);
        this.saveTasksToStorage();
      }
    }
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clear all tasks (useful for testing)
   */
  clearAllTasks(): void {
    this.columnsSubject.next(this.initializeColumns());
    this.saveTasksToStorage();
  }
}
