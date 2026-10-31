namespace Domain.Entities;

using Domain.Common;

public sealed class ConferenceEvent : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string OrganizerName { get; set; } = string.Empty;
    public string OrganizerEmail { get; set; } = string.Empty;
    public DateTime StartDate { get; set; } = DateTime.UtcNow.AddDays(14);
    public DateTime EndDate { get; set; } = DateTime.UtcNow.AddDays(15);
    public int EstimatedAttendees { get; set; } = 50;
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

