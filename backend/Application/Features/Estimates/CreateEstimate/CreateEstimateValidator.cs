namespace Application.Features.Estimates.CreateEstimate;

using FluentValidation;

public sealed class CreateEstimateValidator : AbstractValidator<CreateEstimateCommand>
{
    public CreateEstimateValidator()
    {
        RuleFor(x => x.ClientName)
            .NotEmpty().WithMessage("Client name is required.")
            .MaximumLength(150).WithMessage("Client name cannot exceed 150 characters.");

        RuleFor(x => x.ClientEmail)
            .NotEmpty().WithMessage("Client email is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.EventName)
            .NotEmpty().WithMessage("Event name is required.")
            .MaximumLength(200).WithMessage("Event name cannot exceed 200 characters.");

        RuleFor(x => x.NumberOfAttendees)
            .GreaterThan(0).WithMessage("Number of attendees must be at least 1.");

        RuleForEach(x => x.Rooms)
            .Must(r => r.Quantity >= 0).WithMessage("Room quantity cannot be negative.");

        RuleForEach(x => x.AddOns)
            .Must(a => a.Quantity >= 0).WithMessage("Add-on quantity cannot be negative.");

        RuleForEach(x => x.Meals)
            .Must(m => m.NumberOfPeople >= 0).WithMessage("Meal guest count cannot be negative.");
    }
}
