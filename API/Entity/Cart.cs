namespace API.Entity;


public class Cart
{
    public int CartId { get; set; }
    public string CustomerId { get; set; } = null!;
    public List<CartItem> CartItems { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        var cartItem = CartItems.FirstOrDefault(ci => ci.ProductId == product.Id);
        if (cartItem != null)
        {
            cartItem.Quantity += quantity;
        }
        else
        {
            CartItems.Add(new CartItem { ProductId = product.Id, Quantity = quantity });
        }
    }
    public void RemoveItem(int productId, int quantity)
    {
        var cartItem = CartItems.FirstOrDefault(ci => ci.ProductId == productId);
        if (cartItem != null)
        {
            cartItem.Quantity -= quantity;
            if (cartItem.Quantity <= 0)
            {
                CartItems.Remove(cartItem);
            }
        }
    }
}

public class CartItem
{
    public int CartItemId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public int CartId { get; set; }
    public Product Product { get; set; } = null!;
}


