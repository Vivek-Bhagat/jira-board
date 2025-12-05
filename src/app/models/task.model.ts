export interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  column: TaskColumn;
  createdAt: Date;
}

export enum TaskColumn {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  NEED_REVIEW = 'needReview',
  COMPLETED = 'completed',
}

export interface ColumnConfig {
  id: TaskColumn;
  title: string;
  tasks: Task[];
}
