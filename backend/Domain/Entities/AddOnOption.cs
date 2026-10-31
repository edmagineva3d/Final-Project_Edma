namespace Domain.Entities;

using Domain.Common;

public sealed class AddOnOption : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public string Category { get; set; } = "General";
    public string Description { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
