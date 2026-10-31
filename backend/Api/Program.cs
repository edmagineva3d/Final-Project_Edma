using Api.Common.Extensions;
using Api.Features.AddOns;
using Api.Features.Estimates;
using Api.Features.Events;
using Api.Features.Meals;
using Api.Features.Rooms;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.AddOns.GetAddOnByCode;
using Application.Features.AddOns.GetAllAddOns;
using Application.Features.Estimates.CalculateEstimate;
using Application.Features.Estimates.CreateEstimate;
using Application.Features.Estimates.GetAllEstimates;
using Application.Features.Estimates.GetEstimateById;
using Application.Features.Events.CreateEvent;
using Application.Features.Events.DeleteEvent;
using Application.Features.Events.GetAllEvents;
using Application.Features.Events.GetEventById;
using Application.Features.Events.UpdateEvent;
using Application.Features.Meals.GetAllMeals;
using Application.Features.Meals.GetMealByCode;
using Application.Features.Rooms.GetAllRooms;
using Application.Features.Rooms.GetRoomByCode;
using Domain.Common;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Database configuration: SQLite database file
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=conference_planner.db";

builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options =>
    options.UseSqlite(connectionString));

// Register FluentValidation validators
builder.Services.AddValidatorsFromAssemblyContaining<CreateEventValidator>();

// Register Handlers
// Rooms
builder.Services.AddScoped<IQueryHandler<GetAllRoomsQuery, Result<List<RoomDto>>>, GetAllRoomsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetRoomByCodeQuery, Result<RoomDto>>, GetRoomByCodeQueryHandler>();

// AddOns
builder.Services.AddScoped<IQueryHandler<GetAllAddOnsQuery, Result<List<AddOnDto>>>, GetAllAddOnsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetAddOnByCodeQuery, Result<AddOnDto>>, GetAddOnByCodeQueryHandler>();

// Meals
builder.Services.AddScoped<IQueryHandler<GetAllMealsQuery, Result<List<MealDto>>>, GetAllMealsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetMealByCodeQuery, Result<MealDto>>, GetMealByCodeQueryHandler>();

// Events
builder.Services.AddScoped<IQueryHandler<GetAllEventsQuery, Result<List<EventDetailDto>>>, GetAllEventsQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetEventByIdQuery, Result<EventDetailDto>>, GetEventByIdQueryHandler>();
builder.Services.AddScoped<ICommandHandler<CreateEventCommand, Result<EventDetailDto>>, CreateEventCommandHandler>();
builder.Services.AddScoped<ICommandHandler<UpdateEventCommand, Result<EventDetailDto>>, UpdateEventCommandHandler>();
builder.Services.AddScoped<ICommandHandler<DeleteEventCommand, Result<bool>>, DeleteEventCommandHandler>();

// Estimates
builder.Services.AddScoped<ICommandHandler<CalculateEstimateCommand, Result<EstimateDto>>, CalculateEstimateCommandHandler>();
builder.Services.AddScoped<ICommandHandler<CreateEstimateCommand, Result<EstimateDto>>, CreateEstimateCommandHandler>();
builder.Services.AddScoped<IQueryHandler<GetAllEstimatesQuery, Result<List<EstimateDto>>>, GetAllEstimatesQueryHandler>();
builder.Services.AddScoped<IQueryHandler<GetEstimateByIdQuery, Result<EstimateDto>>, GetEstimateByIdQueryHandler>();

