namespace Application.Features.Estimates.CreateEstimate;

using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;

public sealed record CreateEstimateCommand(
    Guid? EventId,
    string ClientName,
    string ClientEmail,
    string EventName,
    int NumberOfAttendees,
    List<SelectionItemInput>? Rooms,
    List<SelectionItemInput>? AddOns,
    List<MealSelectionInput>? Meals,
    string? Notes
) : ICommand<Result<EstimateDto>>;
