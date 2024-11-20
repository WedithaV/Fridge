using System;
using api.Dtos.Item;
using api.Models;

namespace api.Mappers;

public static class ItemMapper
{
    public static ItemDto ToItemDto(this Item itemModel)
    {
        return new ItemDto
        {
           Id = itemModel.Id,
           Name = itemModel.Name,
           //ExpireDate = itemModel.ExpireDate 
        };
    }

    public static Item ToItemFromCreateDTO(this  CreateItemRequestDto itemDto)
    {
        return new Item
        {
            Name = itemDto.Name,
            ExpireDate = itemDto.ExpireDate
        };
    }
}
