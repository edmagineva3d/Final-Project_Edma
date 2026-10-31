namespace Application.Features.Events.UpdateEvent;

using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;

public sealed record UpdateEventCommand(
    Guid Id,
    string Title,
    string OrganizerName,
    string OrganizerEmail,
    DateTime StartDate,
    DateTime EndDate,
    int EstimatedAttendees,
    string? Notes
) : ICommand<Result<EventDetailDto>>;
