namespace Infrastructure.Persistence;

using Application.Abstractions.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public sealed class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ConferenceEvent> Events => Set<ConferenceEvent>();
    public DbSet<RoomOption> Rooms => Set<RoomOption>();
    public DbSet<AddOnOption> AddOns => Set<AddOnOption>();
    public DbSet<MealOption> Meals => Set<MealOption>();
    public DbSet<ExpenseEstimate> Estimates => Set<ExpenseEstimate>();
    public DbSet<EstimateItem> EstimateItems => Set<EstimateItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ConferenceEvent>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.OrganizerName).IsRequired().HasMaxLength(150);
            entity.Property(e => e.OrganizerEmail).IsRequired().HasMaxLength(200);
        });

        modelBuilder.Entity<RoomOption>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Code).IsRequired().HasMaxLength(50);
            entity.Property(r => r.Name).IsRequired().HasMaxLength(150);
            entity.Property(r => r.UnitPrice).HasColumnType("decimal(18,2)");
            entity.HasIndex(r => r.Code).IsUnique();
        });

        modelBuilder.Entity<AddOnOption>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Code).IsRequired().HasMaxLength(50);
            entity.Property(a => a.Name).IsRequired().HasMaxLength(150);
            entity.Property(a => a.UnitPrice).HasColumnType("decimal(18,2)");
            entity.HasIndex(a => a.Code).IsUnique();
        });

        modelBuilder.Entity<MealOption>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Code).IsRequired().HasMaxLength(50);
            entity.Property(m => m.Name).IsRequired().HasMaxLength(150);
            entity.Property(m => m.PricePerPerson).HasColumnType("decimal(18,2)");
            entity.HasIndex(m => m.Code).IsUnique();
        });

        modelBuilder.Entity<ExpenseEstimate>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ClientName).IsRequired().HasMaxLength(150);
            entity.Property(e => e.ClientEmail).IsRequired().HasMaxLength(200);
            entity.Property(e => e.EventName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.RoomsTotal).HasColumnType("decimal(18,2)");
            entity.Property(e => e.AddOnsTotal).HasColumnType("decimal(18,2)");
            entity.Property(e => e.MealsTotal).HasColumnType("decimal(18,2)");
            entity.Property(e => e.GrandTotal).HasColumnType("decimal(18,2)");

            entity.HasOne(e => e.Event)
                  .WithMany()
                  .HasForeignKey(e => e.EventId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasMany(e => e.Items)
                  .WithOne(i => i.ExpenseEstimate)
                  .HasForeignKey(i => i.ExpenseEstimateId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<EstimateItem>(entity =>
        {
            entity.HasKey(i => i.Id);
            entity.Property(i => i.Category).IsRequired().HasMaxLength(50);
            entity.Property(i => i.ItemCode).IsRequired().HasMaxLength(50);
            entity.Property(i => i.ItemName).IsRequired().HasMaxLength(150);
            entity.Property(i => i.UnitCost).HasColumnType("decimal(18,2)");
            entity.Property(i => i.Subtotal).HasColumnType("decimal(18,2)");
        });
    }
}

