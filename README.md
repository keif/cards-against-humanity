Play the Game Now! | http://www.cardiparty.co/ - (under construction) 

___
[//]: # (Build: [![CircleCI]&#40;https://circleci.com/gh/yusufameri/cards-against-humanity/tree/master.svg?style=svg&#41;]&#40;https://circleci.com/gh/yusufameri/cards-against-humanity/tree/master&#41;)
# Welcome to Cards Against Humanity on Mobile!
This project represents a mobile version of the popular party card game we all know and love, "**Cards Against Humanity!**"

The game is simple! The person who plays the funniest card wins! For more info on intricate versions of the game, checkout the [official rulebook](https://s3.amazonaws.com/cah/CAH_Rules.pdf) from the creators.

Although this game will be available to play online, it is meant to be played in person with friends, for those times we forget to carry that 5 lb brick of cards :P

## Development Setup

### Prerequisites
1. Node.js (v18.16.0) - if using [`nvm`](https://github.com/nvm-sh/nvm) run `nvm use`

### Setup
1. Clone the repo
2. run `yarn` to get all the dependencies

## Developing Roadmap
### Iteration 1:
The first iteration of this project will be released in the form of a mobile game, experienced via a users mobile web browser (Chrome/Firefox for most Android users, and Safari for most iOS users). The game will be cross platform and available to play for anyone, free of charge, as long as they have an internet connection and a group of friends to play with! This has the immediate benefit that users who have different phone's can play with each other without having to wait for their version of the app to be released. 
### Iteration 2:
I hope to offer this game natively on the App Store and Android Play Store (with react-native) under a different name, due to licensing, once I have created the basic web version.

## Proposed Tech Stack
These are the preliminary tech stacks that I have planned to use, subject to change.
### Frontend
1. React.js
2. Vanilla CSS
3. Socket.io


### Backend
1. Node.js (Express.js)
2. Socket.io
3. Redis (for fast, in memory real time game state data)
4. MongoDB (for longer term game history data)


### Infrastructure
TBD

## Current Project Progress
I just discovered this, and it's an idea a few friends have been toying with. I'm using this as the basis to kick something off, we'll see how much of the original code will be retained.

## Extra goodies and features
Although the basic mvp of this project need not be complicated, here are a few extra goodies that can make the app shine!

* facebook/instagram login
* facebook/instagram sharing capability
* save card play to local images
* user gameplay reaction (w/Emoji's :))
* Add different game modes as described in the [handbook](https://s3.amazonaws.com/cah/CAH_Rules.pdf)

## Wireframes
Take a look at the [Figma](https://www.figma.com/file/IYczZI8lUrWHNwh7E17qBr/Cards-Against-Humanity?type=design&node-id=0%3A1&mode=design&t=gbHl9zHtVGVM7hST-1) created and try out the prototype option to see the game in action before its created!

Below are some Screenshots and the story board for user interactions:

#### 1. User enters the site from mobile browser
![1](prototype/images/Screen1.png)

#### 2a. User Creates a party
![1](prototype/images/Screen2a.png)

#### 2b. User Joins an existing party
![1](prototype/images/Screen2b.png)

#### 3a. Round Starts and User is NOT the Card Czar
User will select/drag-and-drop their best/funniest white card based on the current black card in play.  
![1](prototype/images/Screen3a.png)

#### 3.a The Card Czar sees a "Waiting Screen"
Nothing much for them to do but wait...  
![1](prototype/images/Screen3b.png)

#### 4a. Round finishes and everyone views the white cards played
![1](prototype/images/Screen4a.png)

#### 4b. Judge chooses their favorite card
![1](prototype/images/Screen4b.png)

#### 5. Round Winner is Chosen!
![1](prototype/images/Screen6.png)

#### 6. Round Restarts and Everyone sees the Scoreboard
![1](prototype/images/Screen5.png)



___

###### Disclaimer:
After I had made a few initial wireframes for this project, I researched and found out that a similar idea, called Cards Against Originality, existed some years ago. It's hard to find any remnants of this project online, but as for the licensing purposes, Cards Against Humanity is under the Creative Commons licenses and as such, I do not intend to make money of this project or sell it in any way. This is purely for educational purposes.
