namespace Application.Features.Estimates.GetAllEstimates;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetAllEstimatesQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetAllEstimatesQuery, Result<List<EstimateDto>>>
{
    public async Task<Result<List<EstimateDto>>> HandleAsync(
        GetAllEstimatesQuery query,
        CancellationToken cancellationToken = default)
    {
        var estimates = await dbContext.Estimates
            .AsNoTracking()
            .Include(e => e.Items)
            .OrderByDescending(e => e.CreatedAt)
            .Select(e => new EstimateDto(
                e.Id,
                e.EventId,
                e.ClientName,
                e.ClientEmail,
                e.EventName,
                e.NumberOfAttendees,
                e.RoomsTotal,
                e.AddOnsTotal,
                e.MealsTotal,
                e.GrandTotal,
                e.Notes,
                e.CreatedAt,
                e.Items.Select(i => new EstimateItemDto(
                    i.Category,
                    i.ItemCode,
                    i.ItemName,
                    i.UnitCost,
                    i.Quantity,
                    i.Subtotal
                )).ToList()
            ))
            .ToListAsync(cancellationToken);

        return Result<List<EstimateDto>>.Success(estimates);
    }
}
