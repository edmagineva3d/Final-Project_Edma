namespace Application.Features.Bookings.UpdateBookingStatus;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record UpdateBookingStatusCommand(
    Guid Id,
    string Status,
    string? SpecialRequests = null
) : ICommand<Result<BookingDto>>;

