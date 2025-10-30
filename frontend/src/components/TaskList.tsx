import React, { useState } from 'react';
import api from '../services/api';
import { Task, UpdateTaskRequest } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<UpdateTaskRequest>({
    title: '',
    dueDate: '',
    isCompleted: false,
  });

  const handleToggleComplete = async (task: Task) => {
    try {
      const response = await api.put<Task>(`/tasks/${task.id}`, {
        title: task.title,
        dueDate: task.dueDate,
        isCompleted: !task.isCompleted,
      });
      onTaskUpdated(response.data);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditForm({
      title: task.title,
      dueDate: task.dueDate ?? '',
      isCompleted: task.isCompleted,
    });
  };

  const handleSaveEdit = async (taskId: number) => {
    try {
      const payload: UpdateTaskRequest = {
        ...editForm,
        dueDate: editForm.dueDate ? editForm.dueDate : undefined,
      };
      const response = await api.put<Task>(`/tasks/${taskId}`, payload);
      onTaskUpdated(response.data);
      setEditingId(null);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      onTaskDeleted(taskId);
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-gray-600 text-center p-4 bg-white rounded shadow">
        No tasks yet. Add your first task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
        >
          {editingId === task.id ? (
            <div className="flex-1 flex flex-col md:flex-row gap-3">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={editForm.dueDate}
                onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleComplete(task)}
                  className="mt-1 h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <div>
                  <div
                    className={`font-medium ${
                      task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </div>
                  <div className="text-sm text-gray-600">Due: {formatDate(task.dueDate)}</div>
                </div>
              </div>

              <div className="flex gap-3 mt-3 md:mt-0">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
