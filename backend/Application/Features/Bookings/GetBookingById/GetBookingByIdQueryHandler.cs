namespace Application.Features.Bookings.GetBookingById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetBookingByIdQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetBookingByIdQuery, Result<BookingDto>>
{
    public async Task<Result<BookingDto>> HandleAsync(
        GetBookingByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var booking = await dbContext.Bookings
            .AsNoTracking()
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.Id == query.Id, cancellationToken);

        if (booking == null)
        {
            return Result<BookingDto>.Failure(new Error("Booking.NotFound", $"Booking with ID '{query.Id}' was not found."));
        }

        var dto = new BookingDto(
            booking.Id,
            booking.BookingReference,
            booking.ClientName,
            booking.ClientEmail,
            booking.ClientPhone,
            booking.Organization,
            booking.EventName,
            booking.EventDate,
            booking.NumberOfAttendees,
            booking.Status,
            booking.RoomsTotal,
            booking.AddOnsTotal,
            booking.MealsTotal,
            booking.GrandTotal,
            booking.SpecialRequests,
            booking.CreatedAt,
            booking.ConfirmedAt,
            booking.Items.Select(i => new BookingItemDto(
                i.Id,
                i.Category,
                i.ItemCode,
                i.ItemName,
                i.UnitCost,
                i.Quantity,
                i.Subtotal,
                i.ImageUrl
            )).ToList()
        );

        return Result<BookingDto>.Success(dto);
    }
}

