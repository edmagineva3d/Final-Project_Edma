namespace Application.Features.Events.CreateEvent;

using FluentValidation;

public sealed class CreateEventValidator : AbstractValidator<CreateEventCommand>
{
    public CreateEventValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Event title is required.")
            .MaximumLength(200).WithMessage("Event title cannot exceed 200 characters.");

        RuleFor(x => x.OrganizerName)
            .NotEmpty().WithMessage("Organizer name is required.")
            .MaximumLength(150).WithMessage("Organizer name cannot exceed 150 characters.");

        RuleFor(x => x.OrganizerEmail)
            .NotEmpty().WithMessage("Organizer email is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.EstimatedAttendees)
            .GreaterThan(0).WithMessage("Estimated attendees must be at least 1.");

        RuleFor(x => x.EndDate)
            .GreaterThanOrEqualTo(x => x.StartDate).WithMessage("End date must be on or after start date.");
    }
}
