namespace Domain.Entities;

using Domain.Common;

public sealed class RoomOption : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal UnitPrice { get; set; }
    public string Description { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
