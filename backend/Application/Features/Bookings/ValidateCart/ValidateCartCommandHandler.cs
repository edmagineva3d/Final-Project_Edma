namespace Application.Features.Bookings.ValidateCart;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Bookings.DTOs;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class ValidateCartCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<ValidateCartCommand, Result<CartSummaryDto>>
{
    public async Task<Result<CartSummaryDto>> HandleAsync(
        ValidateCartCommand command,
        CancellationToken cancellationToken = default)
    {
        if (command.Items == null || command.Items.Count == 0)
        {
            return Result<CartSummaryDto>.Success(new CartSummaryDto(
                new List<BookingItemDto>(),
                0m, 0m, 0m, 0m, 0
            ));
        }

        var dbRooms = await dbContext.Rooms.AsNoTracking().ToListAsync(cancellationToken);
        var dbAddOns = await dbContext.AddOns.AsNoTracking().ToListAsync(cancellationToken);
        var dbMeals = await dbContext.Meals.AsNoTracking().ToListAsync(cancellationToken);

        var items = new List<BookingItemDto>();
        decimal roomsTotal = 0m;
        decimal addOnsTotal = 0m;
        decimal mealsTotal = 0m;
        int totalItemCount = 0;

        foreach (var item in command.Items.Where(i => i.Quantity > 0))
        {
            if (string.Equals(item.Category, "Room", StringComparison.OrdinalIgnoreCase))
            {
                var room = dbRooms.FirstOrDefault(r => r.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (room != null)
                {
                    var subtotal = room.UnitPrice * item.Quantity;
                    roomsTotal += subtotal;
                    totalItemCount += item.Quantity;
                    items.Add(new BookingItemDto(
                        Guid.NewGuid(),
                        "Room",
                        room.Code,
                        room.Name,
                        room.UnitPrice,
                        item.Quantity,
                        subtotal,
                        room.ImageUrl
                    ));
                }
            }
            else if (string.Equals(item.Category, "AddOn", StringComparison.OrdinalIgnoreCase))
            {
                var addOn = dbAddOns.FirstOrDefault(a => a.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (addOn != null)
                {
                    var subtotal = addOn.UnitPrice * item.Quantity;
                    addOnsTotal += subtotal;
                    totalItemCount += item.Quantity;
                    items.Add(new BookingItemDto(
                        Guid.NewGuid(),
                        "AddOn",
                        addOn.Code,
                        addOn.Name,
                        addOn.UnitPrice,
                        item.Quantity,
                        subtotal,
                        addOn.ImageUrl
                    ));
                }
            }
            else if (string.Equals(item.Category, "Meal", StringComparison.OrdinalIgnoreCase))
            {
                var meal = dbMeals.FirstOrDefault(m => m.Code.Equals(item.ItemCode, StringComparison.OrdinalIgnoreCase));
                if (meal != null)
                {
                    var count = item.NumberOfPeople ?? command.DefaultAttendeeCount ?? item.Quantity;
                    if (count > 0)
                    {
                        var subtotal = meal.PricePerPerson * count;
                        mealsTotal += subtotal;
                        totalItemCount += count;
                        items.Add(new BookingItemDto(
                            Guid.NewGuid(),
                            "Meal",
                            meal.Code,
                            meal.Name,
                            meal.PricePerPerson,
                            count,
                            subtotal,
                            meal.ImageUrl
                        ));
                    }
                }
            }
        }

        var grandTotal = roomsTotal + addOnsTotal + mealsTotal;
        return Result<CartSummaryDto>.Success(new CartSummaryDto(
            items,
            roomsTotal,
            addOnsTotal,
            mealsTotal,
            grandTotal,
            totalItemCount
        ));
    }
}

