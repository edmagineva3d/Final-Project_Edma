namespace Api.Features.Rooms;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Rooms.GetAllRooms;
using Application.Features.Rooms.GetRoomByCode;
using Domain.Common;

public static class RoomEndpoints
{
    public static void MapRoomEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/rooms")
            .WithTags("Rooms");

        group.MapGet("/", GetAll)
            .WithName("GetAllRooms")
            .WithSummary("Get all venue room options");

        group.MapGet("/{code}", GetByCode)
            .WithName("GetRoomByCode")
            .WithSummary("Get a room option by code");
    }

    private static async Task<IResult> GetAll(
        IQueryHandler<GetAllRoomsQuery, Result<List<RoomDto>>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetAllRoomsQuery();
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> GetByCode(
        string code,
        IQueryHandler<GetRoomByCodeQuery, Result<RoomDto>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetRoomByCodeQuery(code);
        var result = await handler.HandleAsync(query, cancellationToken);
        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}

