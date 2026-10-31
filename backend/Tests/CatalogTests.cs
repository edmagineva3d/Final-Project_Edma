namespace Tests;

using Application.Features.Rooms.GetAllRooms;
using Application.Features.AddOns.GetAllAddOns;
using Application.Features.Meals.GetAllMeals;
using Xunit;

public sealed class CatalogTests
{
    [Fact]
    public async Task GetAllRooms_ReturnsAllFiveOfficialRoomsWithCorrectSpecs()
    {
        var context = TestDbContextFactory.Create(nameof(GetAllRooms_ReturnsAllFiveOfficialRoomsWithCorrectSpecs));
        var handler = new GetAllRoomsQueryHandler(context);

        var result = await handler.HandleAsync(new GetAllRoomsQuery());

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(5, result.Value.Count);

        var auditorium = result.Value.Single(r => r.Code == "auditorium-hall");
        Assert.Equal(200, auditorium.Capacity);
        Assert.Equal(5500m, auditorium.UnitPrice);

        var conference = result.Value.Single(r => r.Code == "conference-room");
        Assert.Equal(15, conference.Capacity);
        Assert.Equal(3500m, conference.UnitPrice);

        var presentation = result.Value.Single(r => r.Code == "presentation-room");
        Assert.Equal(50, presentation.Capacity);
        Assert.Equal(700m, presentation.UnitPrice);

        var largeMeeting = result.Value.Single(r => r.Code == "large-meeting-room");
        Assert.Equal(10, largeMeeting.Capacity);
        Assert.Equal(900m, largeMeeting.UnitPrice);

        var smallMeeting = result.Value.Single(r => r.Code == "small-meeting-room");
        Assert.Equal(5, smallMeeting.Capacity);
        Assert.Equal(1100m, smallMeeting.UnitPrice);
    }

    [Fact]
    public async Task GetAllAddOns_ReturnsAllFiveOfficialEquipmentWithCorrectPricing()
    {
        var context = TestDbContextFactory.Create(nameof(GetAllAddOns_ReturnsAllFiveOfficialEquipmentWithCorrectPricing));
        var handler = new GetAllAddOnsQueryHandler(context);

        var result = await handler.HandleAsync(new GetAllAddOnsQuery());

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(5, result.Value.Count);

        Assert.Equal(35m, result.Value.Single(a => a.Code == "speakers").UnitPrice);
        Assert.Equal(45m, result.Value.Single(a => a.Code == "microphones").UnitPrice);
        Assert.Equal(80m, result.Value.Single(a => a.Code == "whiteboards").UnitPrice);
        Assert.Equal(200m, result.Value.Single(a => a.Code == "projectors").UnitPrice);
        Assert.Equal(80m, result.Value.Single(a => a.Code == "signage").UnitPrice);
    }

    [Fact]
    public async Task GetAllMeals_ReturnsAllFourOfficialMealsWithCorrectPricing()
    {
        var context = TestDbContextFactory.Create(nameof(GetAllMeals_ReturnsAllFourOfficialMealsWithCorrectPricing));
        var handler = new GetAllMealsQueryHandler(context);

        var result = await handler.HandleAsync(new GetAllMealsQuery());

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);
        Assert.Equal(4, result.Value.Count);

        Assert.Equal(50m, result.Value.Single(m => m.Code == "breakfast").PricePerPerson);
        Assert.Equal(60m, result.Value.Single(m => m.Code == "lunch").PricePerPerson);
        Assert.Equal(25m, result.Value.Single(m => m.Code == "high-tea").PricePerPerson);
        Assert.Equal(70m, result.Value.Single(m => m.Code == "dinner").PricePerPerson);
    }
}
