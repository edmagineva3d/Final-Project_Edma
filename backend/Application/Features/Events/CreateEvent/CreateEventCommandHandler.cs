namespace Application.Features.Events.CreateEvent;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;
using FluentValidation;

public sealed class CreateEventCommandHandler(
    IAppDbContext dbContext,
    IValidator<CreateEventCommand> validator)
    : ICommandHandler<CreateEventCommand, Result<EventDetailDto>>
{
    public async Task<Result<EventDetailDto>> HandleAsync(
        CreateEventCommand command,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            var firstError = validationResult.Errors[0];
            return Result<EventDetailDto>.Failure(new Error("Event.Validation", firstError.ErrorMessage));
        }

        var ev = new ConferenceEvent
        {
            Title = command.Title.Trim(),
            OrganizerName = command.OrganizerName.Trim(),
            OrganizerEmail = command.OrganizerEmail.Trim(),
            StartDate = command.StartDate,
            EndDate = command.EndDate,
            EstimatedAttendees = command.EstimatedAttendees,
            Notes = command.Notes?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        dbContext.Events.Add(ev);
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

