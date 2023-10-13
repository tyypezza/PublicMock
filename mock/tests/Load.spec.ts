import { test, expect } from "@playwright/test";

/**
 * this class tests the load_file functionality and edge cases
 */

let submitButton;
let inputBox;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});

/**
 * this tests for a file that does not exist , and that a proper error response
 * is given.
 */
test("bad path load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");
  await inputBox.fill("load_file badpath");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();
});

/**
 * this tests for just calling load (with no params), and that a proper error response is given
 * is given.
 */
test("no path load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");
  await inputBox.fill("load_file badpath");
  await submitButton.click();

  await expect(page.getByText("Path to file does not exist!")).toBeVisible();
});

/**
 * this tests a properly loaded csv (csv1) and provides a proper output response
 * "Successfully loaded csv1"
 * and ensuring the header also updates and confirms that there is a loaded csv
 */
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

/**
 * this tests a properly loaded csv (csv2) and provides a proper output response
 * "Successfully loaded csv2"
 * and ensuring the header also updates and confirms that there is a loaded csv
 */
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

/**
 * this tests a properly loaded csv (csv2) and provides a proper output response
 * "Successfully loaded csv2"
 * and ensuring the header also updates and confirms that there is a loaded csv
 */
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

/**
 * this tests loading a csv after loading a previous csv
 */
test("load 2 csvs", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await inputBox.fill("load_file csv2");
  await submitButton.click();
  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded csv3")).toBeVisible();
  await expect(page.getByText("Loaded CSV: csv3")).toBeVisible();
});

/**
 * this tests loading a csv after loading and viewing a previous csv
 */
test("load after load and view", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await inputBox.fill("load_file csv2");
  await submitButton.click();
  await inputBox.fill("view");
  await submitButton.click();
  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await expect(page.getByText("Successfully loaded csv3")).toBeVisible();
  await expect(page.getByText("Loaded CSV: csv3")).toBeVisible();
});
