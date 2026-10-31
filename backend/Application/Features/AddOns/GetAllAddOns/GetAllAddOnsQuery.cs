namespace Application.Features.AddOns.GetAllAddOns;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record GetAllAddOnsQuery : IQuery<Result<List<AddOnDto>>>;

public sealed record AddOnDto(
    Guid Id,
    string Code,
    string Name,
    decimal UnitPrice,
    string Category,
    string Description,
    string IconName,
    string ImageUrl,
    int DisplayOrder
);
