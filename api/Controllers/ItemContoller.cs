using System;
using api.Data;
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
        var items = _context.Item.ToList();
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

        return Ok(item);
    }
}
