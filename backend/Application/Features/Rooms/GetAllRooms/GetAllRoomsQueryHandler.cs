namespace Application.Features.Rooms.GetAllRooms;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllRoomsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllRoomsQuery, Result<List<RoomDto>>>
{
    public async Task<Result<List<RoomDto>>> HandleAsync(
        GetAllRoomsQuery query,
        CancellationToken cancellationToken = default)
    {
        var rooms = await dbContext.Rooms
            .AsNoTracking()
            .OrderBy(r => r.DisplayOrder)
            .Select(r => new RoomDto(
                r.Id,
                r.Code,
                r.Name,
                r.Capacity,
                r.UnitPrice,
                r.Description,
                r.IconName,
                r.DisplayOrder
            ))
            .ToListAsync(cancellationToken);

        return Result<List<RoomDto>>.Success(rooms);
    }
}
