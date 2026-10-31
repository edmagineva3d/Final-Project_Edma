namespace Domain.Entities;

using Domain.Common;

public sealed class BookingItem : BaseEntity
{
    public Guid BookingId { get; set; }
    public Booking? Booking { get; set; }

    public string Category { get; set; } = string.Empty; // "Room", "AddOn", "Meal"
    public string ItemCode { get; set; } = string.Empty;
    public string ItemName { get; set; } = string.Empty;
    public decimal UnitCost { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
    public string? ImageUrl { get; set; }
}

