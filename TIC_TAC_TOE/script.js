let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let turnO = true; // playerX, playerY
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], // Fixed: was [3, 4, 6]
    [3, 4, 5], // Added missing pattern
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        // Prevent clicking if game is over or box is already filled
        if (gameOver || box.innerText !== "") {
            return;
        }
        
        console.log("Box was pressed");
        if (turnO) {
            box.innerText = "O";
            turnO = false; // next turn will be X
        } else {
            box.innerText = "X";
            turnO = true; // next turn will be O
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        
        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            gameOver = true;
            console.log("Winner = " + pos1); // Fixed: proper logging
            
            // Disable all boxes
            boxes.forEach(box => box.disabled = true);
            
            if (pos1 === 'O') { // Fixed: use pos1 directly and proper comparison
                // Create the heading element
                const victory = document.createElement('h1');
                // Add the class for styling
                victory.classList.add('WinnerTag');
                // Set the text
                victory.innerText = 'WINNER: Player 1 (O)';
                // Set data-text attribute for the CSS ::before animation
                victory.setAttribute('data-text', 'WINNER: Player 1 (O)');
                // Append it to the body
                document.body.appendChild(victory);
            }
            if (pos1 === "X") { // Fixed: use pos1 and correct case
                // Create the heading element
                const victory = document.createElement('h1');
                // Add the class for styling
                victory.classList.add('WinnerTag');
                // Set the text
                victory.innerText = 'WINNER: Player 2 (X)';
                // Set data-text attribute for the CSS ::before animation
                victory.setAttribute('data-text', 'WINNER: Player 2 (X)');
                // Append it to the body
                document.body.appendChild(victory);
            }
            return;
        }
    }
    
    // Check for tie
    let filledBoxes = 0;
    boxes.forEach(box => {
        if (box.innerText !== "") {
            filledBoxes++;
        }
    });
    
    if (filledBoxes === 9 && !gameOver) {
        gameOver = true;
        const victory = document.createElement('h1');
        victory.classList.add('WinnerTag');
        victory.innerText = 'TIE GAME!';
        victory.setAttribute('data-text', 'TIE GAME!');
        document.body.appendChild(victory);
    }
};
// Reset button functionality
reset.addEventListener('click', () => {
    // Reset all game variables
    turnO = true;
    gameOver = false;
    
    // Clear all boxes and re-enable them
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    
    // Remove any winner announcement
    const existingWinner = document.querySelector('.WinnerTag');
    if (existingWinner) {
        existingWinner.remove();
    }
    
    console.log("Game reset!");
});