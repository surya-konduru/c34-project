//Create variables here
var dog, happyDog, database, stock, foodStock;
var dogImage, happyDogImage;

function preload()
{
// Load the images here
  dogImage = loadImage('images/Dog.png');
  happyDogImage = loadImage('images/happydog.png');
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
// Create dog sprite
  dog = createSprite(250, 250, 30, 30);
  dog.addImage(dogImage);
  dog.scale = 0.5;

  //setup reference to DB value for food  
  foodStock = database.ref('Food');
  // setup function to read value from D
  foodStock.on('value', readStockFromDB);
}


function draw() {  
  background(46, 139, 87);

  // Feed pet when up arrow is pressed
  if(keyWentDown(UP_ARROW)){
    feedPet();
  }

  drawSprites();

//  Print how many feeds are available 
  fill("white");
  textAlign(CENTER);
  var message = 'Available feeds: ' + stock;
  text(message, 250, 450);
}

// This will be called whenever the value in the database changes
function readStockFromDB(data) {
  stock = data.val();
}

// This willl be called whenever the dog gets fed
function writeStockToDB(data) {
  foodStock.set(data);
}

function feedPet() {
  if (stock > 0){
    writeStockToDB(stock - 1);
    dog.addImage(happyDogImage);
  } else{
      dog.addImage(dogImage);
  }
}

