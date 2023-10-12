import { test, expect } from "@playwright/test";



/**
 * this class tests the searching functionality, error messages, and successes
 */

let submitButton;
let inputBox;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
  inputBox = page.locator("css=input");
  submitButton = page.locator("css=button");
});


/**
 * this tests that calling search without a CSV loaded will return a proper
 * error response message. 
 */
test("no csv searching", async ({ page }) => {

  await page.goto("http://localhost:8000/");

  await inputBox.fill("search <1> <2>");
  await submitButton.click();

  await expect(
    page.getByText("Currently there is no CSV loaded.")
  ).toBeVisible();
});

/**
 * this tests for searching a value that does not exist will return a proper 
 * message - "No Results Found!"
 */
test("no results found search", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <134343> <123213232>");
  await submitButton.click();

  await expect(page.getByText("No Results Found!")).toBeVisible();
});


/**
 * this tests an ill-formatted search. In this example, it tests that the 
 * carrots are not used for searching. 
 */
test("ill-formatted search no carrots", async ({ page }) => {

  await page.goto("http://localhost:8000/");

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

/**
 * this tests an ill-formatted search (with only one parameter)
 * and that it returns a proper error message
 */
test("ill-formatted search only one param", async ({ page }) => {

  await page.goto("http://localhost:8000/");

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

/**
 * this tests an ill-formatted search with no parameters
 * and that it returns a proper error message
 */
test("ill-formatted search no params", async ({ page }) => {

  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search");
  await submitButton.click();

  await expect(
    page.getByText(
      "Search must follow the input instructions. Format: search <column> <value>"
    )
  ).toBeVisible();
});

/**
 * This tests a successful search, with using a number as the column identifier, 
 *  with only one row as a response, and that
 * a proper table is returned, with the search value existing in the response 
 */
test("csv1: successful 1 row search columnIndex ", async ({ page }) => {

  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <1> <Multiracial>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(1);
  await expect(resTable.locator("td").nth(1)).toHaveText("Multiracial");
});

/**
 * this tests a successful search with using a string as the column name, 
 * with only one row as a response (csv1)
 */
test("csv1: successful 1 row search columnName ", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("search <Data Type> <Multiracial>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(1);
  await expect(resTable.locator("td").nth(1)).toHaveText("Multiracial");
});

/**
 * this tests a successful search with using a number as the column index, 
 * with only two rows as a response (csv3)
 */
test("csv3: successful 2 row search columnIndex ", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await inputBox.fill("search <0> <Asian>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(2);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Asian");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("Asian");
});

/**
 * this tests a successful search with using a string as the column name, 
 * with two rows as a response (csv3)
 */
test("csv3: successful 2 row search columnName ", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv3");
  await submitButton.click();

  await inputBox.fill("search <IPEDS> <Asian>");
  await submitButton.click();
  const resTable = page.locator(".Output-Table").locator("tbody").locator("tr");

  expect(await resTable.count()).toBe(2);
  await expect(resTable.nth(0).locator("td").nth(0)).toHaveText("Asian");
  await expect(resTable.nth(1).locator("td").nth(0)).toHaveText("Asian");
});


/**
 * this tests successful search with using number as column index
 * with 5 rows as a response
 */
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

/**
 * this tests successful search with using string as column name
 * with 5 rows as a response
 */
test("csv2: successful 5 row search columnName ", async ({ page }) => {
  await page.goto("http://localhost:8000/");

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
