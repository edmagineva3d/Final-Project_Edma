namespace Tests;

using Application.Features.Events.CreateEvent;
using Application.Features.Estimates.CreateEstimate;
using Xunit;

public sealed class ValidatorTests
{
    [Fact]
    public void CreateEventValidator_FailsWhenRequiredFieldsAreMissing()
    {
        var validator = new CreateEventValidator();
        var command = new CreateEventCommand(
            Title: "",
            OrganizerName: "",
            OrganizerEmail: "invalid-email",
            StartDate: DateTime.UtcNow.AddDays(5),
            EndDate: DateTime.UtcNow.AddDays(2), // End before Start
            EstimatedAttendees: 0,
            Notes: null
        );

        var result = validator.Validate(command);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEventCommand.Title));
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEventCommand.OrganizerEmail));
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEventCommand.EndDate));
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEventCommand.EstimatedAttendees));
    }

    [Fact]
    public void CreateEstimateValidator_FailsWhenEmailIsInvalidOrAttendeesZero()
    {
        var validator = new CreateEstimateValidator();
        var command = new CreateEstimateCommand(
            EventId: null,
            ClientName: "Test",
            ClientEmail: "notanemail",
            EventName: "Conference",
            NumberOfAttendees: 0,
            Rooms: null,
            AddOns: null,
            Meals: null,
            Notes: null
        );

        var result = validator.Validate(command);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEstimateCommand.ClientEmail));
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(CreateEstimateCommand.NumberOfAttendees));
    }
}

