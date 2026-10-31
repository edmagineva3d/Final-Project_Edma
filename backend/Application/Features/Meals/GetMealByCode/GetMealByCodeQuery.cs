namespace Application.Features.Meals.GetMealByCode;

using Application.Abstractions.Messaging;
using Application.Features.Meals.GetAllMeals;
using Domain.Common;

public sealed record GetMealByCodeQuery(string Code) : IQuery<Result<MealDto>>;

