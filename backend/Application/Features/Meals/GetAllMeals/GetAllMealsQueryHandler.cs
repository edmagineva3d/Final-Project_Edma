namespace Application.Features.Meals.GetAllMeals;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllMealsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllMealsQuery, Result<List<MealDto>>>
{
    public async Task<Result<List<MealDto>>> HandleAsync(
        GetAllMealsQuery query,
        CancellationToken cancellationToken = default)
    {
        var meals = await dbContext.Meals
            .AsNoTracking()
            .OrderBy(m => m.DisplayOrder)
            .Select(m => new MealDto(
                m.Id,
                m.Code,
                m.Name,
                m.PricePerPerson,
                m.Description,
                m.IconName,
                m.DisplayOrder
            ))
            .ToListAsync(cancellationToken);

        return Result<List<MealDto>>.Success(meals);
    }
}
