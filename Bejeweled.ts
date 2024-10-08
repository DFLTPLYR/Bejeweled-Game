//generate
const generateNumber = () => {
  return Math.floor(Math.random() * 3);
};
//rows
// Game board
const board = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, generateNumber)
);

// Game variables
let score = 0;
let moves = 0;

// Function to swap two gems
function swapGems(x1: number, y1: number, x2: number, y2: number) {
  [board[x1][y1], board[x2][y2]] = [board[x2][y2], board[x1][y1]];
}

// Function to check for sets of three or more identical gems
function checkSets() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (
        j < 3 &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2]
      ) {
        // Remove the set of three gems
        board[i][j] = 0;
        board[i][j + 1] = 0;
        board[i][j + 2] = 0;
        score += 10;
      }
      if (
        i < 3 &&
        board[i][j] === board[i + 1][j] &&
        board[i][j] === board[i + 2][j]
      ) {
        // Remove the set of three gems
        board[i][j] = 0;
        board[i + 1][j] = 0;
        board[i + 2][j] = 0;
        score += 10;
      }
    }
  }
}

// Function to drop new gems from the top
function dropGems() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === 0) {
        board[i][j] = generateNumber();
      }
    }
  }
}

const validateMove = (
  x1: string | number,
  y1: string | number,
  x2: string | number,
  y2: string | number
) => {
  if (x1 != "" || x2 != "" || y1 != "" || y2 != "") {
    return console.log("Invalid input");
  } else swapGems(x1, y1, x2, y2);
};

const hudGui = () => {
  return console.log(
    "\x1b[32m Score: \x1b[0m",
    score,
    "\x1b[34m Moves: \x1b[0m",
    moves
  );
};

const currentBoard = () => {
  hudGui();
  const rowSize = new Array(...board[0].keys());
  const row = "\x1b[31m" + "  " + [...rowSize].join(" ") + "\x1b[0m";
  return console.log(row);
};

const ContainerBoard = () => {
  board.forEach((row, index) => {
    const indx = "\x1b[31m" + index + "\x1b[0m";
    console.log(indx, ...row);
  });
};

// Game loop
while (true) {
  // Print the game board
  console.clear();
  currentBoard();
  ContainerBoard();

  // Ask the player for input
  const input = prompt(
    "Enter the coordinates of the gem you want to swap (x y): "
  );

  const [x1, y1] = input?.split(" ").map(Number) ?? [];
  const [x2, y2] =
    prompt("Enter the coordinates of the gem you want to swap with (x y): ")
      ?.split(" ")
      .map(Number) ?? [];

  // Validate the input
  validateMove(x1, y1, x2, y2);

  // Check for sets of three or more identical gems
  checkSets();

  // Drop new gems from the top
  dropGems();

  // Increment the move counter
  moves++;
  console.log("Score:", score, "Moves:", moves);

  // Check if there are no more moves left
  if (moves > 10) {
    console.log("Game over! Your score is:", score);
    break;
  }
}
