namespace Application.Features.Meals.GetAllMeals;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record GetAllMealsQuery : IQuery<Result<List<MealDto>>>;

public sealed record MealDto(
    Guid Id,
    string Code,
    string Name,
    decimal PricePerPerson,
    string Description,
    string IconName,
    int DisplayOrder
);
