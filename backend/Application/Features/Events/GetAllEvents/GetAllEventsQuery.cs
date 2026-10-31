namespace Application.Features.Events.GetAllEvents;

using Application.Abstractions.Messaging;
using Application.Features.Events.CreateEvent;
using Domain.Common;

public sealed record GetAllEventsQuery : IQuery<Result<List<EventDetailDto>>>;

