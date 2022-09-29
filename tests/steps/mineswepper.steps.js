const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = 'http://127.0.0.1:5500/src/html/mineswepper.html';
const mockdata = "http://127.0.0.1:5500?mockData=oox-xox"

Given("a user opens the game",async function() {
    await page.goto(url);
})


// 1 Scenario: Uncover a square: -> Uncover a square without a mine
Given('the following mockdata is loaded: {string}', async function (mockData) {
    await page.goto(mockdata + '?mockData=' + mockData);
  })
 When('the user un cover the square {string}',async function (string) {
    // Write code here that turns the phrase above into concrete actions  
  });


  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const mockData = urlParams.get('mockData')

  