export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  taskCount: number;
  completedTaskCount: number;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  projectId: number;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
}

export interface UpdateProjectRequest {
  title: string;
  description?: string;
}

export interface CreateTaskRequest {
  title: string;
  dueDate?: string;
  projectId: number;
}

export interface UpdateTaskRequest {
  title: string;
  dueDate?: string;
  isCompleted: boolean;
}

export interface ScheduleRequest {
  totalHoursAvailable: number;
  startDate?: string;
}

export interface ScheduledTask {
  taskId: number;
  taskTitle: string;
  suggestedStartDate: string;
  suggestedEndDate: string;
  estimatedHours: number;
  priority: number;
}

export interface ScheduleResponse {
  scheduledTasks: ScheduledTask[];
  totalTasksScheduled: number;
  totalHoursAllocated: number;
  message: string;
}
