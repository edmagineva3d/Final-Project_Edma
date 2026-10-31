namespace Application.Features.Events.GetEventById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetEventByIdQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetEventByIdQuery, Result<EventDetailDto>>
{
    public async Task<Result<EventDetailDto>> HandleAsync(
        GetEventByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var ev = await dbContext.Events
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == query.Id, cancellationToken);

        if (ev is null)
        {
            return Result<EventDetailDto>.Failure(new Error("Event.NotFound", $"Event with ID '{query.Id}' was not found."));
        }

        var dto = new EventDetailDto(
            ev.Id,
            ev.Title,
            ev.OrganizerName,
            ev.OrganizerEmail,
            ev.StartDate,
            ev.EndDate,
            ev.EstimatedAttendees,
            ev.Notes,
            ev.CreatedAt
        );

        return Result<EventDetailDto>.Success(dto);
    }
}

