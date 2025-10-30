// using System.ComponentModel.DataAnnotations;

// namespace ProjectManager.DTOs;

// public class CreateProjectDTO
// {
//     [Required]
//     [StringLength(100, MinimumLength = 3)]
//     public string Title { get; set; } = string.Empty;
    
//     [StringLength(500)]
//     public string? Description { get; set; }
// }

// public class UpdateProjectDTO
// {
//     [Required]
//     [StringLength(100, MinimumLength = 3)]
//     public string Title { get; set; } = string.Empty;
    
//     [StringLength(500)]
//     public string? Description { get; set; }
// }

// public class ProjectDTO
// {
//     public int Id { get; set; }
//     public string Title { get; set; } = string.Empty;
//     public string? Description { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public int TaskCount { get; set; }
//     public int CompletedTaskCount { get; set; }
// }

// public class ProjectDetailDTO
// {
//     public int Id { get; set; }
//     public string Title { get; set; } = string.Empty;
//     public string? Description { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public List Tasks { get; set; } = new();
// }



using System.ComponentModel.DataAnnotations;

namespace ProjectManager.DTOs;

public class CreateProjectDTO
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Description { get; set; }
}

public class UpdateProjectDTO
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Description { get; set; }
}

public class ProjectDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public int TaskCount { get; set; }
    public int CompletedTaskCount { get; set; }
}

public class ProjectDetailDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<TaskDTO> Tasks { get; set; } = new();
}