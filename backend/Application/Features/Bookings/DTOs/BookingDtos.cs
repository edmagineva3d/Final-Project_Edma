namespace Application.Features.Bookings.DTOs;

public sealed record BookingItemDto(
    Guid Id,
    string Category,
    string ItemCode,
    string ItemName,
    decimal UnitCost,
    int Quantity,
    decimal Subtotal,
    string? ImageUrl
);

public sealed record BookingDto(
    Guid Id,
    string BookingReference,
    string ClientName,
    string ClientEmail,
    string ClientPhone,
    string Organization,
    string EventName,
    DateTime EventDate,
    int NumberOfAttendees,
    string Status,
    decimal RoomsTotal,
    decimal AddOnsTotal,
    decimal MealsTotal,
    decimal GrandTotal,
    string? SpecialRequests,
    DateTime CreatedAt,
    DateTime? ConfirmedAt,
    List<BookingItemDto> Items
);

public sealed record CartItemInput(
    string Category, // "Room", "AddOn", "Meal"
    string ItemCode,
    int Quantity,
    int? NumberOfPeople
);

public sealed record CartSummaryDto(
    List<BookingItemDto> Items,
    decimal RoomsTotal,
    decimal AddOnsTotal,
    decimal MealsTotal,
    decimal GrandTotal,
    int TotalItemCount
);

