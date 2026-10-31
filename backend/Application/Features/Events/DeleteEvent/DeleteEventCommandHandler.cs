namespace Application.Features.Events.DeleteEvent;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class DeleteEventCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<DeleteEventCommand, Result<bool>>
{
    public async Task<Result<bool>> HandleAsync(
        DeleteEventCommand command,
        CancellationToken cancellationToken = default)
    {
        var ev = await dbContext.Events.FirstOrDefaultAsync(e => e.Id == command.Id, cancellationToken);
        if (ev is null)
        {
            return Result<bool>.Failure(new Error("Event.NotFound", $"Event with ID '{command.Id}' was not found."));
        }

        dbContext.Events.Remove(ev);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}
