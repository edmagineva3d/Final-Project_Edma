namespace Application.Features.Estimates.GetEstimateById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetEstimateByIdQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetEstimateByIdQuery, Result<EstimateDto>>
{
    public async Task<Result<EstimateDto>> HandleAsync(
        GetEstimateByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var estimate = await dbContext.Estimates
            .AsNoTracking()
            .Include(e => e.Items)
            .FirstOrDefaultAsync(e => e.Id == query.Id, cancellationToken);

        if (estimate is null)
        {
            return Result<EstimateDto>.Failure(new Error("Estimate.NotFound", $"Estimate with ID '{query.Id}' was not found."));
        }

        var dto = new EstimateDto(
            estimate.Id,
            estimate.EventId,
            estimate.ClientName,
            estimate.ClientEmail,
            estimate.EventName,
            estimate.NumberOfAttendees,
            estimate.RoomsTotal,
            estimate.AddOnsTotal,
            estimate.MealsTotal,
            estimate.GrandTotal,
            estimate.Notes,
            estimate.CreatedAt,
            estimate.Items.Select(i => new EstimateItemDto(
                i.Category,
                i.ItemCode,
                i.ItemName,
                i.UnitCost,
                i.Quantity,
                i.Subtotal
            )).ToList()
        );

        return Result<EstimateDto>.Success(dto);
    }
}

