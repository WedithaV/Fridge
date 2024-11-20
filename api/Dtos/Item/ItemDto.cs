using System;

namespace api.Dtos.Item;

public class ItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    //public DateTime ExpireDate { get; set; }
}