// CORS configuration for frontend
const string frontendCorsPolicy = "FrontendCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// OpenAPI & Scalar API reference
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "GatherCo Conference Event Planner API";
        document.Info.Description = "Vertical Slice Architecture API for Venue, AV Add-ons, Meals Catering, and Dynamic Expense Estimates.";
        document.Info.Version = "v1.0.0";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Apply migrations / ensure database schema created and seed initial catalog data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();

    // Seed Rooms
    if (!dbContext.Rooms.Any())
    {
        dbContext.Rooms.AddRange(
            new RoomOption
            {
                Id = Guid.NewGuid(),
                Code = "auditorium-hall",
                Name = "Auditorium Hall",
                Capacity = 200,
                UnitPrice = 5500m,
                Description = "Grand tiered auditorium with professional stage, theatrical lighting, and seating for 200 guests.",
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
                Description = "Executive boardroom suite with ergonomic leather seating, hybrid video conference bar, and private foyer.",
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
                Description = "Modern seminar hall with versatile classroom seating and dedicated presentation podium.",
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
                Description = "Spacious collaborative workshop room with modular tables and interactive digital whiteboard.",
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
                Description = "Intimate breakout room perfect for VIP interviews, confidential negotiations, or focused discussions.",
                IconName = "small-meeting",
                DisplayOrder = 5
            }
        );
        dbContext.SaveChanges();
    }

    // Seed AddOns
    if (!dbContext.AddOns.Any())
    {
        dbContext.AddOns.AddRange(
            new AddOnOption
            {
                Id = Guid.NewGuid(),
                Code = "speakers",
                Name = "Speakers",
                UnitPrice = 35m,
                Category = "Audio",
                Description = "Premium high-clarity PA loudspeakers with stands and balanced audio cables.",
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
                Description = "Wireless handheld and lightweight lapel condenser microphones with dual receivers.",
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
                Description = "Magnetic double-sided porcelain whiteboards complete with vibrant markers and erasers.",
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
                Description = "Ultra HD 4K high-lumen laser projectors paired with motorized drop-down projection screens.",
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
                Description = "Custom illuminated directional digital signage displays and branded entrance banners.",
                IconName = "signage",
                DisplayOrder = 5
            }
        );
        dbContext.SaveChanges();
    }

    // Seed Meals
    if (!dbContext.Meals.Any())
    {
        dbContext.Meals.AddRange(
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "breakfast",
                Name = "Breakfast",
                PricePerPerson = 50m,
                Description = "Artisanal cinnamon rolls, freshly baked croissants, seasonal berries, fresh juices, and specialty barista coffee.",
                IconName = "breakfast",
                DisplayOrder = 1
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "lunch",
                Name = "Lunch",
                PricePerPerson = 60m,
                Description = "Chef's gourmet deli buffet with roasted carved meats, organic farm greens, warm artisan bread, and sweet treats.",
                IconName = "lunch",
                DisplayOrder = 2
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "high-tea",
                Name = "High Tea",
                PricePerPerson = 25m,
                Description = "Traditional high tea service with warm butter scones, clotted cream, fruit preserves, and delicate finger sandwiches.",
                IconName = "high-tea",
                DisplayOrder = 3
            },
            new MealOption
            {
                Id = Guid.NewGuid(),
                Code = "dinner",
                Name = "Dinner",
                PricePerPerson = 70m,
                Description = "Three-course plated gala banquet featuring prime entrees, exquisite desserts, and wine service.",
                IconName = "dinner",
                DisplayOrder = 4
            }
        );
        dbContext.SaveChanges();
    }

    // Seed sample conference event and initial estimate
    if (!dbContext.Events.Any())
    {
        var sampleEvent = new ConferenceEvent
        {
            Id = Guid.NewGuid(),
            Title = "GatherCo Global Leadership Summit 2026",
            OrganizerName = "Gather & Co Planning Guild",
            OrganizerEmail = "summit@gatherco.events",
            StartDate = DateTime.UtcNow.AddDays(30),
            EndDate = DateTime.UtcNow.AddDays(32),
            EstimatedAttendees = 75,
            Notes = "Premier leadership convening exploring sustainable design and collaborative workspaces.",
            CreatedAt = DateTime.UtcNow
        };
        dbContext.Events.Add(sampleEvent);
        dbContext.SaveChanges();

        if (!dbContext.Estimates.Any())
        {
            var initialEstimate = new ExpenseEstimate
            {
                Id = Guid.NewGuid(),
                EventId = sampleEvent.Id,
                ClientName = "Innovate Global Labs",
                ClientEmail = "planning@innovatelabs.co",
                EventName = "Annual Innovation Forum",
                NumberOfAttendees = 50,
                RoomsTotal = 5500m,
                AddOnsTotal = 280m,
                MealsTotal = 3000m,
                GrandTotal = 8780m,
                Notes = "Includes main auditorium, 4K projector, signage, and lunch catering for 50.",
                CreatedAt = DateTime.UtcNow,
                Items = new List<EstimateItem>
                {
                    new()
                    {
                        Category = "Room",
                        ItemCode = "auditorium-hall",
                        ItemName = "Auditorium Hall",
                        UnitCost = 5500m,
                        Quantity = 1,
                        Subtotal = 5500m
                    },
                    new()
                    {
                        Category = "AddOn",
                        ItemCode = "projectors",
                        ItemName = "Projectors",
                        UnitCost = 200m,
                        Quantity = 1,
                        Subtotal = 200m
                    },
                    new()
                    {
                        Category = "AddOn",
                        ItemCode = "signage",
                        ItemName = "Signage",
                        UnitCost = 80m,
                        Quantity = 1,
                        Subtotal = 80m
                    },
                    new()
                    {
                        Category = "Meal",
                        ItemCode = "lunch",
                        ItemName = "Lunch",
                        UnitCost = 60m,
                        Quantity = 50,
                        Subtotal = 3000m
                    }
                }
            };
            dbContext.Estimates.Add(initialEstimate);
            dbContext.SaveChanges();
        }
    }
}

// Enable CORS
app.UseCors(frontendCorsPolicy);

// OpenAPI & Scalar
if (app.Environment.IsDevelopment() || true)
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Root endpoint
app.MapGet("/", () => Results.Ok(new
{
    Name = "GatherCo Conference Event Planner API",
    Version = "1.0.0",
    Status = "Healthy",
    Docs = "/scalar/v1",
    Catalog = "/api/catalog"
}));

// Consolidated catalog endpoint for convenience
app.MapGet("/api/catalog", async (
    IQueryHandler<GetAllRoomsQuery, Result<List<RoomDto>>> roomsHandler,
    IQueryHandler<GetAllAddOnsQuery, Result<List<AddOnDto>>> addOnsHandler,
    IQueryHandler<GetAllMealsQuery, Result<List<MealDto>>> mealsHandler,
    CancellationToken ct) =>
{
    var rooms = await roomsHandler.HandleAsync(new GetAllRoomsQuery(), ct);
    var addOns = await addOnsHandler.HandleAsync(new GetAllAddOnsQuery(), ct);
    var meals = await mealsHandler.HandleAsync(new GetAllMealsQuery(), ct);

    return Results.Ok(new
    {
        rooms = rooms.Value,
        addOns = addOns.Value,
        meals = meals.Value
    });
}).WithTags("Catalog").WithSummary("Get full catalog of rooms, add-ons, and meals");

// Map feature endpoints
app.MapRoomEndpoints();
app.MapAddOnEndpoints();
app.MapMealEndpoints();
app.MapEventEndpoints();
app.MapEstimateEndpoints();

app.Run();
