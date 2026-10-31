namespace Application.Features.Bookings.ValidateCart;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record ValidateCartCommand(
    List<CartItemInput> Items,
    int? DefaultAttendeeCount = null
) : ICommand<Result<CartSummaryDto>>;

