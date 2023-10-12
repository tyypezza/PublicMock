import { test, expect } from "@playwright/test";


let submitButton;
let inputBox;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

test("no path load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file badpath");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();
});

test("csv1: successfully load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded csv1")).toBeVisible();
  await expect(page.getByText("Loaded CSV: csv1")).toBeVisible();
});


test("csv2: successfully load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await inputBox.fill("load_file csv2");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded csv2")).toBeVisible();
  await expect(page.getByText("Loaded CSV: csv2")).toBeVisible();
});


test("csv3: successfully load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded csv3")).toBeVisible();
  await expect(page.getByText("Loaded CSV: csv3")).toBeVisible();
});

