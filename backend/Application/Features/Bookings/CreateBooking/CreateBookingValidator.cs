namespace Application.Features.Bookings.CreateBooking;

using FluentValidation;

public sealed class CreateBookingValidator : AbstractValidator<CreateBookingCommand>
{
    public CreateBookingValidator()
    {
        RuleFor(x => x.ClientName)
            .NotEmpty().WithMessage("Client name is required.")
            .MaximumLength(150).WithMessage("Client name cannot exceed 150 characters.");

        RuleFor(x => x.ClientEmail)
            .NotEmpty().WithMessage("Client email is required.")
            .EmailAddress().WithMessage("A valid email address is required.")
            .MaximumLength(200).WithMessage("Client email cannot exceed 200 characters.");

        RuleFor(x => x.EventName)
            .NotEmpty().WithMessage("Event name is required.")
            .MaximumLength(200).WithMessage("Event name cannot exceed 200 characters.");

        RuleFor(x => x.NumberOfAttendees)
            .GreaterThan(0).WithMessage("Number of attendees must be at least 1.");

        RuleFor(x => x.Items)
            .NotNull().WithMessage("Booking items list cannot be null.")
            .Must(items => items != null && items.Count > 0)
            .WithMessage("At least one room, add-on, or meal must be selected in the cart.");
    }
}

