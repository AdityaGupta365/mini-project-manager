using ProjectManager.DTOs;

namespace ProjectManager.Services;

public interface IAuthService
{
    Task<AuthResponseDTO?> RegisterAsync(RegisterDTO dto);
    Task<AuthResponseDTO?> LoginAsync(LoginDTO dto);
    string GenerateJwtToken(int userId, string email);
}