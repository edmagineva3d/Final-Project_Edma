namespace Application.Features.Bookings.GetBookingById;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record GetBookingByIdQuery(Guid Id) : IQuery<Result<BookingDto>>;

