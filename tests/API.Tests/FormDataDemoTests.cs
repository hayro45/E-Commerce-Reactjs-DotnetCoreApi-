using System.Net;
using System.Net.Http.Json;
using API.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace API.Tests;

public sealed class DemoFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("FormDataDemo");
        builder.ConfigureAppConfiguration((_, configuration) => configuration.AddInMemoryCollection(
            new Dictionary<string, string?>
            {
                ["ConnectionStrings:defaultConnection"] = "Data Source=:memory:",
                ["JWTSecurity:SecretKey"] = "form-data-demo-tests-only-not-a-deployment-secret"
            }));
    }
}

public sealed class FormDataDemoTests : IClassFixture<DemoFactory>
{
    private readonly HttpClient _client;

    public FormDataDemoTests(DemoFactory factory) => _client = factory.CreateClient();

    [Fact]
    public async Task ListsStableOptionIds()
    {
        var options = await _client.GetFromJsonAsync<CategoryOption[]>("/api/form-data-demo/options");
        Assert.Contains(options!, option => option.Id == "home,garden");
    }

    [Fact]
    public async Task BindsRepeatedFieldsAndPreservesCommaInsideValue()
    {
        using var content = Form("books", "home,garden");
        var response = await _client.PostAsync("/api/form-data-demo", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<CategorySubmission>();
        Assert.Equal(["books", "home,garden"], result!.Categories);
    }

    [Fact]
    public async Task AcceptsEmptySelectionWithoutKeepingPreviousValues()
    {
        using var populated = Form("books");
        (await _client.PostAsync("/api/form-data-demo", populated)).EnsureSuccessStatusCode();
        using var empty = new FormUrlEncodedContent([]);
        var response = await _client.PostAsync("/api/form-data-demo", empty);
        Assert.True(response.IsSuccessStatusCode, await response.Content.ReadAsStringAsync());
        Assert.Empty((await response.Content.ReadFromJsonAsync<CategorySubmission>())!.Categories);
    }

    [Theory]
    [InlineData("unknown")]
    [InlineData("books,home,garden")]
    [InlineData("BOOKS")]
    public async Task RejectsUnknownOrCommaJoinedIds(string value)
    {
        using var content = Form(value);
        var response = await _client.PostAsync("/api/form-data-demo", content);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("categories", body);
    }

    [Fact]
    public async Task RejectsDuplicateValues()
    {
        using var content = Form("books", "books");
        var response = await _client.PostAsync("/api/form-data-demo", content);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task RejectsJsonInsteadOfSilentlyBindingEmptySelection()
    {
        var response = await _client.PostAsJsonAsync("/api/form-data-demo", new { categories = new[] { "books" } });
        Assert.Equal(HttpStatusCode.UnsupportedMediaType, response.StatusCode);
    }

    private static MultipartFormDataContent Form(params string[] values)
    {
        var form = new MultipartFormDataContent();
        foreach (var value in values) form.Add(new StringContent(value), "categories");
        return form;
    }
}
