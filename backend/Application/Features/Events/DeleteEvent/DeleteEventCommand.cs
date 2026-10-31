namespace Application.Features.Events.DeleteEvent;

using Application.Abstractions.Messaging;
using Domain.Common;

public sealed record DeleteEventCommand(Guid Id) : ICommand<Result<bool>>;

