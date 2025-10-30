// using System.ComponentModel.DataAnnotations;

// namespace ProjectManager.Models;

// public class User
// {
//     public int Id { get; set; }
    
//     [Required]
//     [EmailAddress]
//     public string Email { get; set; } = string.Empty;
    
//     [Required]
//     public string PasswordHash { get; set; } = string.Empty;
    
//     [Required]
//     [StringLength(100)]
//     public string Name { get; set; } = string.Empty;
    
//     public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
//     public ICollection Projects { get; set; } = new List();
// }




using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Models;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Project> Projects { get; set; } = new List<Project>();
}