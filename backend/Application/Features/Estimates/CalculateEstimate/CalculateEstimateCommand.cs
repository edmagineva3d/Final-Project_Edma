namespace Application.Features.Estimates.CalculateEstimate;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record CalculateEstimateCommand(
    string? ClientName,
    string? ClientEmail,
    string? EventName,
    int NumberOfAttendees,
    List<SelectionItemInput>? Rooms,
    List<SelectionItemInput>? AddOns,
    List<MealSelectionInput>? Meals,
    string? Notes
) : ICommand<Result<EstimateDto>>;

public sealed record SelectionItemInput(string Code, int Quantity);

public sealed record MealSelectionInput(string Code, int NumberOfPeople);

public sealed record EstimateDto(
    Guid? Id,
    Guid? EventId,
    string ClientName,
    string ClientEmail,
    string EventName,
    int NumberOfAttendees,
    decimal RoomsTotal,
    decimal AddOnsTotal,
    decimal MealsTotal,
    decimal GrandTotal,
    string? Notes,
    DateTime CreatedAt,
    List<EstimateItemDto> Items
);

public sealed record EstimateItemDto(
    string Category,
    string ItemCode,
    string ItemName,
    decimal UnitCost,
    int Quantity,
    decimal Subtotal
);

