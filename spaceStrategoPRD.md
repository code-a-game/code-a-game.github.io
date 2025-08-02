Product Requirements Document: Space Stratego 

Version: 1.0

Date: 2025-04-01

Status: Done

1. Overview
1.1. Product Goal

Space Stratego is a real-time multiplayer strategy game designed for team-based play. It serves as an engaging activity for corporate team-building, a rewarding project for educational coding classes, or a fun game for coding clubs. The primary objective is to create a well-balanced, graphically appealing, competitive, and fun online game using foundational web technologies (p5.js) without relying on large game engines like Unity.

1.2. Target Audience

Corporate Teams: For "Friday Fun" activities and team-building exercises.

Educational Institutions: As a reward or project for students in "code-a-game" lessons.

Coding Clubs: (e.g., Coding Pirate Club) as a fun, interactive group activity.

1.3. Success Metrics

The game is fully playable in a web browser (e.g., ChromeBook).

The game balance is perceived as fair and competitive by players.

The game is visually appealing and creates an engaging atmosphere.

Multiplayer functionality is stable and supports two teams of up to 15 players each.

2. Technical Specifications
2.1. Core Technology

Language: JavaScript

Library: p5.js

Multiplayer: p5.party library

2.2. Multiplayer Implementation

Connection Endpoint:

Generated javascript
partyConnect("wss://p5js-spaceman-server-29f6636dfb6c.herokuapp.com", "[your-initials-app-name-version]", room);


Data Management: The host-client model will be used. Only the client designated as host by p5.party will update the shared state.

Shared Data Objects:

shared: Global game state, managed by the host.

Examples: gameState, winningTeam, characterList, win counters, game timers, cannons.

Generated javascript
shared = partyLoadShared("shared", {gameState: "GAME-SETUP"});
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

me: Data specific to the local player.

Generated javascript
me = partyLoadMyShared({playerName: "observer"});
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END

guests: An array of me objects from all other connected clients.

Generated javascript
guests = partyLoadGuestShareds();
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END
2.3. Programming Style

The codebase must be clean, organized, and follow an Object-Oriented Programming (OOP) paradigm.

The following classes must be implemented:

BackgroundStarManager

BasicMinimap

BlackHole

Canon

DecorativeStar

Planet

SolarSystem

Spacecraft

YellowStar

3. User Interface (UI) and Screen Layout

Screen Dimensions: 2400px (width) x 1200px (height)

3.1. UI Area Descriptions

The screen is divided into the following functional areas, which are displayed based on the current gameState.

Area Name	Location	Description
Game Background Area	Full Screen (background layer)	A twinkling star background. Contains 20 randomly located DecorativeStars during the START-SCREEN state. These stars can glow and go supernova (a 2-second explosive animation).
Start Screen Area	Left side of the screen	A ring (radius 400px) of 20 small images (120x120px) from the game. Includes a central text description, a username input field, and "Join Purple" / "Join Green" team buttons. Hovering a small image shows a large version (800x800px) and makes a star glow. Clicking it triggers a supernova.
Character Selection Area	Left-hand side	Displays the list of 40 characters for the player's team, showing name and rank. A player's username appears next to a character once selected. Players can only see their own team's list.
Host Area	Upper right corner	Displays the username of the client acting as host and a timer showing elapsed game time since the host started.
Status Area	Top middle	Displays contextual info messages to the player (e.g., "Waiting for Core Commander", "You lost a battle", win/loss announcements).
Game Area	Center, next to Character Selection	A 1200x700px viewport showing a cropped, circular portion of the current planet's map. This is the primary gameplay area where players move their spacecrafts.
Minimap Area	Toggles with Game Area (Spacebar)	Shows the full solar system view: a central orbiting star/black hole and 5 orbiting planets. Player locations are shown as colored circles on the planets. The view is tilted, making distant planets appear smaller. Player perspectives of planet positions differ.
Statistics Area	Next to Character Selection	Visible when not in-game. Displays team win/draw counts, a list of players on each team (and unassigned players), and a "How to play" button that reveals instructions on hover.
Player Controls Area	Bottom of the screen	An overview graphic explaining planet order, warp gates, and key/mouse controls.
Character Details Area	Right-hand side	A visual list of all Space Stratego characters, showing their image, name, rank, battle outcome rules, and special abilities.
4. Game Flow & States

The game operates in one of four main states, managed by shared.gameState.

4.1. START-SCREEN

Visible Areas: Game Background Area, Start Screen Area, Host Area.

Player Actions:

Enter a username.

Join either the Purple or Green team.

State Transition:

When a player selects a team, the game transitions them to GAME-SETUP.

Team join buttons are disabled for a team once it has 15 players.

4.2. GAME-SETUP

Visible Areas: Game Background Area, Character Selection Area, Statistics Area, Status Area, Character Details Area, Player Controls Area, Host Area.

Player Actions:

Players select a character from the Character Selection Area.

Logic:

Initially, only the Core Commander character is selectable.

Once a player on a team selects the Core Commander, the remaining characters for that team are enabled for other players on that team.

A character, once chosen, cannot be selected by another player.

Status Message: "A player from your team must select a Core Commander" is shown until one is chosen. Then, "Waiting for the other team to choose a Core Commander".

