namespace Domain.Entities;

using Domain.Common;

public sealed class Booking : BaseEntity
{
    public string BookingReference { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public string ClientPhone { get; set; } = string.Empty;
    public string Organization { get; set; } = string.Empty;
    public string EventName { get; set; } = string.Empty;
    public DateTime EventDate { get; set; } = DateTime.UtcNow.AddDays(14);
    public int NumberOfAttendees { get; set; } = 1;
    public string Status { get; set; } = "Confirmed"; // "Confirmed", "Pending", "Cancelled"

    public decimal RoomsTotal { get; set; }
    public decimal AddOnsTotal { get; set; }
    public decimal MealsTotal { get; set; }
    public decimal GrandTotal { get; set; }

    public string? SpecialRequests { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ConfirmedAt { get; set; } = DateTime.UtcNow;

    public List<BookingItem> Items { get; set; } = new();
}

