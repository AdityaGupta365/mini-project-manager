// using System.ComponentModel.DataAnnotations;

// namespace ProjectManager.DTOs;

// public class CreateTaskDTO
// {
//     [Required]
//     [StringLength(200)]
//     public string Title { get; set; } = string.Empty;
    
//     public DateTime? DueDate { get; set; }
    
//     [Required]
//     public int ProjectId { get; set; }
// }

// public class UpdateTaskDTO
// {
//     [Required]
//     [StringLength(200)]
//     public string Title { get; set; } = string.Empty;
    
//     public DateTime? DueDate { get; set; }
    
//     public bool IsCompleted { get; set; }
// }

// public class TaskDTO
// {
//     public int Id { get; set; }
//     public string Title { get; set; } = string.Empty;
//     public DateTime? DueDate { get; set; }
//     public bool IsCompleted { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public int ProjectId { get; set; }
// }

// public class ScheduleRequestDTO
// {
//     [Required]
//     public int TotalHoursAvailable { get; set; }
    
//     public DateTime? StartDate { get; set; }
// }

// public class ScheduledTaskDTO
// {
//     public int TaskId { get; set; }
//     public string TaskTitle { get; set; } = string.Empty;
//     public DateTime SuggestedStartDate { get; set; }
//     public DateTime SuggestedEndDate { get; set; }
//     public int EstimatedHours { get; set; }
//     public int Priority { get; set; }
// }

// public class ScheduleResponseDTO
// {
//     public List ScheduledTasks { get; set; } = new();
//     public int TotalTasksScheduled { get; set; }
//     public int TotalHoursAllocated { get; set; }
//     public string Message { get; set; } = string.Empty;
// }



using System.ComponentModel.DataAnnotations;

namespace ProjectManager.DTOs;

public class CreateTaskDTO
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    [Required]
    public int ProjectId { get; set; }
}

public class UpdateTaskDTO
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    public bool IsCompleted { get; set; }
}

public class TaskDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ProjectId { get; set; }
}

public class ScheduleRequestDTO
{
    [Required]
    public int TotalHoursAvailable { get; set; }
    
    public DateTime? StartDate { get; set; }
}

public class ScheduledTaskDTO
{
    public int TaskId { get; set; }
    public string TaskTitle { get; set; } = string.Empty;
    public DateTime SuggestedStartDate { get; set; }
    public DateTime SuggestedEndDate { get; set; }
    public int EstimatedHours { get; set; }
    public int Priority { get; set; }
}

public class ScheduleResponseDTO
{
    public List<ScheduledTaskDTO> ScheduledTasks { get; set; } = new();
    public int TotalTasksScheduled { get; set; }
    public int TotalHoursAllocated { get; set; }
    public string Message { get; set; } = string.Empty;
}