using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly DataContext _context;
    public CartController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<CartDTO>> GetCart()
    {
        return CartToDTO(await GetOrCreateCart()); 
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart(int quantity, int productId)
    {
        var cart = await GetOrCreateCart();
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound("The product was not found.");

        cart.AddItem(product, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result)
            return CreatedAtAction(nameof(GetCart), CartToDTO(cart));
        return BadRequest(new ProblemDetails { Title = "Problem adding item to cart" });
    }

    private async Task<Cart> GetOrCreateCart()
    {
        var cart = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .Where(i => i.CustomerId == Request.Cookies["CustomerId"])
            .FirstOrDefaultAsync();

        if (cart == null)
        {
            var customerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(30),
                IsEssential = true
            };
            Response.Cookies.Append("CustomerId", customerId, cookieOptions);
            cart = new Cart { CustomerId = customerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

        }

        return cart;
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteItemFromCart(int productId, int quantity)
    {
        var cart = await GetOrCreateCart();
        if (cart == null) return NotFound("The cart was not found.");

        cart.RemoveItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result)
            return Ok(cart);
        return BadRequest(new ProblemDetails { Title = "Problem removing item from cart" });
    }
    private CartDTO CartToDTO(Cart cart)
    {
        return new CartDTO
        {
            CartId = cart.CartId,
            CustomerId = cart.CustomerId,
            CartItemDTOs = cart.CartItems.Select(ci => new CartItemDTO
            {
                ProductId = ci.ProductId,
                Name = ci.Product.Name,
                Price = ci.Product.Price,
                ImageUrl = ci.Product.ImageUrl,
                Quantity = ci.Quantity
            }).ToList()
        };
    }

}
