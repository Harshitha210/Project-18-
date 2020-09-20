var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var jungle, jungleImg, ground;

var bananaGroup,bananaImg;
var obstaclesGroup, stoneImg;

var gameOver, gameOverImg, restart, restartImg;

var survivalTime;
var touchCount = 0;

function preload(){
  
  monkey_running =loadAnimation( "monkey.png",          "monkey1.png", "monkey2.png","monkey3.png",  "monkey4.png","monkey5.png","monkey6.png", "monkey7.png"   ,"monkey8.png", "monkey9.png" );
  
  monkey_collided = loadImage("monkey_collided.png");
  
  jungleImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  
  
  jungle = createSprite(200,380,800,10);
  jungle.addImage("jungle", jungleImg);
  jungle.x = jungle.width /2;
  jungle.velocityX =-4;
  jungle.scale = 1.3;
  
  ground = createSprite(200,200,800,10);
  ground.visible = false;
 
  monkey = createSprite(50,170,400,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  

  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.3;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  survivalTime = 0;
  
}




function draw() {
  background("blue");
 if(gameState === PLAY){
   
   if(keyDown("space") && monkey.y > 120){
      monkey.velocityY = -15;
    }
     
     monkey.velocityY = monkey.velocityY + 0.8;
   
    if(jungle.x < 0){
    jungle.x = jungle.width /2;
    }
   
   if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    }
  
   switch(survivalTime){
    case 10: monkey.scale = 0.11  ;
      break;
    case 20: monkey.scale = 0.12;
      break;
    case 30: monkey.scale = 0.13;
      break;
    case 40: monkey.scale = 0.14;
      break;
    case 50: monkey.scale = 0.15;
      break
    default: break;
    }
   
   if(monkey.isTouching(obstaclesGroup)){
    monkey.scale = 0.1; 
     obstaclesGroup.destroyEach();
     touchCount = touchCount + 1;
    
    }
   //console.log("touchCount" , touchCount);
   
   if(touchCount === 2){
         gameState = END;
       }
   
     spawnBananas();
  
     spawnObstacles();
 }
  
 else if (gameState === END){
    
    gameOver.visible = true;
    restart.visible = true;
    
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("collided", monkey_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
   
   touchCount = 0;
  }
  
  //console.log(monkey.y);
  
  
  
   
  monkey.collide(ground);
  
 drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("survival time: " + survivalTime, 350,20);
}

function reset(){
  
   gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  jungle.velocityX=-4;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running", monkey_running);
  
  survivalTime=0;
}

function spawnBananas(){
  
  if(frameCount % 200 === 0){
    
    
    var banana = createSprite(600,120,40,10);
    banana.addImage("Banana", bananaImg);
    banana.y = Math.round(random(60,100));
    banana.scale = 0.05;
    banana.velocityX=-4;
    banana.lifetime =200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
    
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    
    var stone = createSprite(600,180,40,10);
    stone.addImage("Stone", stoneImg);
    stone.scale=0.1;
    
    stone.velocityX=-4;

    
    stone.lifetime=200;
    
     
    obstaclesGroup.add(stone);
  }
}

