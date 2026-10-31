namespace Application.Features.Bookings.CreateBooking;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record CreateBookingCommand(
    string ClientName,
    string ClientEmail,
    string? ClientPhone,
    string? Organization,
    string EventName,
    DateTime? EventDate,
    int NumberOfAttendees,
    string? SpecialRequests,
    List<CartItemInput> Items
) : ICommand<Result<BookingDto>>;

