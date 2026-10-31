namespace Tests;

using Application.Features.Estimates.CalculateEstimate;
using Application.Features.Estimates.CreateEstimate;
using Application.Features.Estimates.GetAllEstimates;
using Application.Features.Estimates.GetEstimateById;
using Xunit;

public sealed class EstimatePersistenceTests
{
    [Fact]
    public async Task CreateEstimate_PersistsToDatabaseAndCanBeRetrieved()
    {
        var context = TestDbContextFactory.Create(nameof(CreateEstimate_PersistsToDatabaseAndCanBeRetrieved));
        var validator = new CreateEstimateValidator();
        var createHandler = new CreateEstimateCommandHandler(context, validator);

        var command = new CreateEstimateCommand(
            EventId: null,
            ClientName: "Starlight Media",
            ClientEmail: "hello@starlight.io",
            EventName: "Creative Con 2026",
            NumberOfAttendees: 40,
            Rooms: new List<SelectionItemInput>
            {
                new("presentation-room", 1)
            },
            AddOns: new List<SelectionItemInput>
            {
                new("projectors", 1),
                new("microphones", 2)
            },
            Meals: new List<MealSelectionInput>
            {
                new("high-tea", 40)
            },
            Notes: "Persisted estimate test"
        );

        var createResult = await createHandler.HandleAsync(command);

        Assert.True(createResult.IsSuccess);
        Assert.NotNull(createResult.Value);
        Assert.NotNull(createResult.Value.Id);

        var estimateId = createResult.Value.Id!.Value;

        // Verify retrieval by ID
        var getByIdHandler = new GetEstimateByIdQueryHandler(context);
        var getResult = await getByIdHandler.HandleAsync(new GetEstimateByIdQuery(estimateId));

        Assert.True(getResult.IsSuccess);
        Assert.NotNull(getResult.Value);
        Assert.Equal("Starlight Media", getResult.Value.ClientName);
        Assert.Equal(700m, getResult.Value.RoomsTotal); // presentation-room: 700
        Assert.Equal(200m + (45m * 2), getResult.Value.AddOnsTotal); // projectors: 200 + 2*45 = 290
        Assert.Equal(40 * 25m, getResult.Value.MealsTotal); // high-tea: 1000
        Assert.Equal(700m + 290m + 1000m, getResult.Value.GrandTotal);

        // Verify in list
        var getAllHandler = new GetAllEstimatesQueryHandler(context);
        var allResult = await getAllHandler.HandleAsync(new GetAllEstimatesQuery());

        Assert.True(allResult.IsSuccess);
        Assert.Contains(allResult.Value!, e => e.Id == estimateId);
    }
}

