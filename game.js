// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define player object
const player = {
  x: 50,
  y: 50,
  speed: 5,
  width: 50,
  height: 50,
  color: "blue"
};

// Define key listener function
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp") {
    player.y -= player.speed;
  } else if (event.code === "ArrowDown") {
    player.y += player.speed;
  } else if (event.code === "ArrowLeft") {
    player.x -= player.speed;
  } else if (event.code === "ArrowRight") {
    player.x += player.speed;
  }
});

// Define update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Request next frame
  requestAnimationFrame(update);
}

// Request first frame
requestAnimationFrame(update);
