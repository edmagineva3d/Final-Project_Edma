namespace Application.Abstractions.Data;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public interface IAppDbContext
{
    DbSet<ConferenceEvent> Events { get; }
    DbSet<RoomOption> Rooms { get; }
    DbSet<AddOnOption> AddOns { get; }
    DbSet<MealOption> Meals { get; }
    DbSet<ExpenseEstimate> Estimates { get; }
    DbSet<EstimateItem> EstimateItems { get; }
    DbSet<Booking> Bookings { get; }
    DbSet<BookingItem> BookingItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
