'use strict';

// array to store all product instances
Product.allProducts = [];
var imagesPicked = [];
// make a constructor for product objects
function Product(filepath, name){
  this.filepath = filepath;
  this.name = name;
  Product.allProducts.push(this);
}
// create instances of products
new Product('img/bag.jpg', 'Bag');
new Product('img/banana.jpg', 'Banang');
new Product('img/bathroom.jpg', 'Bathroom');
new Product('img/boots.jpg', 'Boots');
new Product('img/breakfast.jpg', 'Breakfast');
new Product('img/bubblegum.jpg', 'Bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'Dog-Duck');
new Product('img/dragon.jpg', 'Dragon');
new Product('img/pen.jpg', 'Pen');
new Product('img/pet-sweep.jpg', 'Ret-Sweep');
new Product('img/scissors.jpg', 'Scissors');
new Product('img/shark.jpg', 'Shark');
new Product('img/sweep.png', 'Sweep');
new Product('img/tauntaun.jpg', 'Tauntaun');
new Product('img/unicorn.jpg', 'Unicorn');
new Product('img/usb.gif', 'Usb');
new Product('img/water-can.jpg', 'Water Can');
new Product('img/wine-glass.jpg', 'Wine Glass');

// access the images from the DOM

var imgEl1 = document.getElementById('image-1');
var imgEl2 = document.getElementById('image-2');
var imgEl3 = document.getElementById('image-3');

// event listner on the image
imgEl1.addEventListener('click', pickImg1);
imgEl2.addEventListener('click', pickImg2);
imgEl3.addEventListener('click', pickImg3);

function pickImg1() {
  randomProduct();
  events = events++;
  imagesPicked.push(currentProducts[0]);
}

function pickImg2() {
  randomProduct();
  events = events++;
  imagesPicked.push(currentProducts[1]);
}

function pickImg3() {
  randomProduct();
  events = events++;
  imagesPicked.push(currentProducts[2]);
}

var currentProducts = [];
var newProducts = [];

var randomIndex;

var events = (0);

if (events === 25) {
  alert('You have made 25 selections.  Thamnk you for your time.  Please tell the monitor you are finished and collect your $20.00');
}

function randomIndexGen() {
  randomIndex = Math.floor(Math.random() * Product.allProducts.length);
}

// callback function for the evemntb listner to randomly display a product image
function randomProduct(){

  //create arrays to set the current and new products
  //random # generator to return a number location between 0 and the length of the array (Product.allProducts)
  
  //ensure the new number does not match any of the current numbers
  for(var i = 0; i < 3; i++) {
    do { randomIndexGen(); 
    } while (currentProducts.includes(randomIndex) === true || newProducts.includes(randomIndex) === true);
    newProducts[i] = randomIndex;
  }  

  currentProducts = newProducts;

  //use the random number generator to display a product at that random index
  imgEl1.src = Product.allProducts[currentProducts[0]].filepath;
  imgEl2.src = Product.allProducts[currentProducts[1]].filepath;
  imgEl3.src = Product.allProducts[currentProducts[2]].filepath;
}
// invoke the callback on page load to show a random product
randomProduct();