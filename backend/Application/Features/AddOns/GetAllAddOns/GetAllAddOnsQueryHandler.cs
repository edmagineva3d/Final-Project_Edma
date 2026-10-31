namespace Application.Features.AddOns.GetAllAddOns;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllAddOnsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllAddOnsQuery, Result<List<AddOnDto>>>
{
    public async Task<Result<List<AddOnDto>>> HandleAsync(
        GetAllAddOnsQuery query,
        CancellationToken cancellationToken = default)
    {
        var addOns = await dbContext.AddOns
            .AsNoTracking()
            .OrderBy(a => a.DisplayOrder)
            .Select(a => new AddOnDto(
                a.Id,
                a.Code,
                a.Name,
                a.UnitPrice,
                a.Category,
                a.Description,
                a.IconName,
                a.DisplayOrder
            ))
            .ToListAsync(cancellationToken);

        return Result<List<AddOnDto>>.Success(addOns);
    }
}
