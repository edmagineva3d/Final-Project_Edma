namespace Domain.Entities;

using Domain.Common;

public sealed class EstimateItem : BaseEntity
{
    public Guid ExpenseEstimateId { get; set; }
    public ExpenseEstimate? ExpenseEstimate { get; set; }

    public string Category { get; set; } = string.Empty; // Room, AddOn, Meal
    public string ItemCode { get; set; } = string.Empty;
    public string ItemName { get; set; } = string.Empty;
    public decimal UnitCost { get; set; }
    public int Quantity { get; set; }
    public decimal Subtotal { get; set; }
}
