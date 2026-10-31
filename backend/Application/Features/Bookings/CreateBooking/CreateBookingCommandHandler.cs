namespace Application.Features.Bookings.CreateBooking;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;
using Domain.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

public sealed class CreateBookingCommandHandler(
    IAppDbContext dbContext,
    IValidator<CreateBookingCommand> validator)
    : ICommandHandler<CreateBookingCommand, Result<BookingDto>>
{
    public async Task<Result<BookingDto>> HandleAsync(
        CreateBookingCommand command,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            var firstError = validationResult.Errors.First();
            return Result<BookingDto>.Failure(new Error(firstError.PropertyName, firstError.ErrorMessage));
        }

        var dbRooms = await dbContext.Rooms.AsNoTracking().ToListAsync(cancellationToken);
        var dbAddOns = await dbContext.AddOns.AsNoTracking().ToListAsync(cancellationToken);
        var dbMeals = await dbContext.Meals.AsNoTracking().ToListAsync(cancellationToken);

        var bookingId = Guid.NewGuid();
        var bookingItems = new List<BookingItem>();
        decimal roomsTotal = 0m;
        decimal addOnsTotal = 0m;
        decimal mealsTotal = 0m;

        foreach (var item in command.Items.Where(i => i.Quantity > 0))
        {
            if (string.Equals(item.Category, "Room", StringComparison.OrdinalIgnoreCase))
            {
                var room = dbRooms.FirstOrDefault(r => r.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (room != null)
                {
                    var subtotal = room.UnitPrice * item.Quantity;
                    roomsTotal += subtotal;
                    bookingItems.Add(new BookingItem
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookingId,
                        Category = "Room",
                        ItemCode = room.Code,
                        ItemName = room.Name,
                        UnitCost = room.UnitPrice,
                        Quantity = item.Quantity,
                        Subtotal = subtotal,
                        ImageUrl = room.ImageUrl
                    });
                }
            }
            else if (string.Equals(item.Category, "AddOn", StringComparison.OrdinalIgnoreCase))
            {
                var addOn = dbAddOns.FirstOrDefault(a => a.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (addOn != null)
                {
                    var subtotal = addOn.UnitPrice * item.Quantity;
                    addOnsTotal += subtotal;
                    bookingItems.Add(new BookingItem
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookingId,
                        Category = "AddOn",
                        ItemCode = addOn.Code,
                        ItemName = addOn.Name,
                        UnitCost = addOn.UnitPrice,
                        Quantity = item.Quantity,
                        Subtotal = subtotal,
                        ImageUrl = addOn.ImageUrl
                    });
                }
            }
            else if (string.Equals(item.Category, "Meal", StringComparison.OrdinalIgnoreCase))
            {
                var meal = dbMeals.FirstOrDefault(m => m.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (meal != null)
                {
                    var attendeeCount = item.NumberOfPeople ?? command.NumberOfAttendees;
                    if (attendeeCount > 0)
                    {
                        var subtotal = meal.PricePerPerson * attendeeCount;
                        mealsTotal += subtotal;
                        bookingItems.Add(new BookingItem
                        {
                            Id = Guid.NewGuid(),
                            BookingId = bookingId,
                            Category = "Meal",
                            ItemCode = meal.Code,
                            ItemName = meal.Name,
                            UnitCost = meal.PricePerPerson,
                            Quantity = attendeeCount,
                            Subtotal = subtotal,
                            ImageUrl = meal.ImageUrl
                        });
                    }
                }
            }
        }

        if (bookingItems.Count == 0)
        {
            return Result<BookingDto>.Failure(new Error("Booking.EmptyCart", "No valid items selected for this booking."));
        }

        var grandTotal = roomsTotal + addOnsTotal + mealsTotal;
        var referenceCode = $"GC-{DateTime.UtcNow:yyMM}-{Random.Shared.Next(1000, 9999)}";

        var booking = new Booking
        {
            Id = bookingId,
            BookingReference = referenceCode,
            ClientName = command.ClientName.Trim(),
            ClientEmail = command.ClientEmail.Trim().ToLowerInvariant(),
            ClientPhone = command.ClientPhone?.Trim() ?? string.Empty,
            Organization = command.Organization?.Trim() ?? string.Empty,
            EventName = command.EventName.Trim(),
            EventDate = command.EventDate ?? DateTime.UtcNow.AddDays(14),
            NumberOfAttendees = command.NumberOfAttendees,
            Status = "Confirmed",
            RoomsTotal = roomsTotal,
            AddOnsTotal = addOnsTotal,
            MealsTotal = mealsTotal,
            GrandTotal = grandTotal,
            SpecialRequests = command.SpecialRequests,
            CreatedAt = DateTime.UtcNow,
            ConfirmedAt = DateTime.UtcNow,
            Items = bookingItems
        };

        dbContext.Bookings.Add(booking);
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

