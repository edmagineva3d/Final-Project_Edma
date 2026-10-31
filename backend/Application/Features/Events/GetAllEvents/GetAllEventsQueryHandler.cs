namespace Application.Features.Events.GetAllEvents;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllEventsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllEventsQuery, Result<List<EventDetailDto>>>
{
    public async Task<Result<List<EventDetailDto>>> HandleAsync(
        GetAllEventsQuery query,
        CancellationToken cancellationToken = default)
    {
        var events = await dbContext.Events
            .AsNoTracking()
            .OrderByDescending(e => e.CreatedAt)
            .Select(e => new EventDetailDto(
                e.Id,
                e.Title,
                e.OrganizerName,
                e.OrganizerEmail,
                e.StartDate,
                e.EndDate,
                e.EstimatedAttendees,
                e.Notes,
                e.CreatedAt
            ))
            .ToListAsync(cancellationToken);

        return Result<List<EventDetailDto>>.Success(events);
    }
}

