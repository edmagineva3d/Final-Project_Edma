namespace Api.Features.AddOns;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.AddOns.GetAllAddOns;
using Application.Features.AddOns.GetAddOnByCode;
using Domain.Common;

public static class AddOnEndpoints
{
    public static void MapAddOnEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/addons")
            .WithTags("AddOns");

        group.MapGet("/", GetAll)
            .WithName("GetAllAddOns")
            .WithSummary("Get all AV equipment add-ons");

        group.MapGet("/{code}", GetByCode)
            .WithName("GetAddOnByCode")
            .WithSummary("Get an add-on by code");
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllAddOnsQuery, Result<List<AddOnDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllAddOnsQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetByCode(
        string code,
        IQueryHandler<GetAddOnByCodeQuery, Result<AddOnDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAddOnByCodeQuery(code);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}
