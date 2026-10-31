namespace Application.Features.AddOns.GetAddOnByCode;

using Application.Abstractions.Messaging;
using Application.Features.AddOns.GetAllAddOns;
using Domain.Common;

public sealed record GetAddOnByCodeQuery(string Code) : IQuery<Result<AddOnDto>>;

