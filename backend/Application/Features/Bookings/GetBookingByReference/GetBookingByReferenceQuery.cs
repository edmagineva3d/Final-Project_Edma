namespace Application.Features.Bookings.GetBookingByReference;

using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;

public sealed record GetBookingByReferenceQuery(string Reference) : IQuery<Result<BookingDto>>;

