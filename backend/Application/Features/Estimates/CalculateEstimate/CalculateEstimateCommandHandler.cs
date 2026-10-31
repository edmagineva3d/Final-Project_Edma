namespace Application.Features.Estimates.CalculateEstimate;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class CalculateEstimateCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<CalculateEstimateCommand, Result<EstimateDto>>
{
    public async Task<Result<EstimateDto>> HandleAsync(
        CalculateEstimateCommand command,
        CancellationToken cancellationToken = default)
    {
        // Negative checks
        if (command.Rooms?.Any(r => r.Quantity < 0) == true ||
            command.AddOns?.Any(a => a.Quantity < 0) == true ||
            command.Meals?.Any(m => m.NumberOfPeople < 0) == true)
        {
            return Result<EstimateDto>.Failure(new Error("Estimate.InvalidQuantity", "Quantities cannot be negative."));
        }

        var dbRooms = await dbContext.Rooms.AsNoTracking().ToListAsync(cancellationToken);
        var dbAddOns = await dbContext.AddOns.AsNoTracking().ToListAsync(cancellationToken);
        var dbMeals = await dbContext.Meals.AsNoTracking().ToListAsync(cancellationToken);

        var items = new List<EstimateItemDto>();
        decimal roomsTotal = 0;
        decimal addOnsTotal = 0;
        decimal mealsTotal = 0;

        // Process Rooms
        if (command.Rooms != null)
        {
            foreach (var r in command.Rooms.Where(r => r.Quantity > 0))
            {
                var room = dbRooms.FirstOrDefault(x => x.Code.Equals(r.Code, StringComparison.OrdinalIgnoreCase));
                if (room != null)
                {
                    var subtotal = room.UnitPrice * r.Quantity;
                    roomsTotal += subtotal;
                    items.Add(new EstimateItemDto(
                        "Room",
                        room.Code,
                        room.Name,
                        room.UnitPrice,
                        r.Quantity,
                        subtotal
                    ));
                }
            }
        }

        // Process AddOns
        if (command.AddOns != null)
        {
            foreach (var a in command.AddOns.Where(a => a.Quantity > 0))
            {
                var addOn = dbAddOns.FirstOrDefault(x => x.Code.Equals(a.Code, StringComparison.OrdinalIgnoreCase));
                if (addOn != null)
                {
                    var subtotal = addOn.UnitPrice * a.Quantity;
                    addOnsTotal += subtotal;
                    items.Add(new EstimateItemDto(
                        "AddOn",
                        addOn.Code,
                        addOn.Name,
                        addOn.UnitPrice,
                        a.Quantity,
                        subtotal
                    ));
                }
            }
        }

        // Process Meals
        if (command.Meals != null)
        {
            foreach (var m in command.Meals.Where(m => m.NumberOfPeople > 0))
            {
                var meal = dbMeals.FirstOrDefault(x => x.Code.Equals(m.Code, StringComparison.OrdinalIgnoreCase));
                if (meal != null)
                {
                    var subtotal = meal.PricePerPerson * m.NumberOfPeople;
                    mealsTotal += subtotal;
                    items.Add(new EstimateItemDto(
                        "Meal",
                        meal.Code,
                        meal.Name,
                        meal.PricePerPerson,
                        m.NumberOfPeople,
                        subtotal
                    ));
                }
            }
        }

        var grandTotal = roomsTotal + addOnsTotal + mealsTotal;

        var dto = new EstimateDto(
            null,
            null,
            string.IsNullOrWhiteSpace(command.ClientName) ? "Guest Client" : command.ClientName.Trim(),
            string.IsNullOrWhiteSpace(command.ClientEmail) ? "guest@example.com" : command.ClientEmail.Trim(),
            string.IsNullOrWhiteSpace(command.EventName) ? "Conference Event" : command.EventName.Trim(),
            command.NumberOfAttendees > 0 ? command.NumberOfAttendees : 30,
            roomsTotal,
            addOnsTotal,
            mealsTotal,
            grandTotal,
            command.Notes?.Trim(),
            DateTime.UtcNow,
            items
        );

        return Result<EstimateDto>.Success(dto);
    }
}

