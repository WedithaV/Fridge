using System;
using api.Data;
using api.Dtos;
using api.Dtos.Item;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IActionResult> GetAll()
    {
        var items = await _context.Item.ToListAsync();
        var itemDto = items.Select(s => s.ToItemDto());
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var item = await _context.Item.FindAsync(id);

        if(item == null)
        {
            return NotFound();
        }

        return Ok(item.ToItemDto());
    }

    [HttpPost]

    public async Task<IActionResult> Create([FromBody] CreateItemRequestDto itemDto)
    {
        var itemModel = itemDto.ToItemFromCreateDTO();
        await _context.Item.AddAsync(itemModel);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById),new {id = itemModel.Id},itemModel);
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateItemRequestDto updateDto)
    {
        var itemModel = await _context.Item.FirstOrDefaultAsync(x => x.Id == id);

        if(itemModel == null)
        {
            return NotFound();
        }
        itemModel.Name = updateDto.Name;
        itemModel.ExpireDate = updateDto.ExpireDate;

        await _context.SaveChangesAsync();
        
        return Ok(itemModel.ToItemDto());
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var itemModel =  await _context.Item.FirstOrDefaultAsync(x => x.Id == id);

        if(itemModel == null)
        {
            return NotFound();
        }

        _context.Item.Remove(itemModel);
       await _context.SaveChangesAsync();

        return NoContent();
    }

}
