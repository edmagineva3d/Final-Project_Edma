namespace Application.Features.Estimates.GetEstimateById;

using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;

public sealed record GetEstimateByIdQuery(Guid Id) : IQuery<Result<EstimateDto>>;
