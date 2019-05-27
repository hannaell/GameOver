# GameOver

School assignment written in JavaScript and Phaser 3.

## Authors

- [Hanna Ell](https://github.com/hannaell) - Mac
- [Ida Hallner](https://github.com/idahal) - PC

## How to use:

1. Before you start you need to install an [Apache Server](https://www.mamp.info/en/), to run the application.
2. Clone this repository in Github Desktop, or `$ git clone https://github.com/hannaell/GameOver` in the terminal.
3. Open your local web server.
4. In preferences set your Document Root to the Game folder and start your server.
5. Open localhost in your favorite web browser.

## Built with
[Phaser 3](https://phaser.io/)

## Testers (Developers)

- [Isa Areschoug](https://github.com/Neyrin) - Mac
- [Maria Eidland](https://github.com/mariaeid) - PC

## Testers (Non Developers)

- Matthias Gabrielsson (adult)
- Björn Hallner (adult)
- Julie Hallner (child)
- Penny Hallner (child)

## Pull requests

- #1 [Add athors](https://github.com/hannaell/GameOver/pull/1)
- #2 [Setup project](https://github.com/hannaell/GameOver/pull/2)
- #3 Feature. [Add sprite](https://github.com/hannaell/GameOver/pull/3)
- #4 Feature. [Add paddle](https://github.com/hannaell/GameOver/pull/4)
- #5 Feature. [Add bricks](https://github.com/hannaell/GameOver/pull/5)
- #6 Feature. [Ball](https://github.com/hannaell/GameOver/pull/6)
- #7 Update.  [Change sprite](https://github.com/hannaell/GameOver/pull/7)
- #8 Update. [Keep hit_bricks update with master](https://github.com/hannaell/GameOver/pull/8)
- #9 Feature. [Hit bricks](https://github.com/hannaell/GameOver/pull/9)
- #10 Feature. [Add score](https://github.com/hannaell/GameOver/pull/10)
- #11 Update. [Get GameOverupdate to master](https://github.com/hannaell/GameOver/pull/11)
- #12 Feature. [GameOver](https://github.com/hannaell/GameOver/pull/12)
- #13 Feature. [Sound](https://github.com/hannaell/GameOver/pull/13)
- #14 [Add fancy font](https://github.com/hannaell/GameOver/pull/14)
- #15 [Add comments](https://github.com/hannaell/GameOver/pull/15)
- #16 Update. [Get ball update with master](https://github.com/hannaell/GameOver/pull/16)
- #17 Update. [Ball](https://github.com/hannaell/GameOver/pull/17)
- #18 Update. [Get GameOver update to master](https://github.com/hannaell/GameOver/pull/18)
- #19 Update. [Game over](https://github.com/hannaell/GameOver/pull/19)
- #20 [Reset score and lives](https://github.com/hannaell/GameOver/pull/20)
- #21 [Update sprite](https://github.com/hannaell/GameOver/pull/21)
- #22 [Update sprite](https://github.com/hannaell/GameOver/pull/22)
- #23 [Merge pull request](https://github.com/hannaell/GameOver/pull/23)
- #24 [Merge pull request](https://github.com/hannaell/GameOver/pull/24)
- #25 [Sprite](https://github.com/hannaell/GameOver/pull/25)
- #26 [Merge master in to sprite](https://github.com/hannaell/GameOver/pull/26)
- #27 [Get Gameover up to date with master](https://github.com/hannaell/GameOver/pull/27)

#### Feedback

> - script.js:22-27 - You’re using var on several occasions instead of the preferred alternatives let or const.

> - script.js:109 - Save constant values to constants. Easier to work with for you and for other people to read and understand your code.

> - script.js:175-177, 202-204 - Break out repeating code patterns to functions. Remember to keep it dry. 

> - script.js:193 - Instead of reloading the page you could build a game state which would get reset after the user chose to start a new game (like we did in the memory assignment).

> - script.js:3,4 - The size of the canvas could be set according to the size of the client window instead of fixed values. Would make it better for different sized screens.

> - General - Break out the ball instance to its own class and preferably to its own file. This could also be done with other types of instances (i.e tiles & paddle board)

> - General - The create function is very long. It would be easier to understand if it consisted of smaller functions. Same here, break out the code in to smaller pieces.

> - General - You could move script and style files to their own folders for better  folder structure.

> - General - Good use of pull requests, easy to read and understand with the tag system you chose to use.

> - General - Lots of declarative comments, made the code easy to understand.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Credit

Sound from [NoiseForFun.com](https://www.noiseforfun.com/)
