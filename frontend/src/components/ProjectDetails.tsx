import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  ProjectDetail,
  Task,
  ScheduleRequest,
  ScheduleResponse,
  ScheduledTask,
} from '../types';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [showScheduler, setShowScheduler] = useState<boolean>(false);
  const [scheduleHours, setScheduleHours] = useState<number>(40);
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [scheduling, setScheduling] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await api.get<ProjectDetail>(`/projects/${id}`);
      setProject(response.data);
    } catch (err) {
      // better to show a user-friendly message and redirect
      alert('Failed to fetch project. Redirecting to dashboard.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = (task: Task) => {
    if (!project) return;
    setProject({
      ...project,
      tasks: [...(project.tasks ?? []), task],
    });
    setShowTaskForm(false);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    if (!project) return;
    setProject({
      ...project,
      tasks: (project.tasks ?? []).map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    });
  };

  const handleTaskDeleted = (taskId: number) => {
    if (!project) return;
    setProject({
      ...project,
      tasks: (project.tasks ?? []).filter((t) => t.id !== taskId),
    });
  };

  const handleGenerateSchedule = async () => {
    if (!id) return;
    setScheduling(true);
    setSchedule(null);
    try {
      const request: ScheduleRequest = {
        totalHoursAvailable: scheduleHours,
        startDate: new Date().toISOString().split('T')[0],
      };
      const response = await api.post<ScheduleResponse>(`/projects/${id}/schedule`, request);
      setSchedule(response.data);
      setShowScheduler(true);
    } catch (err) {
      alert('Failed to generate schedule');
    } finally {
      setScheduling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return 'text-red-600';
    if (priority >= 4) return 'text-orange-600';
    if (priority >= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-2xl font-semibold mb-2">{project.title}</h1>
        <p className="text-sm text-gray-600 mb-3">{project.description ?? 'No description'}</p>
        <p className="text-xs text-gray-500">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Tasks</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowScheduler((s) => !s)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {showScheduler ? 'Hide Scheduler' : 'Smart Scheduler'}
            </button>

            <button
              onClick={() => setShowTaskForm((s) => !s)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {showTaskForm ? 'Cancel' : 'Add Task'}
            </button>
          </div>
        </div>

        {showScheduler && (
          <div className="mb-6 border p-4 rounded">
            <h3 className="font-semibold mb-3">Generate Work Schedule</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mb-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Total Hours Available</label>
                <input
                  type="number"
                  min={1}
                  max={168}
                  value={scheduleHours}
                  onChange={(e) => {
                    const val = parseInt(e.target.value || '0', 10);
                    setScheduleHours(Number.isNaN(val) ? 0 : val);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="md:col-span-2 flex gap-2">
                <button
                  onClick={handleGenerateSchedule}
                  disabled={scheduling}
                  className={`px-4 py-2 rounded-md text-white ${scheduling ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {scheduling ? 'Generating...' : 'Generate Schedule'}
                </button>
                <button
                  onClick={() => {
                    setSchedule(null);
                  }}
                  className="px-4 py-2 rounded-md border"
                >
                  Clear
                </button>
              </div>
            </div>

            {schedule ? (
              <div className="mt-4">
                <div className="mb-2 text-green-700 font-medium">{schedule.message}</div>

                <div className="space-y-3">
                  {(schedule.scheduledTasks ?? []).map((st: ScheduledTask, idx: number) => (
                    <div key={idx} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{st.taskTitle}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(st.suggestedStartDate).toLocaleString()} - {new Date(st.suggestedEndDate).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm">
                          Estimated: {st.estimatedHours}h
                          <div className={`mt-1 ${getPriorityColor(st.priority)}`}>Priority: {st.priority}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  Total: {schedule.totalTasksScheduled} tasks scheduled, {schedule.totalHoursAllocated} hours allocated
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mt-2">No schedule generated yet.</div>
            )}
          </div>
        )}

        {showTaskForm && project && (
          <div className="mb-6">
            <TaskForm
              projectId={project.id}
              onTaskCreated={handleTaskCreated}
              onCancel={() => setShowTaskForm(false)}
            />
          </div>
        )}

        <div>
          <TaskList
            tasks={project.tasks ?? []}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
