using Microsoft.EntityFrameworkCore;
using ProjectManager.Data;
using ProjectManager.DTOs;

namespace ProjectManager.Services;

public class SchedulerService : ISchedulerService
{
    private readonly AppDbContext _context;

    public SchedulerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ScheduleResponseDTO> GenerateScheduleAsync(int projectId, ScheduleRequestDTO request)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project == null)
        {
            return new ScheduleResponseDTO
            {
                Message = "Project not found"
            };
        }

        var incompleteTasks = project.Tasks.Where(t => !t.IsCompleted).ToList();

        if (!incompleteTasks.Any())
        {
            return new ScheduleResponseDTO
            {
                Message = "All tasks are already completed"
            };
        }

        // Sort tasks by due date (tasks with due dates first, then by creation date)
        var sortedTasks = incompleteTasks
            .OrderBy(t => t.DueDate.HasValue ? 0 : 1)
            .ThenBy(t => t.DueDate)
            .ThenBy(t => t.CreatedAt)
            .ToList();

        var startDate = request.StartDate ?? DateTime.UtcNow.Date;
        var scheduledTasks = new List<ScheduledTaskDTO>();
        var currentDate = startDate;
        var hoursRemaining = request.TotalHoursAvailable;
        var hoursPerTask = Math.Max(1, request.TotalHoursAvailable / sortedTasks.Count);

        for (int i = 0; i < sortedTasks.Count && hoursRemaining > 0; i++)
        {
            var task = sortedTasks[i];
            var estimatedHours = Math.Min(hoursPerTask, hoursRemaining);
            
            // Calculate priority (1-5, based on due date and position)
            int priority = 3; // default
            if (task.DueDate.HasValue)
            {
                var daysUntilDue = (task.DueDate.Value - currentDate).TotalDays;
                if (daysUntilDue < 3) priority = 5;
                else if (daysUntilDue < 7) priority = 4;
                else if (daysUntilDue < 14) priority = 3;
                else priority = 2;
            }

            var endDate = currentDate.AddHours(estimatedHours);

            scheduledTasks.Add(new ScheduledTaskDTO
            {
                TaskId = task.Id,
                TaskTitle = task.Title,
                SuggestedStartDate = currentDate,
                SuggestedEndDate = endDate,
                EstimatedHours = estimatedHours,
                Priority = priority
            });

            currentDate = endDate;
            hoursRemaining -= estimatedHours;
        }

        return new ScheduleResponseDTO
        {
            ScheduledTasks = scheduledTasks,
            TotalTasksScheduled = scheduledTasks.Count,
            TotalHoursAllocated = request.TotalHoursAvailable - hoursRemaining,
            Message = scheduledTasks.Count < sortedTasks.Count 
                ? $"Scheduled {scheduledTasks.Count} out of {sortedTasks.Count} tasks. Increase available hours to schedule remaining tasks."
                : "All incomplete tasks have been scheduled successfully."
        };
    }
}

