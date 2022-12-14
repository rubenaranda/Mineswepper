const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/src/html/mineswepper.html';

async function cellTag (string) {
await page.click(`[data-testid="${string}"]`, { button: "right"});
}

async function cellDiscover(string) {
	await page.click(`[data-testid="${string}"]`, { force: true });
}


async function mockDataTransformer(docString) {
  let string = ""
  for (let i = 0; i < docString.length; i++) {
   string += docString[i].replace("\n","-")
  }
  return string
}

async function boardToString (docString) {
  let string = ""
  var height = ((await docString).match(/-/g) || []).length + 1
  var width = (await docString).indexOf("-") 
  for (let i = 1; i < height+1; i++) {
    for (let j = 1; j < width+1; j++) {
    let displayText = await page.locator('data-testid='+i+","+j).innerText();
    let displayClass = await page.locator('data-testid='+i+","+j).getAttribute("class");
    if (displayText == "" && displayClass.includes("sqUncovered")) {
      string+="0"
    } else if (displayText == "") {
      string +="."
    } else {
      string += displayText
    }
    }
    string+= "-"
  }
  string.slice(0,-1)
  return string
}

async function checkBoard (board,string) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] != string[i]) {
      return "failed"
    }
  }
  return "passed"
}

//Background scenario
Given("a user opens the game",async function() {
    await page.goto(url);
})

Given('the following mockdata is loaded:',async function (docString) {
  let mockData = await mockDataTransformer(docString);
  await page.goto(url + '?mockData=' + mockData);
});

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
    expect(display).toBe("1")
  });

  Then('the square {string} should be disabled',async function (string) {
    const display = await page.locator('data-testid='+string).getAttribute("onclick");
    expect(display).toBe(null)
  });

  Then('the square {string} should show an explosion simbol',async function (string) {
    await cellDiscover(string)
  });


  Then('the square {string}, {string} and {string} should be uncovered',async function (string1, string2, string3) {
    let positions = [string1, string2, string3]
    let result = true;
    for (let i = 0; i < 2; i++) {
      if (await page.locator(`[data-testid="${positions[i]}"]`).innerText() != "???") {
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
        const cellStatus = await page.locator(`[data-testid="${cellId}"]`).getAttribute("onclick");
        expect(cellStatus).toBe(null);
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

Then('the non tagged mine counter should be {string}',async function (string) {
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

Given('the user tags as inconclusive the square {string}',async function (string) {
  await cellTag(string);
  await cellTag(string);
});

When('the user untags the square {string}',async function (string) {
  await cellTag(string);
});

Then('the square {string} should appear as covered square',async function (string) {
  let display = await page.locator(`[data-testid="${string}"]`).getAttribute("disabled");
  expect(display).toBe(null)
});

Then('there is no simbol in the square {string}',async function (string) {
  let display = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(display).toBe("");
});

Given('the square {string} is tagged as mined',async function (string) {
  await cellTag(string);
});

When('the user tags the square {string} as mined again',async function (string) {
  await cellTag(string);
});

When('the user tags the square {string},{string},{string}',async function (string, string2, string3) {
  await cellTag(string)
  await cellTag(string2)
  await cellTag(string3)
});

Then('in the square {string} should contains this number of adjacent mines: {string}',async function (string, string2) {
  let display = await page.locator(`[data-testid="${string}"]`).innerText();
  expect(display).toBe(string2)
});

When('the user uncover the square {string} and the square {string}',async function (string, string2) {
  await page.click(`[data-testid="${string}"]`, { force: true });
  await page.click(`[data-testid="${string2}"]`, { force: true });
});

Then('the user wins',async function () {
  let display = await page.locator(`[data-testid="sqTable"]`).getAttribute("win")
  expect(display).toBe("true")
});

Then('the display of the table should be:',async function (docString) {
  let string = mockDataTransformer(docString)
  let board = await boardToString (string)
  await checkBoard (board,string);
});




