namespace Tests;

using Application.Features.Estimates.CalculateEstimate;
using Xunit;

public sealed class EstimateCalculationTests
{
    [Fact]
    public async Task CalculateEstimate_ComputesCorrectSubtotalsAndGrandTotal()
    {
        var context = TestDbContextFactory.Create(nameof(CalculateEstimate_ComputesCorrectSubtotalsAndGrandTotal));
        var handler = new CalculateEstimateCommandHandler(context);

        var command = new CalculateEstimateCommand(
            ClientName: "Acme Corp",
            ClientEmail: "contact@acme.com",
            EventName: "Tech Summit 2026",
            NumberOfAttendees: 50,
            Rooms: new List<SelectionItemInput>
            {
                new("auditorium-hall", 2),
                new("conference-room", 0) // zero quantity excluded
            },
            AddOns: new List<SelectionItemInput>
            {
                new("speakers", 3),
                new("projectors", 0)
            },
            Meals: new List<MealSelectionInput>
            {
                new("breakfast", 50),
                new("lunch", 0)
            },
            Notes: "VIP event"
        );

        var result = await handler.HandleAsync(command);

        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Value);

        var estimate = result.Value;
        Assert.Equal(11000m, estimate.RoomsTotal);
        Assert.Equal(105m, estimate.AddOnsTotal);
        Assert.Equal(2500m, estimate.MealsTotal);
        Assert.Equal(13605m, estimate.GrandTotal);

        Assert.Equal(3, estimate.Items.Count);
        Assert.Contains(estimate.Items, i => i.ItemCode == "auditorium-hall" && i.Subtotal == 11000m && i.Quantity == 2);
        Assert.Contains(estimate.Items, i => i.ItemCode == "speakers" && i.Subtotal == 105m && i.Quantity == 3);
        Assert.Contains(estimate.Items, i => i.ItemCode == "breakfast" && i.Subtotal == 2500m && i.Quantity == 50);
    }

    [Fact]
    public async Task CalculateEstimate_RejectsNegativeQuantities()
    {
        var context = TestDbContextFactory.Create(nameof(CalculateEstimate_RejectsNegativeQuantities));
        var handler = new CalculateEstimateCommandHandler(context);

        var command = new CalculateEstimateCommand(
            ClientName: "Test",
            ClientEmail: "test@example.com",
            EventName: "Negative Test",
            NumberOfAttendees: 10,
            Rooms: new List<SelectionItemInput>
            {
                new("auditorium-hall", -1)
            },
            AddOns: null,
            Meals: null,
            Notes: null
        );

        var result = await handler.HandleAsync(command);

        Assert.True(result.IsFailure);
        Assert.Equal("Estimate.InvalidQuantity", result.Error?.Code);
    }
}
