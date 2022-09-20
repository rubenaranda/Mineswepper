Feature: Mineswepper

"1, 2" means row 1 column 2
x stands for cell with a bomb
o stands for an empty cell
- stands for another row

Background:
Given a user opens the app


Scenario: Default display of the app
Then the display shoud show a table with height "8" and width "8"
And all the square should be covered
And the timer should be null
And the mine counter should be at "10" 

Scenario: Uncover a square: -> Uncover a square without a mine
Given the following mockdata is loaded: "oox-xox"
When the user uncover the square "1,1"
Then the square should be uncovered
And the game should countinue

Scenario: Uncover a square: -> Uncover a square with a mine
Given the following mockdata is loaded: "oox-xox"
When the user uncover the square "1,3"
Then the game is over
And all the squares containing mines should be revaled

Scenario: Tagging a square: -> Tagging a sqaure with an exclamation mark
Given mine counter is "10"
When the user taggs the square "1,1"
Then in the square "1,1" should appear an exclamation mark
And the mine counter should decrase by one for every marked square

Scenario: Tagging a square: -> Tagging a square with an interrogation mark
Given mine counter is "9"
When the user taggs the square "1,1"
Then in the square "1,1" should appear an interrogation mark
And the mine counter should increases by one for every marked square

Scenario: Tagging a square: -> Untagging a square
Given mine counter is "8"
When the user untags the square "1,1"
Then the square "1,1" should appear as covered square
And the mine counter should increases by one

Scenario: Tagging a square: -> Limit on the mine counter


Scenario Outline: Uncover a square: -> Uncover an empty square with one or more adjacent mines
Given the following mockdata is loaded: <mockdata>
When the user uncover the square "2,3"
Then in the uncover square should contain the <number> of adjacent mines

Examples:
|   mockdata          |   number  |
|   ooo-xoo-ooo       |   1       |
|   ooo-xox-ooo       |   2       |
|   oox-xox-ooo       |   3       |
|   oox-xox-xoo       |   4       |
|   oxx-xox-xoo       |   5       |
|   oxx-xox-xxo       |   6       |
|   xxx-xox-xxo       |   7       |
|   xxx-xox-xxx       |   8       |

Scenario: Win the game when no mines are revealed
Given the following mockdata is loaded: "oox"
When the user uncover the square "1,1"
Then the user wins the game
And the remaining covered squares should uncovered

Scenario: Game is Over
When a mine has been revealed
Then all the squares containg a mine should be uncovered
And the user cant do anything except reset the app

Scenario:Time counter: -> Start the time counter when reveal a square
Given the time counter is set null
When the user uncover the square "1,1"
Then the time counter should start increases by one for every second passed

Scenario:Time counter: -> Start the time counter when tagging a square
Given the time counter is set null
When the user taggs the square "1,1"
Then the time counter should start increases by one for every second passed
And the mine counter should decrase by one

Scenario: Time counter: -> Reach the maximum time allowed
Given the time counter is running
When the time counter has reached the following value "999"
Then the time counter should be set to "∞" 

Scenario: The user use the reset button to reset the app
When the user use the reset button
Then all the square should be covered
And the mine counter should be set to "10"
And the time counter should be set to null

Scenario: Uncover a square: -> Uncover an empty square with no mine adjacent
Given the following mockdata is loaded: "ooo-ooo-oox" 
When the user uncover the square "1,1"
Then all squares without mine adjacent should be uncover

















