var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["f8f26d9e-b118-4f33-ad21-96e3a97dee4a","f409b247-5c43-48e5-bb95-d08a75efb733","6c9159a3-09f9-4105-95e5-3b10ac45cf70","8887a030-5278-42d4-88a4-c1c2827c8ac1","c5c59765-817f-44c5-9f23-092ec14ea7bd","fd40f3e8-c978-4e1c-b30b-cece3bdbdfc0","f68862a7-d627-4b10-b760-343989c770e3"],"propsByKey":{"f8f26d9e-b118-4f33-ad21-96e3a97dee4a":{"name":"asteroid","sourceUrl":null,"frameSize":{"x":20,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"bG9CE6tvVhINp_Nkta0BU8tsSgVI4Ov3","loadedFromSource":true,"saved":true,"sourceSize":{"x":20,"y":20},"rootRelativePath":"assets/f8f26d9e-b118-4f33-ad21-96e3a97dee4a.png"},"f409b247-5c43-48e5-bb95-d08a75efb733":{"name":"explosion","sourceUrl":null,"frameSize":{"x":96,"y":93},"frameCount":1,"looping":true,"frameDelay":12,"version":"RdbVH8eh71vxNBFyVk4M.tn94rVxT8vL","loadedFromSource":true,"saved":true,"sourceSize":{"x":96,"y":93},"rootRelativePath":"assets/f409b247-5c43-48e5-bb95-d08a75efb733.png"},"6c9159a3-09f9-4105-95e5-3b10ac45cf70":{"name":"ship","sourceUrl":null,"frameSize":{"x":80,"y":87},"frameCount":1,"looping":true,"frameDelay":12,"version":"_wVOd6JR8Uh4O0C22bqot11..b2rCTG5","loadedFromSource":true,"saved":true,"sourceSize":{"x":80,"y":87},"rootRelativePath":"assets/6c9159a3-09f9-4105-95e5-3b10ac45cf70.png"},"8887a030-5278-42d4-88a4-c1c2827c8ac1":{"name":"ship_copy_2","sourceUrl":null,"frameSize":{"x":40,"y":44},"frameCount":1,"looping":true,"frameDelay":12,"version":"2i72MVRawt6GV1.Rc13QkoSs9WIrXfSi","loadedFromSource":true,"saved":true,"sourceSize":{"x":40,"y":44},"rootRelativePath":"assets/8887a030-5278-42d4-88a4-c1c2827c8ac1.png"},"c5c59765-817f-44c5-9f23-092ec14ea7bd":{"name":"hull","sourceUrl":null,"frameSize":{"x":24,"y":26},"frameCount":1,"looping":true,"frameDelay":12,"version":"F4yGxtgcOIyOI8l1qm..s1GpK7l5Qos5","loadedFromSource":true,"saved":true,"sourceSize":{"x":24,"y":26},"rootRelativePath":"assets/c5c59765-817f-44c5-9f23-092ec14ea7bd.png"},"fd40f3e8-c978-4e1c-b30b-cece3bdbdfc0":{"name":"shield","sourceUrl":null,"frameSize":{"x":27,"y":30},"frameCount":1,"looping":true,"frameDelay":12,"version":"7dOg5z1mInPWk5tGZo5tR.3rHs3KWqoU","loadedFromSource":true,"saved":true,"sourceSize":{"x":27,"y":30},"rootRelativePath":"assets/fd40f3e8-c978-4e1c-b30b-cece3bdbdfc0.png"},"f68862a7-d627-4b10-b760-343989c770e3":{"name":"animation_1","sourceUrl":"assets/api/v1/animation-library/mUlvnlbeZ5GHYr_Lb4NIuMwPs7kGxHWz/category_backgrounds/blank.png","frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":4,"version":"mUlvnlbeZ5GHYr_Lb4NIuMwPs7kGxHWz","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/api/v1/animation-library/mUlvnlbeZ5GHYr_Lb4NIuMwPs7kGxHWz/category_backgrounds/blank.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var gameState = "stand-by";
var score = 0;
var highscore = 0;
var ship1 = createSprite(200,350,50,50);
ship1.setAnimation("ship_copy_2");
var ship1hp = 250;
var ship1shield = 125;
ship1.depth = 2;
var bound1= createSprite(200,150,400,30);
bound1.visible = false;
var stars = createGroup();
var asteroids = createGroup();

var statsHolder = createSprite(50,325,100,150);
var shieldStats = createSprite(25,344,35,110);
shieldStats.shapeColor="cyan";
var shieldSym = createSprite(25,270,30,30);
shieldSym.setAnimation("shield");

var hullStats = createSprite(75,344,35,110);
hullStats.shapeColor="red";
var hullSym = createSprite(75,270,30,30);
hullSym.setAnimation("hull");


function back(){
  var star = createSprite(randomNumber(0, 400), randomNumber(-200, 0), 5, 5);
  star.shapeColor = "white";
  star.velocityY=5;  
  stars.add(star);
  star.lifetime=120;
  star.depth=1;
  bound1.depth=star.depth;
}
function aster(){
  var gen = randomNumber(0,100);
  if(gen < 15){
    var asteroid = createSprite(randomNumber(0, 400), randomNumber(-200, 0),20,20);
    asteroid.setAnimation("asteroid");
    asteroid.shapeColor = "gray";
    asteroid.velocityY=2;  
    asteroids.add(asteroid);
    asteroid.lifetime=300;
    asteroid.depth=ship1.depth;
  }
}
function draw() {
  background("black");
  createEdgeSprites();
  if(gameState=="stand-by"||gameState=="end"){
    textSize(18);
    fill("red");
    text("Presiona la tecla Espacio para continuar",40,200);
    fill("cyan");
    text("Usa W, A, S y D o las flechas para moverte",35,236);
    fill("white");
    text("¡Evita todos los asteroides que puedas!",45,272);
    fill("yellow");
    text("Se recomienda bajar el volumen",75,312);
    statsHolder.visible = false;
    shieldStats.visible = false;
    shieldSym.visible = false;
    hullStats.visible = false;
    hullSym.visible = false;
    asteroids.visible = false;
    if(keyDown("space")){
      ship1.setAnimation("ship_copy_2");
      ship1hp=250;
      ship1shield=125;
      ship1.x=200;
      ship1.y=350;
      shieldStats.y=344;
      hullStats.y=344;
      score = 0;
      statsHolder.visible = true;
      shieldStats.visible = true;
      shieldSym.visible = true;
      hullStats.visible = true;
      hullSym.visible = true;
      gameState = "playing";
    }
  }
  if(gameState=="playing"){
    score = score+1;
    textSize(18);
    fill("cyan");
    text("Puntos de Armadura: " + ship1hp,180,25);
    back();
    aster();
    if(keyDown("w")||keyDown("up_arrow")){
      ship1.y = ship1.y-10;
    }
    if(keyDown("a")||keyDown("left_arrow")){
      ship1.x = ship1.x-10;
    }
    if(keyDown("s")||keyDown("down_arrow")){
      ship1.y = ship1.y+10;
    }
    if(keyDown("d")||keyDown("right_arrow")){
      ship1.x = ship1.x+10;
    }
    if(ship1.isTouching(asteroids)){
    if(ship1shield==0){
      playSound("assets/category_hits/retro_game_simple_impact_1.mp3");
      ship1hp = ship1hp-2;
      hullStats.y = hullStats.y+0.9;
    }
    else{
      playSound("assets/category_digital/pulse.mp3");
      ship1shield = ship1shield-5;
      shieldStats.y = shieldStats.y+4.4;
      if(ship1shield==0){
        playSound( "assets/category_digital/power_down_1.mp3");
      }
    }
  }
  
  }
  if(ship1hp==0){
    playSound( "assets/category_explosion/8bit_explosion.mp3");
    ship1.setAnimation("explosion");
    ship1hp=-1;
    gameState="end";
  }
  if(gameState=="end"){
    textSize(18);
    fill("orange");
    text("Has fallado, intenta de nuevo",80,175);
  }
  ship1.collide(statsHolder);
  ship1.collide(edges);
  ship1.collide(bound1);
  
  textSize(18);
  fill("red");
  text("Último puntaje : " + score,200,50);
  text("Mejor puntaje : " + highscore,200,82);
  if(score>highscore){
      highscore=score;
    }
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
