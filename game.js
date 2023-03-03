// Define game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Create game object
const game = new Phaser.Game(config);

// Define variables
let player;
let platforms;
let cursors;
let score = 0;
let scoreText;

// Define preload function
function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });
}

// Define create function
function create() {
  // Add sky background
  this.add.image(400, 300, "sky");
  
  // Create platforms group
  platforms = this.physics.add.staticGroup();
  
  // Add ground platform
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  
  // Add floating platforms
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
  
  // Add player sprite
  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
  // Add player animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "turn",
    frames: [ { key: "dude", frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Add cursor key inputs
  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down

   

