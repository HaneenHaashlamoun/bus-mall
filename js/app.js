'use strict';

//declarations

let leftImgElement = document.getElementById('leftImg');
let middleImgElement = document.getElementById('middleImg');
let rightImgElement = document.getElementById('rightImg');

let topAttempt = 25;
let clientAttempts = 0;

let leftIndex;
let rightIndex;
let middleIndex;

//constructer function
function Product(name, src) {
    this.name = name;
    this.imgSource = src;
    this.votes = 0;
    this.shown = 0;
    Product.all.push(this);
}
Product.all = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

console.log(Product.all);

// from w3 schools
function getRandomIndex() {

    return Math.floor(Math.random() * Product.all.length);
}

// render

function renderImages() {

    leftIndex = getRandomIndex();
    middleIndex = getRandomIndex();
    rightIndex = getRandomIndex();
    console.log(leftIndex, middleIndex, rightIndex);

    while (leftIndex === middleIndex || middleIndex === rightIndex || middleIndex === leftIndex) {
        rightIndex = getRandomIndex();
        middleIndex = getRandomIndex();
    }
    
    leftImgElement.src = Product.all[leftIndex].imgSource;
    rightImgElement.src = Product.all[rightIndex].imgSource;
    middleImgElement.src = Product.all[middleIndex].imgSource;

    //shown
    Product.all[leftIndex].shown++;
    Product.all[rightIndex].shown++;
    Product.all[middleIndex].shown++;

}

renderImages();

let mainDiv = document.getElementById('main-div');
mainDiv.addEventListener('click', userClick);
let list = document.getElementById('productsList');

function userClick(event) {
    clientAttempts++;
    console.log(clientAttempts);

    if (clientAttempts <= topAttempt) {

        if (event.target.id === 'leftImg') {
            Product.all[leftIndex].votes++;            

        } else if (event.target.id === 'middleImg') {
            Product.all[rightIndex].votes++;

        } else if (event.target.id === 'rightImg') {
            Product.all[middleIndex].votes++;
        }
        else {
            alert('please choose an Image');
        }

        renderImages();

    } else {
        mainDiv.removeEventListener('click', userClick);
        let buttonElement = document.getElementById('viewListbtn');
        buttonElement.addEventListener('click', showList);
    }
}

function showList() {
    for (let i = 0; i < Product.all.length; i++) {
        let listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = `${Product.all[i].name} has ${Product.all[i].votes} votes and shown ${Product.all[i].shown} times`;
    }
}