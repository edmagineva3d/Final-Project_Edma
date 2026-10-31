namespace Api.Features.Events;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Application.Features.Events.DeleteEvent;
using Application.Features.Events.GetAllEvents;
using Application.Features.Events.GetEventById;
using Application.Features.Events.UpdateEvent;
using Domain.Common;

public static class EventEndpoints
{
    public static void MapEventEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/events")
            .WithTags("Events");

        group.MapGet("/", GetAll)
            .WithName("GetAllEvents")
            .WithSummary("Get all conference events");

        group.MapGet("/{id:guid}", GetById)
            .WithName("GetEventById")
            .WithSummary("Get conference event by ID");

        group.MapPost("/", Create)
            .WithName("CreateEvent")
            .WithSummary("Create a new conference event");

        group.MapPut("/{id:guid}", Update)
            .WithName("UpdateEvent")
            .WithSummary("Update a conference event");

        group.MapDelete("/{id:guid}", Delete)
            .WithName("DeleteEvent")
            .WithSummary("Delete a conference event");
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllEventsQuery, Result<List<EventDetailDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllEventsQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetById(
        Guid id,
        IQueryHandler<GetEventByIdQuery, Result<EventDetailDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetEventByIdQuery(id);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> Create(
        CreateEventCommand command,
        ICommandHandler<CreateEventCommand, Result<EventDetailDto>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.CreatedAtRoute(result.Value, "GetEventById", new { id = result.Value!.Id })
            : result.ToProblemDetails();
    }

    private static async Task<IResult> Update(
        Guid id,
        UpdateEventCommand command,
        ICommandHandler<UpdateEventCommand, Result<EventDetailDto>> handler,
        CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return Results.BadRequest(new { error = "Route ID does not match body ID." });
        }

        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> Delete(
        Guid id,
        ICommandHandler<DeleteEventCommand, Result<bool>> handler,
        CancellationToken cancellationToken)
    {
        var command = new DeleteEventCommand(id);
        var result = await handler.HandleAsync(command, cancellationToken);
        return result.IsSuccess
            ? TypedResults.NoContent()
            : result.ToProblemDetails();
    }
}
