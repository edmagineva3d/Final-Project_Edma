namespace Api.Features.Meals;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Meals.GetAllMeals;
using Application.Features.Meals.GetMealByCode;
using Domain.Common;

public static class MealEndpoints
{
    public static void MapMealEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/meals")
            .WithTags("Meals");

        group.MapGet("/", GetAll)
            .WithName("GetAllMeals")
            .WithSummary("Get all meal catering options");

        group.MapGet("/{code}", GetByCode)
            .WithName("GetMealByCode")
            .WithSummary("Get a meal option by code");
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllMealsQuery, Result<List<MealDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllMealsQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetByCode(
        string code,
        IQueryHandler<GetMealByCodeQuery, Result<MealDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetMealByCodeQuery(code);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}
