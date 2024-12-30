// script.js

// Correct answers array
const correctAnswers = ["vera", "broadchurch", "scott and bailey", "father brown", "whitechapel", "ludwig", "midsomer murders", "luther", "shetland", "death in paradise", "line of duty", "prime suspect", "the avengers", "a touch of frost", "heartbeat", "inspector morse", "strike", "the bill", "sherlock", "blue lights", "ripper street", "the thin blue line", "code 404", "murder in successville", "piglets"]; // Replace with actual answers
const feedback = document.getElementById("feedback");
const answerInput = document.getElementById("answer");
const scoreDisplay = document.getElementById("score"); // The element to display the score

// Initialize the score (correct answers)
let correctAnswerCount = 0;
const totalQuestions = correctAnswers.length; // Total number of questions (matches the length of correctAnswers)

// Update the score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${correctAnswerCount}/${totalQuestions}`;
}

// Event listener for submit button
document.getElementById("submit").addEventListener("click", () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  
  if (correctAnswers.includes(userAnswer)) {
    correctAnswerCount++; // Increment correct answer count
    feedback.textContent = "Correct! Keep going!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Try again!";
    feedback.style.color = "red";
  }
  
  // Update the score display after each attempt
  updateScore();

  // Clear input field after each submission
  answerInput.value = ""; 
});

// Zoom and Pan Logic with Touch Support
const image = document.getElementById("quiz-image");
const container = document.getElementById("image-container");

let scale = 1; // Initial zoom level
let posX = 0, posY = 0; // Initial position
let isDragging = false;
let startX, startY; // Start positions for dragging

// Function to apply transformations
function updateTransform() {
  image.style.transform = `scale(${scale}) translate(${posX / scale}px, ${posY / scale}px)`;
}

// Zoom In
document.getElementById("zoom-in").addEventListener("click", () => {
  scale = Math.min(scale + 0.1, 3); // Max zoom level: 3
  updateTransform();
});

// Zoom Out
document.getElementById("zoom-out").addEventListener("click", () => {
  scale = Math.max(scale - 0.1, 1); // Min zoom level: 1
  posX = 0; // Reset position when zooming out to min
  posY = 0;
  updateTransform();
});

// Handle Dragging (Mouse and Touch)
function startDrag(e) {
  isDragging = true;
  const event = e.touches ? e.touches[0] : e; // Handle both touch and mouse events
  startX = event.clientX - posX;
  startY = event.clientY - posY;
}

function drag(e) {
  if (!isDragging) return;
  const event = e.touches ? e.touches[0] : e; // Handle both touch and mouse events
  posX = event.clientX - startX;
  posY = event.clientY - startY;
  updateTransform();
}

function endDrag() {
  isDragging = false;
}

// Add Mouse Events
image.addEventListener("mousedown", startDrag);
image.addEventListener("mousemove", drag);
image.addEventListener("mouseup", endDrag);
image.addEventListener("mouseleave", endDrag);

// Add Touch Events
image.addEventListener("touchstart", startDrag);
image.addEventListener("touchmove", drag);
image.addEventListener("touchend", endDrag);

