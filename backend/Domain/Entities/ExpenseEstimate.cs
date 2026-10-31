namespace Domain.Entities;

using Domain.Common;

public sealed class ExpenseEstimate : BaseEntity
{
    public Guid? EventId { get; set; }
    public ConferenceEvent? Event { get; set; }

    public string ClientName { get; set; } = "Valued Client";
    public string ClientEmail { get; set; } = "client@example.com";
    public string EventName { get; set; } = "Annual Conference";
    public int NumberOfAttendees { get; set; } = 30;

    public decimal RoomsTotal { get; set; }
    public decimal AddOnsTotal { get; set; }
    public decimal MealsTotal { get; set; }
    public decimal GrandTotal { get; set; }

    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<EstimateItem> Items { get; set; } = new();
}

