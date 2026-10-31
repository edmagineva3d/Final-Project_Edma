namespace Application.Features.Rooms.GetRoomByCode;

using Application.Abstractions.Messaging;
using Application.Features.Rooms.GetAllRooms;
using Domain.Common;

public sealed record GetRoomByCodeQuery(string Code) : IQuery<Result<RoomDto>>;

