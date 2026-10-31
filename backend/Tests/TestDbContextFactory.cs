namespace Tests;

using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public static class TestDbContextFactory
{
    public static AppDbContext Create(string dbName)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;

        var context = new AppDbContext(options);
        SeedCatalog(context);
        return context;
    }

    public static void SeedCatalog(AppDbContext context)
    {
        if (context.Rooms.Any()) return;

        context.Rooms.AddRange(
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "auditorium-hall",
                Name = "Auditorium Hall",
                Capacity = 200,
                UnitPrice = 5500m,
                Description = "Grand theater hall for keynote sessions and plenary gatherings.",
                IconName = "auditorium",
                DisplayOrder = 1
            },
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "conference-room",
                Name = "Conference Room",
                Capacity = 15,
                UnitPrice = 3500m,
                Description = "Executive boardroom suite for roundtables and strategy sessions.",
                IconName = "conference",
                DisplayOrder = 2
            },
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "presentation-room",
                Name = "Presentation Room",
                Capacity = 50,
                UnitPrice = 700m,
                Description = "Modern tiered room designed for seminars and pitch presentations.",
                IconName = "presentation",
                DisplayOrder = 3
            },
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "large-meeting-room",
                Name = "Large Meeting Room",
                Capacity = 10,
                UnitPrice = 900m,
                Description = "Spacious collaborative workspace equipped for team workshops.",
                IconName = "large-meeting",
                DisplayOrder = 4
            },
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "small-meeting-room",
                Name = "Small Meeting Room",
                Capacity = 5,
                UnitPrice = 1100m,
                Description = "Intimate breakout space for private interviews and focused work.",
                IconName = "small-meeting",
                DisplayOrder = 5
            }
        );

        context.AddOns.AddRange(
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "speakers",
                Name = "Speakers",
                UnitPrice = 35m,
                Category = "Audio",
                Description = "High-fidelity acoustic loudspeakers with tripod stands.",
                IconName = "speakers",
                DisplayOrder = 1
            },
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "microphones",
                Name = "Microphones",
                UnitPrice = 45m,
                Category = "Audio",
                Description = "Wireless handheld and lapel condenser microphones.",
                IconName = "microphones",
                DisplayOrder = 2
            },
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "whiteboards",
                Name = "Whiteboards",
                UnitPrice = 80m,
                Category = "Interactive",
                Description = "Magnetic mobile glass whiteboards with markers and erasers.",
                IconName = "whiteboards",
                DisplayOrder = 3
            },
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "projectors",
                Name = "Projectors",
                UnitPrice = 200m,
                Category = "Visual",
                Description = "Ultra HD 4K laser projectors with retractable screens.",
                IconName = "projectors",
                DisplayOrder = 4
            },
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "signage",
                Name = "Signage",
                UnitPrice = 80m,
                Category = "Signage",
                Description = "Digital directional displays and branded banner stands.",
                IconName = "signage",
                DisplayOrder = 5
            }
        );

        context.Meals.AddRange(
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "breakfast",
                Name = "Breakfast",
                PricePerPerson = 50m,
                Description = "Artisanal bakery pastries, fresh seasonal fruit, juices, and specialty espresso.",
                IconName = "breakfast",
                DisplayOrder = 1
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "lunch",
                Name = "Lunch",
                PricePerPerson = 60m,
                Description = "Gourmet hot buffet, vibrant chef salads, and farm-to-table entrees.",
                IconName = "lunch",
                DisplayOrder = 2
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "high-tea",
                Name = "High Tea",
                PricePerPerson = 25m,
                Description = "Afternoon tea selection with warm scones, clotted cream, and finger sandwiches.",
                IconName = "high-tea",
                DisplayOrder = 3
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "dinner",
                Name = "Dinner",
                PricePerPerson = 70m,
                Description = "Three-course plated banquet dinner with dessert and beverage pairings.",
                IconName = "dinner",
                DisplayOrder = 4
            }
        );

        context.SaveChanges();
    }
}
