namespace Application.Features.Meals.GetMealByCode;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Meals.GetAllMeals;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetMealByCodeQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetMealByCodeQuery, Result<MealDto>>
{
    public async Task<Result<MealDto>> HandleAsync(
        GetMealByCodeQuery query,
        CancellationToken cancellationToken = default)
    {
        var meal = await dbContext.Meals
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.Code.ToLower() == query.Code.ToLower(), cancellationToken);

        if (meal is null)
        {
            return Result<MealDto>.Failure(new Error("Meal.NotFound", $"Meal option with code '{query.Code}' was not found."));
        }

        var dto = new MealDto(
            meal.Id,
            meal.Code,
            meal.Name,
            meal.PricePerPerson,
            meal.Description,
            meal.IconName,
            meal.ImageUrl,
            meal.DisplayOrder
        );

        return Result<MealDto>.Success(dto);
    }
}
