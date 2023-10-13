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
 * this tests that mode starts on brief
 */
test("mode on start", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await expect(page.getByText("Mode: Brief")).toBeVisible();
});

/**
 * this tests that mode changes to verbose from brief
 */
test("mode on first change", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Verbose")).toBeVisible();
});

/**
 * this tests that mode changes back to brief after changing to verbose
 */
test("mode on second change", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("mode");
  await submitButton.click();
  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Brief")).toBeVisible();
});

/**
 * this tests that mode changes with other commands being run as well
 */
test("mode on after load", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Mode: Verbose")).toBeVisible();
});

/**
 * this tests that mode changes the history display to
 * have Command: ... and Output: ...
 */
test("output and command come up when verbose", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await inputBox.fill("load_file csv1");
  await submitButton.click();

  await inputBox.fill("mode");
  await submitButton.click();

  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: Mode was set to verbose")).toBeVisible();
});
