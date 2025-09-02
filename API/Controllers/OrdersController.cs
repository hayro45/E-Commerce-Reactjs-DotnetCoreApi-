using API.Data;
using API.DTO;
using API.Entity;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly DataContext _context;

    public OrdersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .OrderToDTO()
            .Where(o => o.CustomerId == User.Identity!.Name)
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDTO>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .OrderToDTO()
            .Where(o => o.CustomerId == User.Identity!.Name && o.Id == id)
            .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return Ok(order);
    }
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO createOrderDTO)
    {

        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .Where(c => c.CustomerId == User.Identity!.Name)
            .FirstOrDefaultAsync();

        if (cart == null) return BadRequest(new ProblemDetails { Title = "Cart not found" });

        var items = new List<OrderItem>();
        foreach (var cartItem in cart.CartItems)
        {
            var product = await _context.Products.FindAsync(cartItem.ProductId);
            var orderItem = new OrderItem
            {
                ProductId = product!.Id,
                ProductName = product.Name!,
                ProductImageUrl = product.ImageUrl!,
                Price = product.Price,
                Quantity = cartItem.Quantity
            };
            items.Add(orderItem);
            product.Stock -= cartItem.Quantity;
        }
        var subTotal = items.Sum(i => i.Price * i.Quantity);
        var delivery = subTotal > 100 ? 0 : 5;

        var order = new Order
        {
            OrderItems = items,
            CustomerId = User.Identity!.Name,
            FirstName = createOrderDTO.FirstName,
            LastName = createOrderDTO.LastName,
            Phone = createOrderDTO.Phone,
            AddressLine = createOrderDTO.AddressLine,
            SubTotal = subTotal,
            DeliveryFee = delivery
        };

        _context.Orders.Add(order);
        _context.Carts.Remove(cart);

        var result = await _context.SaveChangesAsync();
        if(result > 0)
        {
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, new { id = order.Id });
        }
        return BadRequest(new ProblemDetails { Title = "Problem saving changes" });
    }
}   