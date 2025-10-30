import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { authService } from '../services/auth';
import ProjectForm from './ProjectForm';
import { Project } from '../types';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get<Project[]>('/projects');
      setProjects(response.data ?? []);
    } catch (err: any) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleProjectCreated = (project: Project) => {
    setProjects(prev => [project, ...prev]);
    setShowForm(false);
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(prev => prev.filter((p) => p.id !== projectId));
    } catch (err: any) {
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Project Manager</h1>
          <p className="text-sm text-gray-600">
            Welcome{user?.name ? `, ${user.name}` : ''} — manage your projects here.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {showForm ? 'Cancel' : 'New Project'}
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div role="alert" className="mb-4 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6">
          <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>
      )}

      <section>
        <h2 className="text-lg font-medium mb-4">My Projects</h2>

        {projects.length === 0 ? (
          <div className="p-6 bg-white rounded shadow text-center text-gray-600">
            No projects yet. Create your first project to get started!
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold">{project.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{project.description ?? 'No description'}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {typeof project.completedTaskCount === 'number' && typeof project.taskCount === 'number'
                      ? `${project.completedTaskCount} / ${project.taskCount} tasks completed`
                      : ''}
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex gap-2">
                  <button
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
