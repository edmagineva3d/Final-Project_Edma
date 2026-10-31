namespace Application.Features.Events.GetEventById;

using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;

public sealed record GetEventByIdQuery(Guid Id) : IQuery<Result<EventDetailDto>>;

