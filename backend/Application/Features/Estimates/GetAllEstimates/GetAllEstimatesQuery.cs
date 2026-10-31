namespace Application.Features.Estimates.GetAllEstimates;

using Application.Abstractions.Messaging;
using Application.Features.Estimates.CalculateEstimate;
using Domain.Common;

public sealed record GetAllEstimatesQuery : IQuery<Result<List<EstimateDto>>>;

