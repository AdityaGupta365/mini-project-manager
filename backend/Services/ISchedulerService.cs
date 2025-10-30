using ProjectManager.DTOs;

namespace ProjectManager.Services;

public interface ISchedulerService
{
    Task<ScheduleResponseDTO> GenerateScheduleAsync(int projectId, ScheduleRequestDTO request);
}