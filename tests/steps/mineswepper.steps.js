const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/src/html/mineswepper.html';

async function cellTag (string) {
await page.click(`[data-testid="${string}"]`, { button: "right"});
}

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

  Then('the square {string} should be disabled',async function (string) {
    const display = await page.locator('data-testid='+string).getAttribute("disabled");
    expect(display).toBe("true")
  });

  Then('the square {string} should show an explosion simbol',async function (string) {
    await cellDiscover(string)
  });

  Then('the game should be over',async function () {
    let text = await page.locator("text=☀").first().innerText();
    expect(text).toBe("☀")
  });

  Then('the square {string}, {string} and {string} should be uncovered',async function (string1, string2, string3) {
    let positions = [string1, string2, string3]
    let result = true;
    for (let i = 0; i < 2; i++) {
      if (await page.locator(`[data-testid="${positions[i]}"]`).innerText() != "☀") {
        result = false;
        break;
      } 
      expect(result).toBe(true);
  }
  });

  Then('all the squares should be disabled', async function () {
    for (let x = 1; x < 4; x++) {
      for (let y = 1; y < 4; y++) {
        const cellId = x + "," + y
        const cellStatus = await page.locator(`[data-testid="${cellId}"]`).getAttribute("disabled");
        expect(cellStatus).toBe("true");
      }
    }
  });

  Given('non tagged mine counter is {string}',async function (string) {
   let display = await page.locator("data-testid=mines").innerText();
    expect(display).toBe(string);
});

When('the user taggs as mined the square {string}',async function (string) {
  await cellTag(string);
});

Then('in the square {string} should appear a mined simbol',async function (string) {
  let display = await page.locator("data-testid="+string).innerText();
  expect(display).toBe("!")
});

Then('the non taged mine counter should by {string}',async function (string) {
  let display = await page.locator("data-testid=mines").innerText();
    expect(display).toBe(string);
});

When('the user taggs as inconclusive the square {string}',async function (string) {
  await cellTag(string);
  await cellTag(string);
});

Then('in the square {string} should appear a inconclusive simbol',async function (string) {
  let display = await page.locator("data-testid="+string).innerText();
    expect(display).toBe("?");
});
