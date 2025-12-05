import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskColumn } from '../../models/task.model';

export interface TaskFormData {
  taskId: string;
  title: string;
  description: string;
  column: TaskColumn;
}

@Component({
  selector: 'app-task-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModalComponent {
  @Input() isOpen: boolean = false;
  @Input() selectedColumn: TaskColumn = TaskColumn.TODO;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitTask = new EventEmitter<TaskFormData>();

  taskForm: TaskFormData = {
    taskId: '',
    title: '',
    description: '',
    column: TaskColumn.TODO,
  };

  columns = [
    { id: TaskColumn.TODO, label: 'To Do' },
    { id: TaskColumn.IN_PROGRESS, label: 'In Progress' },
    { id: TaskColumn.NEED_REVIEW, label: 'Need Review' },
    { id: TaskColumn.COMPLETED, label: 'Completed' },
  ];

  ngOnChanges(): void {
    if (this.isOpen) {
      this.taskForm.column = this.selectedColumn;
    }
  }

  /**
   * Handle modal close
   */
  onClose(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitTask.emit({ ...this.taskForm });
      this.resetForm();
    }
  }

  /**
   * Check if form is valid
   */
  isFormValid(): boolean {
    return !!(
      this.taskForm.taskId.trim() &&
      this.taskForm.title.trim() &&
      this.taskForm.description.trim()
    );
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    this.taskForm = {
      taskId: '',
      title: '',
      description: '',
      column: this.selectedColumn,
    };
  }

  /**
   * Handle backdrop click
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
