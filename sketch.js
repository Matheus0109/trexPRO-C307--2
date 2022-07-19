var JOGAR = 1;

var ENCERRAR = 0;

 var estadodoJogo = JOGAR;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var cactus1, cactus2, cactus3, cactus4 ,cactus5, cactus6;

var newImage;

var grupoCactus, grupoNuvems

var restarttImage;

var restart;

var gameOver;

var gameOverImage

var pontuacao = 0

var puloSom, checkpointSom, morteSom

var tempo = 0





function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");

restartImage = loadImage("restart.png");

gameOverImage = loadImage("gameOver.png");

puloSom = loadSound("jump.mp3");
checkpointSom = loadSound("checkpoint.mp3");
morteSom = loadSound("die.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight );

  ground = createSprite(width/2,height-120,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  trex = createSprite(50,ground.y-40,20,50);
  trex.setCollider("circle", 0, 0 ,40);
  trex.debug = false;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colidiu",trex_collided)
  trex.scale = 0.5;
  
  invisibleGround = createSprite(200,ground.y,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)

grupoCactus = createGroup()
grupoNuvems = createGroup()

restart = createSprite(width/2, height/2);

restart.addImage(restartImage)

gameOver = createSprite(restart.x, restart.y-80);

gameOver.addImage(gameOverImage)

gameOver.visible = false;

restart.visible = false;

}

function draw() {
  background(180);

  if(tempo >0 && tempo % 2==0){

    background("skyblue");
    
    grupoNuvems.destroyEach();

  }

  text("pontuação: "+pontuacao, 400, 30)

  text("tempo: "+tempo, 400, 50)
  
  if(estadodoJogo == JOGAR){

    
  
  pontuacao = pontuacao + Math.round(frameRate()/60)
  tempo = Math.round(pontuacao/300);

  //if(score > 0 && score  )

    if(touches.lenght > 0 || keyDown("space")&& trex.y >= ground.y-100) {
      trex.velocityY = -10;
      puloSom.play();
     touches = []
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    ground.velocityX = -(2 + 1* pontuacao/200);

    gameOver.visible = false;

    restart.visible = false;

    if (ground.x < 0){
      ground.x = ground.width/2;

      
    }
    
    spawnCactus();

    spawnClouds();
    
    if(grupoCactus.isTouching(trex)){
     estadodoJogo = ENCERRAR

      

    }
   
  }else if(estadodoJogo == ENCERRAR){

    ground.velocityX = 0
    grupoNuvems.setVelocityXEach(0)
    grupoCactus.setVelocityXEach(0)
    trex.changeAnimation("colidiu",trex_collided)
    gameOver.visible = true;
    restart.visible = true;
    grupoCactus.setLifetimeEach(-1);
    grupoNuvems.setLifetimeEach(-1)
    trex.velocityY = 0;

  if(mousePressedOver(restart)){

   RESET()


  }
  }

  trex.collide(invisibleGround);
    
    drawSprites();

    if(keyDown("L")){
estadodoJogo = ENCERRAR

    }
  
}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(width,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    grupoNuvems.add(cloud)
    
    //atribua tempo de vida à variável
    cloud.lifetime = 10000
    
    //ajustar a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function spawnCactus(){

  if(frameCount % 80 ==0){

    var cactus = createSprite(width, ground.y-18, 20, 20);

    cactus.velocityX = -2

    cactus.scale = 0.6;

    var rand = Math.round(random(1,6));

    switch(rand){

      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break;
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus4);
      break;
      case 5: cactus.addImage(cactus5);
      break; 
      case 6: cactus.addImage(cactus6);
      break;
      default:break;
}

cactus.lifetime = 1000;
grupoCactus.add(cactus)

}

}

function RESET(){

  gameOver.visible = false;

  restart.visible = false;

  estadodoJogo = JOGAR

  grupoCactus.destroyEach();

  grupoNuvems.destroyEach();

  trex.changeAnimation("running", trex_running);

}


