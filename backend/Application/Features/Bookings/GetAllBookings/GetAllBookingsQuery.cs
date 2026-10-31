namespace Application.Features.Bookings.GetAllBookings;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record GetAllBookingsQuery : IQuery<Result<List<BookingDto>>>;

