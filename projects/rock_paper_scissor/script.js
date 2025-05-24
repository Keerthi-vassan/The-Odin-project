let totalRounds;
let currentRound = 1;
let humanScore = 0;
let computerScore = 0;

window.onload = () => {
    totalRounds = parseInt(prompt("Enter the number of rounds you want to play"));
    if (isNaN(totalRounds) || totalRounds <= 0) {
        alert("Number of rounds is set to 5 by default.");
        totalRounds = 5;
    }
    document.getElementById("round-number").innerText = `Round ${currentRound}`;
    document.getElementById("player-choice").src = "./images/placeholder.jpeg"; // Default image
    document.getElementById("computer-choice").src = "./images/placeholder.jpeg"; // Default image
};

function getComputerChoice() {
    let choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * 3)];
}

function updateImages(humanChoice, computerChoice) {
    document.getElementById("player-choice").src = `./images/${humanChoice}.jpg`;
    document.getElementById("computer-choice").src = `./images/${computerChoice}.jpg`;
}

function playRound(playerChoice) {
    console.log(`Player chose: ${playerChoice}`);
    const computerChoice = getComputerChoice();
    console.log(`Computer chose: ${computerChoice}`);
    updateImages(playerChoice, computerChoice);

    let resultText = "";
    if (playerChoice === computerChoice) {
        resultText = "It's a draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) {
        humanScore++;
        resultText = `You win! ${playerChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        resultText = `Computer wins! ${computerChoice} beats ${playerChoice}`;
    }
    console.log(`Result: ${resultText}`);
    document.getElementById("result-text").innerText = resultText;
    document.getElementById("Score").innerText = `Score: ${humanScore} | ${computerScore}`;

    if (humanScore === totalRounds || computerScore === totalRounds) {
        announceWinner();
    } else {
        currentRound++;
        document.getElementById("round-number").innerText = `Round ${currentRound}`;
    }
}

function announceWinner() {
    const resultText = humanScore > computerScore ? "You are the winner!" : "Computer wins!";
    document.getElementById("result-text").textContent = `Game Over! ${resultText}`;

    // Disable buttons
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissor").disabled = true;

    // Reload the page after 3 seconds
    setTimeout(() => {
        location.reload();
    }, 3000);
}

document.getElementById("rock").addEventListener("click", () => {
    console.log("Rock button clicked");
    playRound("rock");
});
document.getElementById("paper").addEventListener("click", () => {
    console.log("Paper button clicked");
    playRound("paper");
});
document.getElementById("scissor").addEventListener("click", () => {
    console.log("Scissor button clicked");
    playRound("scissor");
});