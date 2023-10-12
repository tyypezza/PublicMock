import { test, expect } from '@playwright/test';


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
    await page.goto('http://localhost:8000/');
    inputBox = page.locator("css=input");
    submitButton = page.locator("css=button");


});



/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
// test('basic submit',async ({page}) => {
//   await page.goto("http://localhost:8000/");
//   // const submitButton = page.getByRole('button', { name: /submit/i });
//   await page.getByLabel('Submit').click();

//   // const inputBox = page.getByLabel('input_box');
//   // console.log(inputBox);
//   // // await expect(page.getByRole("button", { name: /submit/i }));
//   // await expect(page.getByLabel("input_box")).toBeVisible();
// });






// test('on page load, i see an input bar', async ({ page }) => {
//   // Notice: http, not https! Our front-end is not set up for HTTPs.
//   await page.goto('http://localhost:8000/');
//   await expect(page.getByLabel('Command input')).toBeVisible()
// })

// test('after I type into the input box, its text changes', async ({ page }) => {
//   // Step 1: Navigate to a URL
//   await page.goto('http://localhost:8000/');

//   // Step 2: Interact with the page
//   // Locate the element you are looking for
//   await page.getByLabel('Command input').click();
//   await page.getByLabel('Command input').fill('Awesome command');

//   // Step 3: Assert something about the page
//   // Assertions are done by using the expect() function
//   const mock_input = `Awesome command`
//   await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
// });

// test('on page load, i see a button', async ({ page }) => {
//   // TODO WITH TA: Fill this in!
// });

// test('after I click the button, its label increments', async ({ page }) => {
//   // TODO WITH TA: Fill this in to test your button counter functionality!
// });

// test('after I click the button, my command gets pushed', async ({ page }) => {
//   // TODO: Fill this in to test your button push functionality!
// });



// test("on page load, I see an input bar", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   // Assert that the input bar is visible by checking for its label
//   await expect(page.locator('label:has-text("Command input")')).toBeVisible();
// });

// test("after I type into the input box, its text changes", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   // Interact with the page: Click the input, type a command
//   const input = await page.locator('label:has-text("Command input") input');
//   await input.click();
//   await input.fill("Awesome command");

//   // Assert that the input box has the expected value
//   await expect(input).toHaveValue("Awesome command");
// });



/**
 * this tests that the initial components are set up, exist and are visible
 */
test("components exist and set up", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await expect(submitButton).toBeVisible();
  await expect(inputBox).toBeVisible();
  await expect(page.getByText("Loaded CSV: No CSV Loaded")).toBeVisible();
  await expect(page.getByText("Mode: Brief")).toBeVisible();
});

/**
 * this tests an invalid command being submited to the app
 * expecte result would be an Invalid Command response
 */
test("invalid command", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  // Assert that the button is visible by checking for its label or text
  await inputBox.fill("badcommmand");
  await submitButton.click();

  await expect(page.getByText("Invalid command")).toBeVisible();

  const resHistory = page.locator(".single-history-result");
  expect(await resHistory.count()).toBe(1);
});


/**
 * this tests that pressing the submit button while the input box is empty
 * does not change anything about the webpage. 
 */
test("empty input submit nothing changes", async ({ page }) => {
  // Navigate to your webpage
  await page.goto("http://localhost:8000/");

  await submitButton.click();
  const resHistory = page.locator(".single-history-result");
  expect (await resHistory.count()).toBe(0);
});




// test("after I click the button, its label increments", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   // Interact with the page: Click the button
//   const button = await page.locator('button:has-text("Your Button Text")');
//   const initialLabel = await button.textContent();

//   // Click the button
//   await button.click();

//   // Assert that the button label has changed (incremented)
//   const updatedLabel = await button.textContent();
//   await expect(updatedLabel).not.toBe(initialLabel);
// });

// test("after I click the button, my command gets pushed", async ({ page }) => {
//   // Navigate to your webpage
//   await page.goto("http://localhost:8000/");

//   // Interact with the page: Click the button
//   const button = await page.locator('button:has-text("Your Button Text")');
//   const input = await page.locator('label:has-text("Command input") input');
//   const initialCommand = await input.inputValue();

//   // Click the button
//   await button.click();

//   // Assert that the command has been pushed (changed)
//   const updatedCommand = await input.inputValue();
//   await expect(updatedCommand).not.toBe(initialCommand);
// });
