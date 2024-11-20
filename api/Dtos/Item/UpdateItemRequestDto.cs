using System;

namespace api.Dtos.Item;

public class UpdateItemRequestDto
{
    public string Name { get; set; } = string.Empty;
    public DateTime ExpireDate { get; set; }
}
