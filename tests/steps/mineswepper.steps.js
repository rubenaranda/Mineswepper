const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/src/html/mineswepper.html';

async function cellDiscover(string) {
	await page.click(`[data-testid="${string}"]`, { force: true });
}

//Background scenario
Given("a user opens the game",async function() {
    await page.goto(url);
})

// To load mockData tests
Given('the following mockdata is loaded: {string}', async function (mockData) {
    await page.goto(url + '?mockData=' + mockData);
  })

  // To uncover a cell with the position passed by the feature file
 When('the user uncover the square {string}',async function (string) {
    await cellDiscover(string)
  });

  // To check if the cell is uncoverd
  Then('the square {string} should be uncovered',async function (string) {
    const display = await page.locator('data-testid='+string).innerText();
    expect(display).toBe("")
  });

  
  Then('the square {string} should show an explosion simbol', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  