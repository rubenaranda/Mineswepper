Feature: Mineswepper

Background:
Given a user opens the app

Scenario Outline: Choose a dificulty
When the user choose a <dificulty>
Then the <mine counter> should increse
And the <map width> should increse
And the <map height> should increse

Examples:
|   dificulty   | mine counter |    map width   | map height |
|   easy        |   10         |    8           |   8        |
| intermediate  |   40         |    16          |   16       |
|   expert      |   99         |    30          |   16       |

Scenario: Default display of the app
Then the display shoud show all the squares covered
And the mine counter should be determinated by the dificulty

Scenario: Pressing one square
Given the square is covered
When the user presses the square
Then the square should be uncovered

Scenario: Pressing reset button
When the user presses the reset <button> button
Then all squares should be covered
And the mine counter should be determinated by the dificulty
And the timer should be the null

Scenario Outline: Pressing the right click on the square
Given the square is covered
When when the user clicks the right button more than once up to a maximum of 3 <times>
Then in the square should show the following value: <distintiveIcon>
And the <mine counter> should decrease by one with every marked square 

Examples:
| times   | distintiveIcon   |  
|   1     |      !           |      
|   2     |      ?           |
|   3     |                  |
Scenario: Start the timer
Given all the squares are covered 
And the timer is set at null
When the user presses one square
Then the timer should start to increse

Scenario: Win the game
Given no mine has exploded
When the user has uncovered all the vacant squares
Then the remaining covered squares should uncovered
And the timer should stop
And only the reset <button> should be enabled 

Scenario: Lose the game 
Given one or more vacant squares remaining
When the user has exploded a mine
Then the remaining covered squares should remain uncovered
And the timer should stop
And only the reset <button> should be enabled 

Scenario: Reach the maximum time allowed
Given the timer is running
When time is set to the following value: "999"
Then the timer should be set to: "∞"

Scenario: Pressing a mine
Given the user has click in a uncovered square
When the uncovered square is a mine
Then the game is over
And all the squares containing mines should be revaled

Scenario: Pressing a vacant square
Given the user has click in a uncovered square
When the uncovered square is vacant
Then all squares that do not have an adjacent mine are revealed

Scenario Outline: Pressing a square with an adjacent mine
Given the user has click in a uncovered square
When the uncovered square is vacant
And has a adjacent <mine>
Then in the vacant square should show the <number> of adjacents mines

Examples:
|   mines   |   number  |
|   1       |   1       |
|   3       |   3       |














