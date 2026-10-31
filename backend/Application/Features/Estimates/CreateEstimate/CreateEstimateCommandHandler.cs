namespace Application.Features.Estimates.CreateEstimate;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;
using Domain.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

public sealed class CreateEstimateCommandHandler(
    IAppDbContext dbContext,
    IValidator<CreateEstimateCommand> validator)
    : ICommandHandler<CreateEstimateCommand, Result<EstimateDto>>
{
    public async Task<Result<EstimateDto>> HandleAsync(
        CreateEstimateCommand command,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            var firstError = validationResult.Errors[0];
            return Result<EstimateDto>.Failure(new Error("Estimate.Validation", firstError.ErrorMessage));
        }

        var dbRooms = await dbContext.Rooms.AsNoTracking().ToListAsync(cancellationToken);
        var dbAddOns = await dbContext.AddOns.AsNoTracking().ToListAsync(cancellationToken);
        var dbMeals = await dbContext.Meals.AsNoTracking().ToListAsync(cancellationToken);

        var estimate = new ExpenseEstimate
        {
            EventId = command.EventId,
            ClientName = command.ClientName.Trim(),
            ClientEmail = command.ClientEmail.Trim(),
            EventName = command.EventName.Trim(),
            NumberOfAttendees = command.NumberOfAttendees,
            Notes = command.Notes?.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        var itemsList = new List<EstimateItem>();
        decimal roomsTotal = 0;
        decimal addOnsTotal = 0;
        decimal mealsTotal = 0;

        // Rooms
        if (command.Rooms != null)
        {
            foreach (var r in command.Rooms.Where(r => r.Quantity > 0))
            {
                var room = dbRooms.FirstOrDefault(x => x.Code.Equals(r.Code, StringComparison.OrdinalIgnoreCase));
                if (room != null)
                {
                    var subtotal = room.UnitPrice * r.Quantity;
                    roomsTotal += subtotal;
                    itemsList.Add(new EstimateItem
                    {
                        Category = "Room",
                        ItemCode = room.Code,
                        ItemName = room.Name,
                        UnitCost = room.UnitPrice,
                        Quantity = r.Quantity,
                        Subtotal = subtotal
                    });
                }
            }
        }

        // AddOns
        if (command.AddOns != null)
        {
            foreach (var a in command.AddOns.Where(a => a.Quantity > 0))
            {
                var addOn = dbAddOns.FirstOrDefault(x => x.Code.Equals(a.Code, StringComparison.OrdinalIgnoreCase));
                if (addOn != null)
                {
                    var subtotal = addOn.UnitPrice * a.Quantity;
                    addOnsTotal += subtotal;
                    itemsList.Add(new EstimateItem
                    {
                        Category = "AddOn",
                        ItemCode = addOn.Code,
                        ItemName = addOn.Name,
                        UnitCost = addOn.UnitPrice,
                        Quantity = a.Quantity,
                        Subtotal = subtotal
                    });
                }
            }
        }

        // Meals
        if (command.Meals != null)
        {
            foreach (var m in command.Meals.Where(m => m.NumberOfPeople > 0))
            {
                var meal = dbMeals.FirstOrDefault(x => x.Code.Equals(m.Code, StringComparison.OrdinalIgnoreCase));
                if (meal != null)
                {
                    var subtotal = meal.PricePerPerson * m.NumberOfPeople;
                    mealsTotal += subtotal;
                    itemsList.Add(new EstimateItem
                    {
                        Category = "Meal",
                        ItemCode = meal.Code,
                        ItemName = meal.Name,
                        UnitCost = meal.PricePerPerson,
                        Quantity = m.NumberOfPeople,
                        Subtotal = subtotal
                    });
                }
            }
        }

        estimate.RoomsTotal = roomsTotal;
        estimate.AddOnsTotal = addOnsTotal;
        estimate.MealsTotal = mealsTotal;
        estimate.GrandTotal = roomsTotal + addOnsTotal + mealsTotal;
        estimate.Items = itemsList;

        dbContext.Estimates.Add(estimate);
        await dbContext.SaveChangesAsync(cancellationToken);

        var dtoItems = itemsList.Select(i => new EstimateItemDto(
            i.Category,
            i.ItemCode,
            i.ItemName,
            i.UnitCost,
            i.Quantity,
            i.Subtotal
        )).ToList();

        var dto = new EstimateDto(
            estimate.Id,
            estimate.EventId,
            estimate.ClientName,
            estimate.ClientEmail,
            estimate.EventName,
            estimate.NumberOfAttendees,
            estimate.RoomsTotal,
            estimate.AddOnsTotal,
            estimate.MealsTotal,
            estimate.GrandTotal,
            estimate.Notes,
            estimate.CreatedAt,
            dtoItems
        );

        return Result<EstimateDto>.Success(dto);
    }
}

