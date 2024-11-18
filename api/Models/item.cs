using System;

namespace api.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime ExpireDate { get; set; }

}