namespace Api.Features.Estimates;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Application.Features.Estimates.CreateEstimate;
using Application.Features.Estimates.GetAllEstimates;
using Application.Features.Estimates.GetEstimateById;
using Domain.Common;

public static class EstimateEndpoints
{
    public static void MapEstimateEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/estimates")
            .WithTags("Estimates");

        group.MapPost("/calculate", Calculate)
            .WithName("CalculateEstimate")
            .WithSummary("Calculate expense estimate preview with authoritative server pricing");

        group.MapPost("/", Create)
            .WithName("CreateEstimate")
            .WithSummary("Save an expense estimate to the database");

        group.MapGet("/", GetAll)
            .WithName("GetAllEstimates")
            .WithSummary("Get all saved expense estimates");

        group.MapGet("/{id:guid}", GetById)
            .WithName("GetEstimateById")
            .WithSummary("Get saved expense estimate by ID");
    }

    private static async Task<IResult> Calculate(
        CalculateEstimateCommand command,
        ICommandHandler<CalculateEstimateCommand, Result<EstimateDto>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> Create(
        CreateEstimateCommand command,
        ICommandHandler<CreateEstimateCommand, Result<EstimateDto>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.CreatedAtRoute(result.Value, "GetEstimateById", new { id = result.Value!.Id })
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllEstimatesQuery, Result<List<EstimateDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllEstimatesQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetById(
        Guid id,
        IQueryHandler<GetEstimateByIdQuery, Result<EstimateDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetEstimateByIdQuery(id);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}
