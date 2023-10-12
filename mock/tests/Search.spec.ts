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


test("no csv searching", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("search <1> <2>");
  await submitButton.click();

  await expect(
    page.getByText("Currently there is no CSV loaded.")
  ).toBeVisible();
});

test("no results found search", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <134343> <123213232>");
  await submitButton.click();

  await expect(page.getByText("No Results Found!")).toBeVisible();
});

test("ill-formatted search no carrots", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search 123 345");
  await submitButton.click();

  await expect(
    page.getByText(
      "Search must follow the input instructions. Format: search <column> <value>"
    )
  ).toBeVisible();
});

test("ill-formatted search only one param", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search 123");
  await submitButton.click();

  await expect(
    page.getByText(
      "Search must follow the input instructions. Format: search <column> <value>"
    )
  ).toBeVisible();
});

test("ill-formatted search", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search 123 345");
  await submitButton.click();

  await expect(
    page.getByText(
      "Search must follow the input instructions. Format: search <column> <value>"
    )
  ).toBeVisible();
});

test("csv1: successful 1 row search columnIndex ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <1> <Multiracial>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(1);
  await expect(resTable.locator("td").nth(1)).toHaveText("Multiracial");
});

test("csv1: successful 1 row search columnName ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <Data Type> <Multiracial>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(1);
  await expect(resTable.locator("td").nth(1)).toHaveText("Multiracial");
});

test("csv3: successful 2 row search columnIndex ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await inputBox.fill("search <0> <Asian>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(2);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Asian");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("Asian");
});

test("csv3: successful 2 row search columnName ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await inputBox.fill("search <IPEDS> <Asian>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(2);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Asian");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("Asian");
});

test("csv2: successful 5 row search columnIndex ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv2");
  await submitButton.click();

  await inputBox.fill("search <0> <0>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(5);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(2).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(3).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(4).locator("td").nth(0)).toHaveText("0");
});

test("csv2: successful 5 row search columnName ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text

  await inputBox.fill("load_file csv2");
  await submitButton.click();

  await inputBox.fill("search <ID Race> <0>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(5);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(2).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(3).locator("td").nth(0)).toHaveText("0");
  await expect(resTable.nth(4).locator("td").nth(0)).toHaveText("0");
});
