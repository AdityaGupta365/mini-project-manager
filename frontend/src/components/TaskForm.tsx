import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Task, CreateTaskRequest } from '../types';

interface TaskFormProps {
  projectId: number;
  onTaskCreated: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onTaskCreated, onCancel }) => {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: '',
    dueDate: '',
    projectId,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // keep projectId in sync if parent changes it
  useEffect(() => {
    setFormData((prev) => ({ ...prev, projectId }));
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload: CreateTaskRequest = {
        ...formData,
        dueDate: formData.dueDate || undefined,
      };

      const response = await api.post<Task>('/tasks', payload);
      onTaskCreated(response.data);

      // reset form (keep projectId)
      setFormData({ title: '', dueDate: '', projectId });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? 'Failed to create task';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-3">Add New Task</h3>

      {error && (
        <div role="alert" className="mb-3 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate ?? ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md text-white ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', dueDate: '', projectId }); // reset
              setError('');
              onCancel();
            }}
            className="flex-1 py-2 px-4 rounded-md border bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