State Transition:

Triggered automatically by the host when both teams have a Core Commander.

The Status Area displays "A new game is starting in 5 seconds".

The state changes to IN-GAME.

4.3. IN-GAME

Visible Areas: Game Background Area, Character Selection Area, Game Area / Minimap Area + Character Details Area, Status Area, Host Area.

Player Actions:

Move spacecraft (W, A, S, D).
 
Aim (mouse cursor) and shoot (mouse click).

Toggle between Game Area and Minimap Area + Character Details Area (Spacebar).

Use warp gates to travel between planets.

State Transition:

Triggered by the host when a win/loss/draw condition is met.

The host updates win counters.

The state changes to GAME-FINISHED.

4.4. GAME-FINISHED

Visible Areas: Game Background Area, Character Selection Area, Statistics Area, Status Area, Character Details Area, Player Controls Area, Host Area.

Logic:

The winning team (or "DRAW") is displayed prominently in the middle of the screen.

Game variables are reset (e.g., character selections are cleared, making only Core Commanders selectable again).

State Transition:

Automatically transitions back to GAME-SETUP to allow for the next round to begin.

5. Core Game Mechanics
5.1. Characters & Spacecraft

Representation: Each character is a spacecraft image within a circular boundary for collision detection. A thin life bar is displayed below the spacecraft.

Spawning:

The two Core Commanders spawn at fixed locations next to warp gates on two different planets.

All other characters spawn on the same planet and at the same location as their team's Core Commander at the moment they join the game.

Character Definitions:

Generated javascript
const CHARACTER_DEFINITIONS = [
  { rank: -1, name: "Core Commander", id: "C", count: 1, color: 'purple', isCoreCommand: true, canShoot: true },
  { rank: 10, name: "Star Commander", id: "10", count: 1, color: 'cyan', isStarCommand: true, canShoot: true },
  { rank: 9, name: "Fleet Admiral", id: "9", count: 1, color: 'magenta', canShoot: true },
  { rank: 8, name: "Ship Captain", id: "8", count: 2, color: 'lime' },
  { rank: 7, name: "Squadron Leader", id: "7", count: 3, color: 'teal', canShoot: true },
  { rank: 6, name: "Lt. Commander", id: "6", count: 4, color: 'lavender', canShoot: true },
  { rank: 5, name: "Chief P. Officer", id: "5", count: 4, color: 'maroon' },
  { rank: 4, name: "Night Sniper", id: "4", count: 4, color: 'olive', canShoot: true, canSnipe: true, canCloak: true },
  { rank: 3, name: "Engineer", id: "3", count: 5, color: 'yellow', isEngineer: true },
  { rank: 2, name: "Power Glider", id: "2", count: 8, color: 'purple', canMoveFast: true },
  { rank: 1, name: "Stealth Squad", id: "S", count: 1, color: 'orange', isStealthSquad: true, canCloak: true },
  { rank: 0, name: "Recon Drone", id: "D", count: 6, color: 'brown', isReconDrone: true },
];
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END
5.2. Player Controls

Movement: W (Up), A (Left), S (Down), D (Right).

Aiming: The spacecraft constantly points towards the mouse cursor.

Shooting: Left Mouse Click. (Only for characters with canShoot: true).

View Toggle: Spacebar to switch between Game Area and Minimap Area.

5.3. Battle Mechanics

Engagement: A battle occurs when spacecraft from opposing teams touch.

Resolution:

The character with the higher rank wins.

Exception 1: Stealth Squad (rank 1) defeats Star Commander (rank 10).

Exception 2: Recon Drone (rank 0) draws against all characters except the Engineer (rank 3), to which it loses.

Outcome:

Loss/Draw: The player's spacecraft is removed from the game. The character is removed from the Character Selection Area for the current game. The player can then select a new, available character.

Win: The player's spacecraft remains. The opponent's is removed.

Win/Loss Conditions:

Team Win: A player's spacecraft touches the opponent's Core Commander.

Team Loss: A team's Core Commander has its life bar depleted by bullets.

Team Loss: The player controlling the Core Commander disconnects from the game.

Draw Game: The two Core Commanders battle (touch) each other.

5.4. Warp Gate Mechanics

Functionality: Each of the 5 planets has a fixed "up" and "down" warp gate.

Entering an "up" gate transports the player to the "up" gate on the planet with the next highest index (looping from the last planet to the first).

Entering a "down" gate transports the player to the "down" gate on the planet with the next lowest index (looping from the first planet to the last).

Cooldown: After using any warp gate, a player has a 4-second cooldown before they can use any warp gate again.

Visuals: Warp gates have a pulsating/rotating animation when active. They are static and uncolored when on cooldown for a specific player.

5.5. Cannon Mechanics

Location: The planet with index 0 has three hovering cannons.

Behavior: Each cannon automatically targets and shoots bullets at the nearest player, regardless of team.

Data: Cannon positions, state, and their bullets are stored in the shared object and managed by the host.

6. Additional Features
6.1. Graphics Toggle

Pressing the p key will toggle the display of graphics on and off. This can be used for performance testing or a minimalist view.

7. Assets

All required image assets for backgrounds, spacecraft, planets, and UI elements are available and ready for use. 