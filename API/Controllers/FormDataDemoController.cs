using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

/// <summary>A stateless example of binding repeated form fields; no catalog records are changed.</summary>
[ApiController]
[Route("api/form-data-demo")]
public class FormDataDemoController : ControllerBase
{
    private static readonly CategoryOption[] Options =
    [
        new("books", "Books"),
        new("electronics", "Electronics"),
        new("home,garden", "Home, garden")
    ];

    [HttpGet("options")]
    public ActionResult<CategoryOption[]> GetOptions() => Ok(Options);

    [HttpPost]
    [Consumes("multipart/form-data", "application/x-www-form-urlencoded")]
    [RequestSizeLimit(16_384)]
    public ActionResult<CategorySubmission> Submit([FromForm(Name = "categories")] string[]? categories)
    {
        categories ??= [];
        if (categories.Length > Options.Length || categories.Distinct(StringComparer.Ordinal).Count() != categories.Length)
        {
            ModelState.AddModelError("categories", "Choose each category at most once.");
        }

        if (categories.Any(value => !Options.Any(option => option.Id == value)))
        {
            ModelState.AddModelError("categories", "Choose only the listed categories.");
        }

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        return Ok(new CategorySubmission { Categories = categories });
    }
}

public sealed record CategoryOption(string Id, string Label);

public sealed class CategorySubmission
{
    public string[] Categories { get; set; } = [];
}
