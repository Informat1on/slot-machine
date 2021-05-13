/// СТАВКИ ////
//Ставка пользователя
let bet = 0;

//Функция увеличения ставки на 1
function increaseBet() {
    if (bet >= balance) //если баланс меньше чем сама ставка
        return;
    ++bet;
    showBet(bet);
}

//Функция уменьшения ставки на 1
function decreaseBet() {
    if (+bet === 0) //чтобы ставка не была меньше нуля
        return;
    --bet;
    showBet(bet);
}

//Функция показа ставки
function showBet(bet){
    console.log('Num is ' +  bet);
    document.getElementById("bet_count").innerHTML = bet;
}

//Функция очистки ставки
function clearBet() {
    bet = 0;
    document.getElementById("bet_count").innerHTML = bet;
}

//Функция установки максимальной ставки
function maxBet(){
    console.log('Opened func ');
    bet = document.getElementById("balance_count").innerText;
    showBet(bet);
}

/// БАЛАНС ///
//Доступный баланс пользователя
let balance = 100;

//Функция показа баланса
function showBalance(balance) {
    document.getElementById("balance_count").innerHTML = balance;
}

//Функция пополнения баланса
function addFunds(value) {
    balance+=value;
    showBalance(balance);
}

/// CANVAS ///
let
    canvLeft = document.getElementsByClassName('leftDrum')[0],
    canvCenter = document.getElementsByClassName('centerDrum')[0],
    canvRight = document.getElementsByClassName('rightDrum')[0],
    ctxLeft = canvLeft.getContext('2d'),
    ctxCenter = canvCenter.getContext('2d'),
    ctxRight = canvRight.getContext('2d');


ctxLeft.fillStyle = 'red';
ctxCenter.fillStyle = 'blue';
ctxRight.fillStyle = 'green';

let x = 0;

//Loading images to array
function loadImages(){
   let arr = [];
   for (let i=0;i<imgCount;i++){
       let img = new Image();
       img.src = `img/test${i+1}.png`;

       arr.push(img);

   }

   // Мешаю картинки, чтобы был рандом
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

   shuffle(arr);
   return arr;
}

// КОНСТАНТЫ

const xPos = 65; // положение картинки по x на canvas
const yPos = 49; // положение картинки по y на canvas
const imgHeigh = 55; // высота картинки
const imgWidth = 200; // ширина картинки
const imgCount = 4; // количество изображений

function printImages(ctx){
    let imageArr = loadImages(); // загружаю изображения в массив

    // console.log( 'Low image is' + imageArr[2].src);

    for (let  i = 0; i < imageArr.length; i ++){
        imageArr[i].onload = function animate() {
            let currY = yPos * i;
            let currX = xPos;

            ctx.clearRect(currX, currY, imgWidth, imgHeigh);  // очищаю поле для вставки картинки

            ctx.drawImage(imageArr[i], currX, currY,imgWidth,imgHeigh); // рисую на нем картинку

        }
    }

    return imageArr;
}

function startSpin(ctxLeft,ctxCenter,ctxRight) {
    //если крутим по новой, то обнуляем выигрыш
    document.getElementById('win_count').innerHTML = 0;

    // если игра без ставки, то не крутим барабан
    if (+bet === 0)
        return;

    //если есть ставка
    else{

        // если ставка боольше баланса то выходим
        if (bet > balance)
            return;

        // если ставка мньше либо равна балансу
        else{

        //уменьшаю баланс на сумму ставки
            balance = balance - bet;
        //отображаю измененный баланс
            showBalance(balance);

        // задержка прокрутки
            let delay = 90;

        // массивы с картинками
            let arr1,arr2,arr3;

        // таймер выполнения функции для левого барабана
            let timerId = setInterval(() => printImages(ctxLeft), delay);
        // остановить выполнение функции через 1000мс
            setTimeout(() => { clearInterval(timerId); arr1 = printImages(ctxLeft); }, 1000);

        // таймер выполнения функции для центрального барабана
            let timerId1 = setInterval(() => printImages(ctxCenter), delay);
        // остановить выполнение функции через 1600мс
            setTimeout(() => { clearInterval(timerId1); arr2 = printImages(ctxCenter); }, 1600);

        // таймер выполнения функции для правого барабана
            let timerId2 = setInterval(() => printImages(ctxRight), delay);
        // остановить выполнение функции через 2100мс
            setTimeout(() => {
                clearInterval(timerId2);
                arr3 = printImages(ctxRight);
                checkWin(arr1,arr2,arr3); // в конце прокрутки я проверяю на победу
                }, 2100);
    }
        }
}

function checkWin(arr1,arr2,arr3) {
    let winAmount = 0;
    // test1.png - 7
    // test2.png - cherry
    // test3.png - banana
    // test4.png - berry

    // картинки - комбинации
    const seven = 'test1.png'; // семерка
    const plum = 'test2.png'; // слива
    const banana = 'test3.png'; // банан
    const grape = 'test4.png'; // виноград

    //то что выполо на барабане
    const leftDrum = arr1[2].src;
    const centerDrum = arr2[2].src;
    const rightDrum = arr3[2].src;

    //если выпало три одинаковые картинки
    if (leftDrum === centerDrum && leftDrum === rightDrum) {
        console.log('You win !!!');
        // так как все одинаковые, то сравнение можно делать по 1 переменной

        //если заканчивается на семерки
        if (leftDrum.endsWith(seven)) {
            winAmount = bet * 100;
            showWin(winAmount);
        }

        //если заканчивается на сливу
        else if (leftDrum.endsWith(plum)) {
            winAmount = bet * 2;
            showWin(winAmount);
        }

        //если заканчивается на банан
        else if (leftDrum.endsWith(banana)) {
            winAmount = bet * 0.5;
            showWin(winAmount);
        }

        //если заканчивается на виноград
        else if (leftDrum.endsWith(grape)) {
            winAmount = bet;
            showWin(winAmount);
        }

    }

    else
        // обнуляю ставку, так как барабан уже покрутили
        clearBet();

}

function showWin(winAmount) {
    // обнуляю ставку, так как барабан уже покрутили
    clearBet();

    document.getElementById('win_count').innerHTML = winAmount;
    balance+=winAmount;
    showBalance(balance);

    if (winAmount > 0) {
        document.getElementById('popup-winner').style.display = 'block';
        document.getElementById('win_popup_count').innerHTML = winAmount + ' монет';
    }
}

//JQuery
$(document).ready(function () {
   console.log('DOM Content loaded');
});