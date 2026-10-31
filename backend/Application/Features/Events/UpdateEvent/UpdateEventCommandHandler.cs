namespace Application.Features.Events.UpdateEvent;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

public sealed class UpdateEventCommandHandler(
    IAppDbContext dbContext,
    IValidator<UpdateEventCommand> validator)
    : ICommandHandler<UpdateEventCommand, Result<EventDetailDto>>
{
    public async Task<Result<EventDetailDto>> HandleAsync(
        UpdateEventCommand command,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            var firstError = validationResult.Errors[0];
            return Result<EventDetailDto>.Failure(new Error("Event.Validation", firstError.ErrorMessage));
        }

        var ev = await dbContext.Events.FirstOrDefaultAsync(e => e.Id == command.Id, cancellationToken);
        if (ev is null)
        {
            return Result<EventDetailDto>.Failure(new Error("Event.NotFound", $"Event with ID '{command.Id}' was not found."));
        }

        ev.Title = command.Title.Trim();
        ev.OrganizerName = command.OrganizerName.Trim();
        ev.OrganizerEmail = command.OrganizerEmail.Trim();
        ev.StartDate = command.StartDate;
        ev.EndDate = command.EndDate;
        ev.EstimatedAttendees = command.EstimatedAttendees;
        ev.Notes = command.Notes?.Trim();

        await dbContext.SaveChangesAsync(cancellationToken);

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

