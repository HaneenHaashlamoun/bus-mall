'use strict';

//declarations

let leftImgElement = document.getElementById('leftImg');
let middleImgElement = document.getElementById('middleImg');
let rightImgElement = document.getElementById('rightImg');
let buttonElement = document.getElementById('viewListbtn');

let topAttempt = 25;
let clientAttempts = 0;

let leftIndex;
let rightIndex;
let middleIndex;

//Chart
let namesArr = [];
let votesArr = [];
let shownArr = [];

//constructer function
function Product(name, src) {
    this.name = name;
    this.imgSource = src;
    this.votes = 0;
    this.shown = 0;
    Product.all.push(this);
    // updateStorage();
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

function updateStorage() {
    let stringArr = JSON.stringify(Product.all);
    localStorage.setItem('product', stringArr);
}

function getProductsInfo() {
    let data = localStorage.getItem('product');
    let parsedArr = JSON.parse(data)    
    if (parsedArr !== null) {
        Product.all = parsedArr;
        // for (let i = 0; i < parsedArr.length; i++) {
        //     // new Product(parsedArr[i].name,parsedArr[i].votes,parsedArr[i].shown,parsedArr[i].imgSource);
        //     productOfget = Product.create(parsedArr[i]);
        //     productOfget.create(Product.prototype);
        //   }
        // console.log(Product.all);
    }    
}


// from w3 schools
function getRandomIndex() {

    return Math.floor(Math.random() * Product.all.length);
}

// render
let number = [];
function renderImages() {
    number = [leftIndex, middleIndex, rightIndex];
    // console.log(number);
    leftIndex = getRandomIndex();
    middleIndex = getRandomIndex();
    rightIndex = getRandomIndex();
    // console.log(leftIndex, middleIndex, rightIndex);


    while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex || number.includes(rightIndex) || number.includes(leftIndex) || number.includes(middleIndex)) {
        rightIndex = getRandomIndex();
        leftIndex = getRandomIndex();
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

//Div user click
function userClick(event) {
    event.preventDefault();
    clientAttempts++;
    // console.log(clientAttempts);

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

    }
    else {
        //chart
        for (let i = 0; i < Product.all.length; i++) {
            namesArr.push(Product.all[i].name);
            votesArr.push(Product.all[i].votes);
            shownArr.push(Product.all[i].shown);
        }
        mainDiv.removeEventListener('click', userClick);
        buttonElement.addEventListener('click', showList);
        
        // updateStorage();

    }
    updateStorage();
}

//btnclick
function showList() {
    for (let i = 0; i < Product.all.length; i++) {
        let listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = `${Product.all[i].name} has ${Product.all[i].votes} votes and shown ${Product.all[i].shown} times`;
    }
    buttonElement.removeEventListener('click', showList);
    // console.log(votesArr, shownArr, namesArr);
    showChart();

}

//Chart 
function showChart() {
    const data = {
        labels: namesArr,
        datasets: [{
            label: 'Votes',
            data: votesArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        },
        {
            label: 'Shown',
            data: shownArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }

        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };


    var myChart = new Chart(

        document.getElementById('myChart'),
        config
    );

}

Chart.defaults.color = "white";


getProductsInfo();
