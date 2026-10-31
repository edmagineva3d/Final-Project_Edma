namespace Application.Features.Bookings.GetAllBookings;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllBookingsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllBookingsQuery, Result<List<BookingDto>>>
{
    public async Task<Result<List<BookingDto>>> HandleAsync(
        GetAllBookingsQuery query,
        CancellationToken cancellationToken = default)
    {
        var bookings = await dbContext.Bookings
            .AsNoTracking()
            .Include(b => b.Items)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync(cancellationToken);

        var dtos = bookings.Select(booking => new BookingDto(
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
        )).ToList();

        return Result<List<BookingDto>>.Success(dtos);
    }
}

