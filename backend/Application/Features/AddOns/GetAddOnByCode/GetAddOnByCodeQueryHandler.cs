namespace Application.Features.AddOns.GetAddOnByCode;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.AddOns.GetAllAddOns;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAddOnByCodeQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAddOnByCodeQuery, Result<AddOnDto>>
{
    public async Task<Result<AddOnDto>> HandleAsync(
        GetAddOnByCodeQuery query,
        CancellationToken cancellationToken = default)
    {
        var addOn = await dbContext.AddOns
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Code.ToLower() == query.Code.ToLower(), cancellationToken);

        if (addOn is null)
        {
            return Result<AddOnDto>.Failure(new Error("AddOn.NotFound", $"Add-on with code '{query.Code}' was not found."));
        }

        var dto = new AddOnDto(
            addOn.Id,
            addOn.Code,
            addOn.Name,
            addOn.UnitPrice,
            addOn.Category,
            addOn.Description,
            addOn.IconName,
            addOn.DisplayOrder
        );

        return Result<AddOnDto>.Success(dto);
    }
}
