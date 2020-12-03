const World = Matter.World;
const Engine =  Matter.Engine;
const Bodies = Matter.Bodies;


var christmas_tree,tree_img; 
var lights_img, lights_group;
var plr, playerIMG;
var restart, restartIMG;
var bad_lights, bad_lightsgroup;
var explosion, explosions;
var bg, bg2;
var myAudio,explosionad,ding;

var PLAY = 1;
var END = 0;
var Gamestate = PLAY;

var score = 0;

function preload(){
    tree_img = loadImage("tree.png");
    lights_img = loadImage("lights1.png");
    playerIMG = loadImage("Player.png");
    bad_lights = loadImage("lights.png");
    explosion = loadImage("explosion.png");
    restartIMG = loadImage("restart.png")
    bg = loadImage("bg.jpg");
}

function setup(){
    createCanvas(1000,1000);
    engine = Engine.create();
    world = engine.world;
    
    lights_group = new Group();
    bad_lightsgroup = new Group();

    bg2 = createSprite(500,500,1000,1000);
    bg2.addImage(bg);
    bg2.scale = 2

    christmas_tree = createSprite(500,500,100,190);

    myAudio = new Audio('https://www.8notes.com/school/mp32/piano/jingle_bells.mp3');
    explosionad = new Audio('explosion.mp3');
    ding = new Audio('ding.mp3')
        
    plr = createSprite(500,500,100,100);
    plr.addImage(playerIMG);
    plr.scale = 0.2;

    restart = createSprite(470,150,50,50);
    restart.addImage(restartIMG)
    restart.scale=0.2;

}

function draw(){
    background(255,255,255);
    Engine.update(engine);

    if(Gamestate === PLAY){
        restart.visible = false;
        christmas_tree.addImage(tree_img)
        christmas_tree.scale = 1.75;
        plr.y = mouseY;
        plr.x = mouseX;
        myAudio.play();

        if(frameCount %50 === 0){ 
        var randX = Math.round(random(300,600));
        var randY = Math.round(random(300,700));
        var lights = createSprite(randX,randY,10,10);
        lights.addImage(lights_img);
        lights.scale = 0.15;
        lights_group.add(lights);
        lights_group.setLifetimeEach(20);
        
    }
    if(frameCount %80 === 0){ 
        var randX = Math.round(random(300,600));
        var randY = Math.round(random(300,700));
        var lights = createSprite(randX,randY,10,10);
        lights.addImage(bad_lights);
        lights.scale = 0.15;
        bad_lightsgroup.add(lights);
        bad_lightsgroup.setLifetimeEach(20);
        
    }
    if(lights_group.isTouching(plr)){
        lights_group.setLifetimeEach(0);
        score = score + 1
        ding.play();
    }

    if(bad_lightsgroup.isTouching(plr)){
        Gamestate = END;
        explosionad.play();
    }
} 
console.log(score)
drawSprites();
if(Gamestate === END){
    myAudio.pause();

    christmas_tree.addImage(explosion);
    fill(255,0,0);
    textSize(34);
    text("Game Over",375,100)
    restart.visible = true;
    if(mousePressedOver(restart)){
    reset();
}
}

    fill(0,255,0);
    textSize(25);
    text("Score: " + score, 100,800);
    fill(255,0,0);
    text("TIP: Dont touch the red lights!", 620,900)
}

function reset(){
  
    Gamestate = PLAY;
  
    score = 0;
}  