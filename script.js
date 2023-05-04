'use strict';

//Selecting elements
const score0El=document.querySelector('#score--0');
const score1El=document.querySelector('#score--1');
const diceEl=document.querySelector('.dice');
const btnRoll=document.querySelector('.btn--roll');
const btnNew=document.querySelector('.btn--new');
const btnHold=document.querySelector('.btn--hold');
// let currentScore0=document.querySelector('#current--0');
// let currentScore1=document.querySelector('#current--1');

//Starting conditions
const scores=[0,0];
score0El.textContent=0;
score1El.textContent=0;
diceEl.classList.add('hidden');
let currentScore=0;
let activePlayer=0;
let playing=true;

//switch player function
const switchPlayer=function(){
    currentScore=0;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    activePlayer=activePlayer===0?1:0; 
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
}

//winner function
const winner=function(){
    if(scores[activePlayer]>=20){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        diceEl.classList.add('hidden');
        playing=false;
    }
}

//Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing) {
        //generating new number
        const randomNumber=Math.trunc(Math.random()*6+1);
        //removing hidden class
        diceEl.classList.remove('hidden');
        //displaying random dice images
        diceEl.src=`dice-${randomNumber}.png`; 
        //check for rolled 1; if true, switch to next player
        if(randomNumber!==1){
            currentScore+=randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore
            } else {
            //switch player; and setting score to zero
            switchPlayer();
        }
    }
    
})

//Holding fucntionality
btnHold.addEventListener('click',function(){
    if(playing){
        scores[activePlayer]+=currentScore; 
        if(activePlayer===0){
            score0El.textContent=scores[activePlayer];
            winner();
        } else {
            score1El.textContent=scores[activePlayer];
            winner();
        }
        switchPlayer();
    } 
})