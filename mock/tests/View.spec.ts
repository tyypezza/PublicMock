import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */
let submitButton;
let inputBox;
// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  // await page.goto('http://localhost:8000/')
  // TODO: Is there something we need to do before every test case to avoid repeating code?
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests failed view when no csv is loaded
 */
test("no csv view", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("view");
  await submitButton.click();

  await expect(
    page.getByText("Currently there is no CSV loaded.")
  ).toBeVisible();
});

/**
 * this tests successful view
 */
test("view success", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(7);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("State");
});

/**
 * this tests successful view on a loaded file replacing a
 * previously loaded file
 */
test("view success after loading new file", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("load_file csv2");
  await submitButton.click();

  await inputBox.fill("view");
  await submitButton.click();

  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(29);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("ID Race");
});
