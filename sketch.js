  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  ghost.debug = true;
  ghost.setCollider('rectangle', 0, 0, 150, 200, 180);
}


function draw() {
  background('gray');

  if (gameState === "play") {

    if(tower.y > 600){
      tower.y = 300
    } 

    tower.velocityY = 1;
    
    if(keyDown("left")){
        ghost.x = ghost.x - 3;
    }
    if(keyDown("right")){
          ghost.x = ghost.x + 3;  
    }
    if(keyDown("up")){
         ghost.velocityY = -10;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
    
      spawnDoors();

     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.visible = false;
      gameState = "end";
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    textAlign(CENTER,CENTER)
    text("Game Over", 300,250)
    textSize(20);
    text("Press R to restart", 300,300)

    if (keyDown('r')) {
      gameState = "play";
      ghost.visible = true;
      ghost.y = 300;
    }
  }
}

function spawnDoors()
 {
  if (frameCount % 240 === 0) {
    var door = createSprite(random(100,500), -50);
    var climber = createSprite(door.x,10);
    var invisibleBlock = createSprite(door.x,climber.y+10);
    invisibleBlock.visible = false; 
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.depth = ghost.depth-1;

    door.lifetime = 800;
    invisibleBlock.lifetime = 800;
    climber.lifetime = 800;

     doorsGroup.add(door);
 //   invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
