namespace Application.Features.Rooms.GetAllRooms;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record GetAllRoomsQuery : IQuery<Result<List<RoomDto>>>;

public sealed record RoomDto(
    Guid Id,
    string Code,
    string Name,
    int Capacity,
    decimal UnitPrice,
    string Description,
    string IconName,
    int DisplayOrder
);
