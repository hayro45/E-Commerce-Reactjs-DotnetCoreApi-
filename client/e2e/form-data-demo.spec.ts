import { expect, test } from "@playwright/test";

test("sends each value separately to .NET and clears stale selections", async ({ page }) => {
  await page.goto("/form-data-demo");
  const select = page.getByRole("combobox", { name: "Categories" });
  await expect(select).toBeEnabled();
  await select.click();
  await page.getByRole("option", { name: "Books", exact: true }).click();
  await page.getByRole("option", { name: "Home, garden", exact: true }).click();
  await page.keyboard.press("Escape");
  const request = page.waitForRequest(request => request.method() === "POST" && request.url().endsWith("/api/form-data-demo"));
  await page.getByRole("button", { name: "Submit selection" }).click();
  const body = (await request).postData()!;
  expect(body.match(/name="categories"/g)).toHaveLength(2);
  expect(body).toContain("home,garden");
  await expect(page.getByTestId("accepted-categories")).toHaveText('["books","home,garden"]');
  if (process.env.DEMO_SCREENSHOT_PATH) {
    await page.screenshot({ path: process.env.DEMO_SCREENSHOT_PATH, fullPage: true });
  }

  await page.getByRole("button", { name: "Clear selection" }).click();
  await page.getByRole("button", { name: "Submit selection" }).click();
  await expect(page.getByTestId("accepted-categories")).toHaveText("[]");
});

test("supports selecting a category using the keyboard", async ({ page }) => {
  await page.goto("/form-data-demo");
  const select = page.getByRole("combobox", { name: "Categories" });
  await expect(select).toBeEnabled();
  await select.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Submit selection" }).click();
  await expect(page.getByTestId("accepted-categories")).toHaveText('["books"]');
});

test("shows a useful error when the API is unavailable", async ({ page }) => {
  await page.route("**/api/form-data-demo/options", route => route.fulfill({ status: 503 }));
  await page.goto("/form-data-demo");
  await expect(page.getByRole("alert")).toContainText("Could not load categories");
  await expect(page.getByRole("button", { name: "Submit selection" })).toBeDisabled();
});

test("rejects oversized form bodies on the real API host", async ({ request }) => {
  const response = await request.post("/api/form-data-demo", {
    multipart: { categories: "x".repeat(20_000) },
  });
  expect(response.status()).toBe(400);
  const problem = await response.json();
  expect(problem.errors[""][0]).toContain("16384");
});
