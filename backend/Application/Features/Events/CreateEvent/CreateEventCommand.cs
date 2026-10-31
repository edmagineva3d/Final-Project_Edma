namespace Application.Features.Events.CreateEvent;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record CreateEventCommand(
    string Title,
    string OrganizerName,
    string OrganizerEmail,
    DateTime StartDate,
    DateTime EndDate,
    int EstimatedAttendees,
    string? Notes
) : ICommand<Result<EventDetailDto>>;

public sealed record EventDetailDto(
    Guid Id,
    string Title,
    string OrganizerName,
    string OrganizerEmail,
    DateTime StartDate,
    DateTime EndDate,
    int EstimatedAttendees,
    string? Notes,
    DateTime CreatedAt
);

