Feature: Mineswepper


Data for Mockdata:
"1, 2" means row 1 column 2
"x" stands for cell with a mine
"o" stands for cell without a mine
"-" stands for another row
"!" stands for  mined tag
"?" stands for inconclusive tag

Data for the display:
"-" stands for another row
"!" stands for  mined tag
"?" stands for inconclusive tag
"." stands for cover square
"0" stands for an empty square
"*" stands for an mined square
"1" stands for a cell with 1 mine adjacent
"2" stands for a cell with 2 mine adjacent
"3" stands for a cell with 3 mine adjacent
"4" stands for a cell with 4 mine adjacent
"5" stands for a cell with 5 mine adjacent
"6" stands for a cell with 6 mine adjacent
"7" stands for a cell with 7 mine adjacent
"8" stands for a cell with 8 mine adjacent

Background:
Given a user opens the game

@manual
Scenario: Default state of the game
Then the game shoud show a table with height "8" and width "8"
And all the squares should be covered
And the timer should be empty
And the non tagged mine counter should be "10"

Scenario: Uncover a square: -> Uncover a square without a mine
Given the following mockdata is loaded: "oox-xox"
When the user uncover the square "1,1"
Then the square "1,1" should be uncovered

Scenario: Uncover a square: -> Every time the user uncover a cell, the cell is disabled
When the user uncover the square "1,1"
Then the square "1,1" should be disabled

Scenario: Uncover a square: -> Uncover a square with a mine
Given the following mockdata is loaded: "oox-xox"
When the user uncover the square "1,3"
Then the square "1,3" should show an explosion simbol

Scenario: Tagging a square: -> When a user thinks the square contains a mine then user can tag the square as mined
Given non tagged mine counter is "10" 
When the user taggs as mined the square "1,1" 
Then in the square "1,1" should appear a mined simbol
And the non tagged mine counter should be "9"


Scenario: Tagging a square: -> When the user dont have enough information about the square can tag it as inconclusive
Given non tagged mine counter is "10"
When the user taggs as inconclusive the square "1,1"
Then in the square "1,1" should appear a inconclusive simbol
And the non tagged mine counter should be "10"

Scenario: Tagging a square: -> Untagging a square tagged as inconclusive
Given the user tags as inconclusive the square "1,1"
And non tagged mine counter is "10"
When the user untags the square "1,1"
Then the square "1,1" should appear as covered square
And there is no simbol in the square "1,1"
And the non tagged mine counter should be "10"

Scenario: Tagging a square: -> When the user tags as mined a square that is already tagged as mined
Given non tagged mine counter is "10"
And the square "1,1" is tagged as mined
When the user tags the square "1,1" as mined again
Then in the square "1,1" should appear a inconclusive simbol
And the non tagged mine counter should be "10"


Scenario: Tagging a square: -> When the user tags as mined more squares than the non taged mine counter  
Given the following mockdata is loaded: "oxo-oxo-ooo" 
When the user tags the square "1,1","1,3","2,1"
Then the non tagged mine counter should be "-1"


Scenario Outline: Uncover a square: -> Uncover an empty square with one or more adjacent mines
Given the following mockdata is loaded: "<mockdata>"
When the user uncover the square "2,2"
Then in the square "2,2" should contains this number of adjacent mines: "<numbers>"

Examples:
|   mockdata          |   numbers  |
|   ooo-xoo-ooo       |   1        |
|   ooo-xox-ooo       |   2        |
|   oox-xox-ooo       |   3        |
|   oox-xox-xoo       |   4        |
|   oxx-xox-xoo       |   5        |
|   oxx-xox-xxo       |   6        |
|   xxx-xox-xxo       |   7        |
|   xxx-xox-xxx       |   8        |


Scenario: Win the game when the user reveal all the squares that no contains a mine
Given the following mockdata is loaded: "oxo"
When the user uncover the square "1,1" and the square "1,3"
Then the user wins

Scenario: Game is Over
Given the following mockdata is loaded: "oxo-oox-xox"
When the user uncover the square "1,2"
Then the square "2,3", "3,1" and "3,3" should be uncovered
And all the squares should be disabled

@manual
Scenario:Time counter: -> Start the time counter when reveal a square
Given the time counter is empty
And the following mockdata is loaded: "oox"
When the user uncover the square "1,1"
Then the time counter should start increases by one for every second passed

@manual
Scenario:Time counter: -> Start the time counter when tagging a square
Given the time counter is empty
When the user taggs the square "1,1"
Then the time counter should start increases by one for every second passed

@manual
Scenario: Time counter: -> When the user starts the timer uncovering or taging a square and reaches the max time allowed
Given the following mockdata is loaded: "oxo-oox-xox"
And the max time allowed is "10"
When the user uncovered the square "1,1"
And the user tagged as inconclusive the square "1,2"
And the time counter reaches "10"
Then the time counter should be "∞" 

@manual
Scenario: Time counter: -> When the user wins the game the time counter stops
Given Given the following mockdata is loaded: "ox"
When the user uncovered the square "1,1"
Then the time counter shoud stop
@manual
Scenario: Time counter: -> When the user lose the game the time counter stops
Given the following mockdata is loaded: "oxo-oox-xox"
When the user uncover the square "1,2"
Then the time counter shoud stop
@manual
Scenario: The user use the reset button to reset the game
When the user use the reset button
Then the game should restore to the default state

Scenario: Uncover a square: -> When the user uncovers a empty square, the adjacent squares should be uncover
Given the following mockdata is loaded:
"""
ooo
ooo
ooo
xxx
""" 
When the user uncover the square "2,2"
Then the display of the table should be:
"""
000
000 
232
...
"""











