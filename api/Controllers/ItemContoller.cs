using System;
using api.Data;
using api.Dtos;
using api.Dtos.Item;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;
[Route("api/item")]
[ApiController]
public class ItemContoller : ControllerBase
{
    private readonly ApplicationDBContext _context;
    public ItemContoller(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var items = _context.Item.ToList()
        .Select(s => s.ToItemDto());
        return Ok(items);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        var item = _context.Item.Find(id);

        if(item == null)
        {
            return NotFound();
        }

        return Ok(item.ToItemDto());
    }

    [HttpPost]

    public IActionResult Create([FromBody] CreateItemRequestDto itemDto)
    {
        var itemModel = itemDto.ToItemFromCreateDTO();
        _context.Item.Add(itemModel);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetById),new {id = itemModel.Id},itemModel);
    }

}
