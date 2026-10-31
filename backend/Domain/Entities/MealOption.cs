namespace Domain.Entities;

using Domain.Common;

public sealed class MealOption : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal PricePerPerson { get; set; }
    public string Description { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
