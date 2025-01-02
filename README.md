# Kaplay Brakeout Game

This is a simple game created with [Kaplay](https://kaplay.dev/), a JavaScript game engine. The objective of the game is to destroy all the bricks with a ball controlled by a paddle.

## Installation

1. Clone the repository:
    ```sh
    git clone <REPOSITORY_URL>
    cd retro-Breakout-game
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

### Development

To start the development server, run:
```sh
npm run dev
```

### Build

To build the project for production, run:
```sh
npm run build
```

### Preview

To preview the production build, run:
```sh
npm run preview
```

## Project Structure

- `index.html`: Main HTML file.
- `src/main.ts`: Main game code.
- `src/style.css`: Game CSS styles.
- `public/fonts/arcade.ttf`: Font used in the game.
- `public/shaders/ctr.frag`: Shader used for visual effects.
- `tsconfig.json`: TypeScript configuration.
- `.gitignore`: Files and directories ignored by Git.

## Game Controls

- **Left**: Move the paddle to the left.
- **Right**: Move the paddle to the right.
- **Space**: Restart the game after a Game Over.

## License

This project is licensed under the [MIT License](LICENSE).
