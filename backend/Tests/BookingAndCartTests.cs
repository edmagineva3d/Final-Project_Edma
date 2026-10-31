namespace Tests;

using Xunit;
using Application.Features.Bookings.CreateBooking;
using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.GetAllBookings;
using Application.Features.Bookings.GetBookingById;
using Application.Features.Bookings.GetBookingByReference;
using Application.Features.Bookings.UpdateBookingStatus;
using Application.Features.Bookings.ValidateCart;

public class BookingAndCartTests
{
    [Fact]
    public async Task ValidateCart_ShouldComputeCorrectSubtotalsAndGrandTotal()
    {
        var db = TestDbContextFactory.Create(nameof(ValidateCart_ShouldComputeCorrectSubtotalsAndGrandTotal));
        var handler = new ValidateCartCommandHandler(db);

        var cartItems = new List<CartItemInput>
        {
            new("Room", "conference-room", 1, null), // 3500
            new("AddOn", "projectors", 2, null),       // 2 * 200 = 400
            new("Meal", "lunch", 20, 20)              // 20 * 60 = 1200
        };

        var command = new ValidateCartCommand(cartItems, 20);
        var result = await handler.HandleAsync(command);

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(3500m, result.Value.RoomsTotal);
        Assert.Equal(400m, result.Value.AddOnsTotal);
        Assert.Equal(1200m, result.Value.MealsTotal);
        Assert.Equal(5100m, result.Value.GrandTotal);
        Assert.Equal(3, result.Value.Items.Count);
    }

    [Fact]
    public async Task CreateBooking_WithInvalidEmail_ShouldFailValidation()
    {
        var db = TestDbContextFactory.Create(nameof(CreateBooking_WithInvalidEmail_ShouldFailValidation));
        var validator = new CreateBookingValidator();
        var handler = new CreateBookingCommandHandler(db, validator);

        var command = new CreateBookingCommand(
            "Jane Doe",
            "invalid-email-address",
            "555-1234",
            "Acme Corp",
            "Annual Meeting",
            DateTime.UtcNow.AddDays(7),
            10,
            null,
            new List<CartItemInput> { new("Room", "conference-room", 1, null) }
        );

        var result = await handler.HandleAsync(command);
        Assert.False(result.IsSuccess);
    }

    [Fact]
    public async Task CreateBooking_WithEmptyItems_ShouldFailValidation()
    {
        var db = TestDbContextFactory.Create(nameof(CreateBooking_WithEmptyItems_ShouldFailValidation));
        var validator = new CreateBookingValidator();
        var handler = new CreateBookingCommandHandler(db, validator);

        var command = new CreateBookingCommand(
            "Jane Doe",
            "jane@example.com",
            "555-1234",
            "Acme Corp",
            "Annual Meeting",
            DateTime.UtcNow.AddDays(7),
            10,
            null,
            new List<CartItemInput>()
        );

        var result = await handler.HandleAsync(command);
        Assert.False(result.IsSuccess);
    }

    [Fact]
    public async Task CreateBooking_WithValidData_ShouldPersistAndReturnConfirmedBooking()
    {
        var db = TestDbContextFactory.Create(nameof(CreateBooking_WithValidData_ShouldPersistAndReturnConfirmedBooking));
        var validator = new CreateBookingValidator();
        var handler = new CreateBookingCommandHandler(db, validator);

        var items = new List<CartItemInput>
        {
            new("Room", "auditorium-hall", 1, null),  // 5500
            new("AddOn", "speakers", 2, null),        // 2 * 35 = 70
            new("Meal", "breakfast", 50, 50)          // 50 * 50 = 2500
        };

        var command = new CreateBookingCommand(
            "Dr. Marcus Vance",
            "marcus.vance@techfuture.org",
            "+1 (555) 890-4321",
            "Tech Future Summit",
            "Autonomous Systems Keynote",
            DateTime.UtcNow.AddDays(30),
            50,
            "Podium microphone and vegan option",
            items
        );

        var result = await handler.HandleAsync(command);

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.StartsWith("GC-", result.Value.BookingReference);
        Assert.Equal("Confirmed", result.Value.Status);
        Assert.Equal(5500m, result.Value.RoomsTotal);
        Assert.Equal(70m, result.Value.AddOnsTotal);
        Assert.Equal(2500m, result.Value.MealsTotal);
        Assert.Equal(8070m, result.Value.GrandTotal);
        Assert.Equal(3, result.Value.Items.Count);

        // Verify retrieval queries
        var getByIdHandler = new GetBookingByIdQueryHandler(db);
        var retrieved = await getByIdHandler.HandleAsync(new GetBookingByIdQuery(result.Value.Id));
        Assert.True(retrieved.IsSuccess);
        Assert.Equal(result.Value.BookingReference, retrieved.Value!.BookingReference);

        var getByRefHandler = new GetBookingByReferenceQueryHandler(db);
        var byRef = await getByRefHandler.HandleAsync(new GetBookingByReferenceQuery(result.Value.BookingReference));
        Assert.True(byRef.IsSuccess);
        Assert.Equal(result.Value.Id, byRef.Value!.Id);

        var getAllHandler = new GetAllBookingsQueryHandler(db);
        var allBookings = await getAllHandler.HandleAsync(new GetAllBookingsQuery());
        Assert.True(allBookings.IsSuccess);
        Assert.Contains(allBookings.Value!, b => b.Id == result.Value.Id);
    }

    [Fact]
    public async Task UpdateBookingStatus_ShouldModifyStatusAndNotes()
    {
        var db = TestDbContextFactory.Create(nameof(UpdateBookingStatus_ShouldModifyStatusAndNotes));
        var validator = new CreateBookingValidator();
        var createHandler = new CreateBookingCommandHandler(db, validator);

        var createResult = await createHandler.HandleAsync(new CreateBookingCommand(
            "Sarah Connor",
            "sarah@resistance.org",
            "555-9999",
            "Skynet Watch",
            "Security Briefing",
            DateTime.UtcNow.AddDays(5),
            10,
            null,
            new List<CartItemInput> { new("Room", "small-meeting-room", 1, null) }
        ));

        Assert.True(createResult.IsSuccess);
        var bookingId = createResult.Value!.Id;

        var updateHandler = new UpdateBookingStatusCommandHandler(db);
        var updateResult = await updateHandler.HandleAsync(new UpdateBookingStatusCommand(
            bookingId,
            "Completed",
            "Follow-up scheduled for next quarter"
        ));

        Assert.True(updateResult.IsSuccess);
        Assert.Equal("Completed", updateResult.Value!.Status);
        Assert.Equal("Follow-up scheduled for next quarter", updateResult.Value.SpecialRequests);
    }
}
