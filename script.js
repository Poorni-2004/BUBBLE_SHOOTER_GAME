const gameArea = document.getElementById("gameArea");
let score = 0;

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = Math.random() * (gameArea.clientWidth - 30) + "px";
    gameArea.appendChild(bubble);

    // Move bubble upwards
    let moveBubble = setInterval(() => {
        const bubblePosition = parseInt(bubble.style.bottom || "0");
        bubble.style.bottom = bubblePosition + 1 + "px";  // Adjust speed here

        if (bubblePosition > gameArea.clientHeight) {
            clearInterval(moveBubble);
            bubble.remove();
        }
    }, 20);

    bubble.addEventListener("click", () => {
        score += 10;
        updateScore();
        bubble.remove();
        clearInterval(moveBubble);
    });
}

function updateScore() {
    document.getElementById("score").innerText = score;
}

// Generate bubbles every 2 seconds
setInterval(createBubble, 2000);

// Save score function
async function saveScore() {
    const username = document.getElementById("username").value;

    if (!username) {
        alert("Please enter your name");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, score })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("Score saved successfully!");
        } else {
            console.error("Failed to save score:", data.error);
            alert("Failed to save score");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while saving the score");
    }
}
