namespace Application.Features.Bookings.UpdateBookingStatus;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class UpdateBookingStatusCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<UpdateBookingStatusCommand, Result<BookingDto>>
{
    public async Task<Result<BookingDto>> HandleAsync(
        UpdateBookingStatusCommand command,
        CancellationToken cancellationToken = default)
    {
        var booking = await dbContext.Bookings
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.Id == command.Id, cancellationToken);

        if (booking == null)
        {
            return Result<BookingDto>.Failure(new Error("Booking.NotFound", $"Booking with ID '{command.Id}' was not found."));
        }

        booking.Status = command.Status.Trim();
        if (command.SpecialRequests != null)
        {
            booking.SpecialRequests = command.SpecialRequests;
        }

        await dbContext.SaveChangesAsync(cancellationToken);

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

