// using System.Security.Claims;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using ProjectManager.Data;
// using ProjectManager.DTOs;
// using ProjectManager.Models;

// namespace ProjectManager.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// [Authorize]
// public class TasksController : ControllerBase
// {
//     private readonly AppDbContext _context;

//     public TasksController(AppDbContext context)
//     {
//         _context = context;
//     }

//     private int GetUserId()
//     {
//         return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
//     }

//     [HttpPost]
//     public async Task<ActionResult> CreateTask([FromBody] CreateTaskDTO dto)
//     {
//         var userId = GetUserId();

//         var project = await _context.Projects
//             .FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.UserId == userId);

//         if (project == null)
//         {
//             return NotFound(new { message = "Project not found" });
//         }

//         var task = new ProjectTask
//         {
//             Title = dto.Title,
//             DueDate = dto.DueDate,
//             ProjectId = dto.ProjectId
//         };

//         _context.Tasks.Add(task);
//         await _context.SaveChangesAsync();

//         var taskDto = new TaskDTO
//         {
//             Id = task.Id,
//             Title = task.Title,
//             DueDate = task.DueDate,
//             IsCompleted = task.IsCompleted,
//             CreatedAt = task.CreatedAt,
//             ProjectId = task.ProjectId
//         };

//         return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDto);
//     }

//     [HttpGet("{id}")]
//     public async Task<ActionResult> GetTask(int id)
//     {
//         var userId = GetUserId();

//         var task = await _context.Tasks
//             .Include(t => t.Project)
//             .Where(t => t.Id == id && t.Project.UserId == userId)
//             .Select(t => new TaskDTO
//             {
//                 Id = t.Id,
//                 Title = t.Title,
//                 DueDate = t.DueDate,
//                 IsCompleted = t.IsCompleted,
//                 CreatedAt = t.CreatedAt,
//                 ProjectId = t.ProjectId
//             })
//             .FirstOrDefaultAsync();

//         if (task == null)
//         {
//             return NotFound(new { message = "Task not found" });
//         }

//         return Ok(task);
//     }

//     [HttpPut("{id}")]
//     public async Task<ActionResult> UpdateTask(int id, [FromBody] UpdateTaskDTO dto)
//     {
//         var userId = GetUserId();

//         var task = await _context.Tasks
//             .Include(t => t.Project)
//             .FirstOrDefaultAsync(t => t.Id == id && t.Project.UserId == userId);

//         if (task == null)
//         {
//             return NotFound(new { message = "Task not found" });
//         }

//         task.Title = dto.Title;
//         task.DueDate = dto.DueDate;
//         task.IsCompleted = dto.IsCompleted;

//         await _context.SaveChangesAsync();

//         var taskDto = new TaskDTO
//         {
//             Id = task.Id,
//             Title = task.Title,
//             DueDate = task.DueDate,
//             IsCompleted = task.IsCompleted,
//             CreatedAt = task.CreatedAt,
//             ProjectId = task.ProjectId
//         };

//         return Ok(taskDto);
//     }

//     [HttpDelete("{id}")]
//     public async Task DeleteTask(int id)
//     {
//         var userId = GetUserId();

//         var task = await _context.Tasks
//             .Include(t => t.Project)
//             .FirstOrDefaultAsync(t => t.Id == id && t.Project.UserId == userId);

//         if (task == null)
//         {
//             return NotFound(new { message = "Task not found" });
//         }

//         _context.Tasks.Remove(task);
//         await _context.SaveChangesAsync();

//         return NoContent();
//     }
// }

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Data;
using ProjectManager.DTOs;
using ProjectManager.Models;

namespace ProjectManager.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    }

    [HttpPost]
    public async Task<ActionResult<TaskDTO>> CreateTask([FromBody] CreateTaskDTO dto)
    {
        var userId = GetUserId();

        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.UserId == userId);

        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        var task = new ProjectTask
        {
            Title = dto.Title,
            DueDate = dto.DueDate,
            ProjectId = dto.ProjectId
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        var taskDto = new TaskDTO
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDTO>> GetTask(int id)
    {
        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .Where(t => t.Id == id && t.Project.UserId == userId)
            .Select(t => new TaskDTO
            {
                Id = t.Id,
                Title = t.Title,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                ProjectId = t.ProjectId
            })
            .FirstOrDefaultAsync();

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        return Ok(task);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDTO>> UpdateTask(int id, [FromBody] UpdateTaskDTO dto)
    {
        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == id && t.Project.UserId == userId);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        task.Title = dto.Title;
        task.DueDate = dto.DueDate;
        task.IsCompleted = dto.IsCompleted;

        await _context.SaveChangesAsync();

        var taskDto = new TaskDTO
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };

        return Ok(taskDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == id && t.Project.UserId == userId);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}