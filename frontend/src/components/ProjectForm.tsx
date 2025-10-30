import React, { useState } from 'react';
import api from '../services/api';
import { Project, CreateProjectRequest } from '../types';

interface ProjectFormProps {
  onProjectCreated: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // POST /projects with typed payload
      const response = await api.post<Project>('/projects', formData);
      onProjectCreated(response.data);
      setFormData({ title: '', description: '' });
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? 'Failed to create project';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

      {error && (
        <div role="alert" className="mb-4 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
