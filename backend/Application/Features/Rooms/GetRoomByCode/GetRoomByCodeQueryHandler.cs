namespace Application.Features.Rooms.GetRoomByCode;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Rooms.GetAllRooms;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRoomByCodeQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRoomByCodeQuery, Result<RoomDto>>
{
    public async Task<Result<RoomDto>> HandleAsync(
        GetRoomByCodeQuery query,
        CancellationToken cancellationToken = default)
    {
        var room = await dbContext.Rooms
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Code.ToLower() == query.Code.ToLower(), cancellationToken);

        if (room is null)
        {
            return Result<RoomDto>.Failure(new Error("Room.NotFound", $"Room with code '{query.Code}' was not found."));
        }

        var dto = new RoomDto(
            room.Id,
            room.Code,
            room.Name,
            room.Capacity,
            room.UnitPrice,
            room.Description,
            room.IconName,
            room.ImageUrl,
            room.DisplayOrder
        );

        return Result<RoomDto>.Success(dto);
    }
}
