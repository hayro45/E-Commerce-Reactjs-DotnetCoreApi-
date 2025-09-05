using API.Entity;

namespace API.DTO;

using System.Text.Json.Serialization;

public class CreateOrderDTO
{
    [JsonPropertyName("firstname")]
    public string? FirstName { get; set; }
    [JsonPropertyName("lastname")]
    public string? LastName { get; set; }
    [JsonPropertyName("phone")]
    public string? Phone { get; set; }
    [JsonPropertyName("city")]
    public string? City { get; set; }
    [JsonPropertyName("addressline")]
    public string? AddressLine { get; set; }
    [JsonPropertyName("cardname")]
    public string? CardName { get; set; }
    [JsonPropertyName("cardnumber")]
    public string? CardNumber { get; set; }
    [JsonPropertyName("cardexpiremonth")]
    public string? CardExpireMonth { get; set; }
    [JsonPropertyName("cardexpireyear")]
    public string? CardExpireYear { get; set; }
    [JsonPropertyName("cardcvc")]
    public string? CardCvc { get; set; }
    [JsonPropertyName("conversationid")]
    public string? ConversationId { get; set; }
}