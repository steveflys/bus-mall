'use strict';

// array to store all product instances
Product.allProducts = [];
//creat a var to hold the vote events
var events = 0;

//get the ul to display the results statements
var ulEl = document.getElementById('results');

//arrays to store product names and votes
var productNames = [];

var productVotes = [];

var currentProducts = [1, 2, 3];
var newProducts = [];

// make a constructor for product objects and fill the Product.allProducts array and productNames array.
function Product(filepath, name){
  this.filepath = filepath;
  this.name = name;
  this.displayed = 0;
  this.votes = 0;
  this.round = 1;
  Product.allProducts.push(this);
  productNames.push(this.name);
}
function startPage() {
  if (localStorage.products) {
    Product.allProducts = JSON.parse(localStorage.getItem('products'));
    for(var i in Product.allProducts) {
      productNames[i] = Product.allProducts[i].name;
      Product.allProducts[i].round++;
    }
  } else{
    // create instances of products
    new Product('img/bag.jpg', 'Bag');
    new Product('img/banana.jpg', 'Banang');
    new Product('img/bathroom.png', 'Bathroom');
    new Product('img/boots.jpg', 'Boots');
    new Product('img/breakfast.jpg', 'Breakfast');
    new Product('img/bubblegum.jpg', 'Bubblegum');
    new Product('img/chair.png', 'Chair');
    new Product('img/cthulhu.jpg', 'Cthulhu');
    new Product('img/dog-duck.png', 'Dog-Duck');
    new Product('img/dragon.jpg', 'Dragon');
    new Product('img/pen.jpg', 'Pen');
    new Product('img/pet-sweep.jpg', 'Pet-Sweep');
    new Product('img/scissors.jpg', 'Scissors');
    new Product('img/shark.jpg', 'Shark');
    new Product('img/sweep.png', 'Sweep');
    new Product('img/tauntaun.jpg', 'Tauntaun');
    new Product('img/unicorn.jpg', 'Unicorn');
    new Product('img/usb.gif', 'Usb');
    new Product('img/water-can.jpg', 'Water Can');
    new Product('img/wine-glass.jpg', 'Wine Glass');
  }
}
// access the images from the DOM

var imgEl1 = document.getElementById('image-1');
var imgEl2 = document.getElementById('image-2');
var imgEl3 = document.getElementById('image-3');

// event listner on the each image seperatly
imgEl1.addEventListener('click', pickImg1);
imgEl2.addEventListener('click', pickImg2);
imgEl3.addEventListener('click', pickImg3);

function pickImg1() {
  randomProduct();
  events = events + 1;
  Product.allProducts[currentProducts[0]].votes ++;
}

function pickImg2() {
  randomProduct();
  events = events + 1;
  Product.allProducts[currentProducts[1]].votes ++;
}

function pickImg3() {
  randomProduct();
  events = events + 1;
  Product.allProducts[currentProducts[2]].votes ++;
}

function showResults () {
  for(var i in Product.allProducts) {
    var votesRounds = document.getElementById('rounds-and-votes');
    votesRounds.innerHTML = 'Your results so far:  ROUNDS = ' + Product.allProducts[0].round + ' --- VOTES = ' + Product.allProducts[0].round * 25;
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].name + ' was shown ' + Product.allProducts[i].displayed + ' times, and was picked ' + Product.allProducts[i].votes;
    ulEl.appendChild(liEl);
  }
}

var updateVotes = function() {
  for(var i in Product.allProducts){
    productVotes[i] = Product.allProducts[i].votes;
  }
};

  //create arrays to set the current and new products
  
  //create a variable to store the random number the create a random # generator to return a number location between 0 and the length of the array (Product.allProducts) and assign that number to the var randomIndex.
var randomIndex;

function randomIndexGen() {
  randomIndex = Math.floor(Math.random() * Product.allProducts.length);
}

// callback function for the evemntb listner to randomly display a product image
function randomProduct() {

  if(events === 25) {
    alert('You have made ' + Product.allProducts[0].round * 25 + ' selections.  Thank you for your time.  We appreciate your participation in this study. Feel free to do another round tell the monitor you are finished.');

    imgEl1.removeEventListener('click', pickImg1);
    imgEl2.removeEventListener('click', pickImg2);
    imgEl3.removeEventListener('click', pickImg3);

    localStorage.products = JSON.stringify(Product.allProducts);
    updateVotes();
    showResults();
    renderChart();
    // localStorage.setItem('votingRecord', JSON.stringify(totalVoteCount));
  }
  
  //create a new set of 3 images and ensure the new images do not match any of the current numbers and each are different from each other
  for(var i in currentProducts) {
    do { randomIndexGen();
    } while (currentProducts.includes(randomIndex) === true || newProducts.includes(randomIndex) === true);
    newProducts[i] = randomIndex;
    Product.allProducts[randomIndex].displayed ++;
  }

  currentProducts = newProducts;

  //use the random number generator to display a product at that random index
  imgEl1.src = Product.allProducts[currentProducts[0]].filepath;
  imgEl2.src = Product.allProducts[currentProducts[1]].filepath;
  imgEl3.src = Product.allProducts[currentProducts[2]].filepath;
}

//function to render chart

function renderChart(){
  var ctx = document.getElementById('resultsChart').getContext('2d');

  var chartColors = ['#f70404', '#f73504', '#f76904', '#79a04', '#f7ee04', '#eff704', '#bef704', '#8af704', '#59f704', '#29f704', '#04f70d', '#04f73d', '#04f76d', '#04f79e', '#04f7d2', '#04ebf7', '#04baf7', '#0486f7', '#0455f7', '#0425f7'];

  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes per Product',
        data: productVotes,
        backgroundColor: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

startPage();
randomProduct();