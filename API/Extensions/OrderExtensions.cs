using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(o=> new OrderDTO
            {
                Id = o.Id,
                CustomerId = o.CustomerId,
                FirstName = o.FirstName,
                LastName = o.LastName,
                Phone = o.Phone,
                AddressLine = o.AddressLine,
                City = o.City,
                DeliveryFee = o.DeliveryFee,
                SubTotal = o.SubTotal,
                OrderDate = o.OrderDate,
                OrderStatus = o.OrderStatus,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDTO
                {
                    Id = oi.Id,
                    ProductName = oi.ProductName,
                    ProductId = oi.ProductId,
                    ProductImageUrl = oi.ProductImageUrl,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList()
            });
        }
    }
}