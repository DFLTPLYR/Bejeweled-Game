//generate
const generateNumber = () => {
  return Math.floor(Math.random() * 3);
};
//rows
// Game board
const board = [
  [
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
  ],
  [
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
  ],
  [
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
  ],
  [
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
  ],
  [
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
    generateNumber(),
  ],
];

// Game variables
let score = 0;
let moves = 0;

// Function to swap two gems
function swapGems(x1, y1, x2, y2) {
  if (
    x1 === undefined ||
    y1 === undefined ||
    x2 === undefined ||
    y2 === undefined
  ) {
    return "impossible move";
  }

  const temp = board[x1][y1];
  board[x1][y1] = board[x2][y2];
  board[x2][y2] = temp;
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

// Game loop
while (true) {
  // Print the game board
  board.forEach((row) => console.log(row.join(" ")));

  // Ask the player for input
  const input = prompt(
    "Enter the coordinates of the gem you want to swap (x y): "
  );
  const [x1, y1] = input?.split(" ").map(Number) ?? [];
  const [x2, y2] =
    prompt("Enter the coordinates of the gem you want to swap with (x y): ")
      ?.split(" ")
      .map(Number) ?? [];

  // Swap the gems
  swapGems(x1, y1, x2, y2);

  // Check for sets of three or more identical gems
  checkSets();

  // Drop new gems from the top
  dropGems();

  // Increment the move counter
  moves++;

  // Check if there are no more moves left
  if (moves > 100) {
    console.log("Game over! Your score is:", score);
    break;
  }
}
