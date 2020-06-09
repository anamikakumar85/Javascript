'use strict'
// Main Game Play
console.log('script is called');
let cardElements = document.getElementsByClassName('game-card'); // td node list
let imgElements = document.getElementsByClassName('game-card-img'); // img node list
let imgSrcArray  = [];//collecting orderd images from html
let starElements = document.getElementsByClassName('star');
let starElementsArray = [...starElements];//collect star elements in array
let counter = document.getElementById('moveCounter');//to count the no of moves
let timer = document.getElementById('timer');//set timer
let modalElement = document.getElementById('gameOverModal');//access the data in the class
let totalGameMovesElement = document.getElementById('totalGameMoves');//show total movements 
let totalGameTimeElement = document.getElementById('totalGameTime');// show total time
let finalStarRatingElement = document.getElementById('finalStarRating');//shows star rating
let closeModalIcon = document.getElementById('closeModal');//closes the result window
let openedCards = 0; // number of displayed cards;
let firstCard =''; // card from first click
let matchedCards = [];//array of matched cards
let actCard = '';// real or actual or active card
let moves =0;
let second = 0,
	minute = 0,
    hour = 0,
	interval,
	totalGameTime,
    starRating;







// listen to start game after loading
window.addEventListener('load',startGame);



//listen for events on the cells within images
for(let i = 0; i < cardElements.length; i++) {
	 cardElements[i].addEventListener('click', displayCard)
}

//start Game
function startGame(){
	 loadImgSrcArray();//collecting ordered images from cards
	 shuffleCards(imgSrcArray);//shuffle the images
	 giveCards(imgSrcArray);//putting the shuffled images back in the cards
	 flashCards();//showing all the images once one the game start
  
     //reset moves
	 moves = 0;
	 counter.innerText = moves + ' moves';
	
	 //reset star rating
     for(let i=0; i<starElementsArray.length; i++) {
         starElementsArray[i].style.opacity = 1;
     }

     //Reset Timer on game reset
     console.log(timer.innerHTML = '0 mins 0 secs');
     clearInterval(interval);
  
}

function loadImgSrcArray(){
	 for( let i =0;i<imgElements.length;i++){ 
     imgSrcArray[i] = imgElements[i].src;
    }
}
    console.log(imgSrcArray);


function shuffleCards(array){
     // Fisher–Yates Shuffle method
	let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !==0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }    
}


function giveCards(){
	 for( let i =0;i<imgElements.length;i++){ 
     imgElements[i].src = imgSrcArray[i];
    }
}//console.log(imgSrcArray);
    
	
//when game starts show all the cards for a split second
function flashCards(){
	console.log('flash cards')
	for( let i =0;i<imgElements.length;i++){		
	     imgElements[i].style.visibility = 'visible';
	     imgElements[i].addEventListener('click',displayCard);
	}
	setTimeout(hideCards,1800);//hide cards after delay
}

//hide all cards	
function hideCards(){
    console.log('hide cards');
	for(let i =0;i<imgElements.length;i++){		
		 imgElements[i].style.visibility = 'hidden';
	}
}	

//display card in clicked cell
function displayCard(evt){
	 actCard = evt.target.firstElementChild; // actual img object
	 console.log(firstCard, actCard.src);
    
	
	if(openedCards <= 1){ //for first and second click	 	
		 console.log('display ' + (openedCards + 1) +'. card');
		 actCard.style.visibility = 'visible';
		 openedCards++;
    }
   
	if(openedCards == 1){	//only for first click	 		
    firstCard = actCard;//store first card (actCard.src) to firstCard
    }
	if(openedCards == 2){ //only for second click
	
      	moveCounter();//function to increment moves
		
		if (firstCard.src == actCard.src){ /* compare second card (actCard.src) with firstCard  */      
		  //alert('bingo'); 		  
		matched();	 // function calls for matched cards 
		
		}else{
			 // alert('oops not matching');
			  console.log('Try again');
			  setTimeout(unmatched,500);//function calls for unmatched after a delay 			  
	        }
    }
    
}
  
function matched(){
	 console.log(matchedCards.push(firstCard));//pushing the matched card in array
	 console.log(matchedCards.push(actCard.src));//pushing the matched card in array
	
	 openedCards = 0;//again reset the opend cards to null
	if(matchedCards.length == 16){
		console.log('gameEnd');
		endGame();
	}
}


function unmatched(){
	 openedCards = 0;
	 firstCard.style.visibility = 'hidden';
	 actCard.style.visibility = 'hidden';
}

//function to count moves and star rating
function moveCounter(){
	 moves++;
	 console.log( moves);
	 counter.innerHTML = moves +  ' move' ;
	 if(moves == 1){
		second = 0;
        minute = 0;
        hour = 0;
        startTimer();
	}
	//setting rating based on moves
	if(moves > 8 && moves <=12){
		
	    for(let i=0; i<5; i++) {
            starElementsArray[i].style.opacity = 1; 
        }
    } else if(moves > 12 && moves <= 16) {
        for(let i=0; i<5; i++) {
            if(i > 3) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 16 && moves <= 20) {
        for(let i=0; i<5; i++) {
            if(i > 2) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 20 && moves <= 24) {
        for(let i=0; i<5; i++) {
            if(i > 1) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    } else if(moves > 24){
        for(let i=0; i<5; i++) {
            if(i > 0) {
                starElementsArray[i].style.opacity = 0.1;
            }
        }
    }
	
}
//function  to start the time calculation
function startTimer(){
	console.log('timer');
	interval = setInterval(function(){
		timer.innerHTML = minute + ' minutes ' + second + ' second';
		second++;
		if(second ==60){
			minute++;
			second =0;
		}
         if(minute ==60){
			 hour++;
			 minute =0;
		 }
    },1000)	
    	
}

//function to end the program and show result
function endGame(){
	 
	 clearInterval(interval);
	 totalGameTime = timer.innerHTML;
     starRating = document.querySelector('.rating').innerHTML;

     //show modal on game end
     modalElement.style.display = 'block';
    
     //show totalGameTime, moves and finalStarRating in Modal
     totalGameTimeElement.innerHTML = totalGameTime;
     totalGameMovesElement.innerHTML = moves;
     finalStarRatingElement.innerHTML = starRating;

     matchedCards = [];//very important for playing second time to clear the array
     closeModal();// calling to close result
}

//function to close the result dialog 
function closeModal(){
	 closeModalIcon.addEventListener('click',function(){
	 modalElement.style.display = 'none';
	 startGame();
	 })
}

function playAgain(){
	 modalElement.style.display = 'none';
     startGame();
}
	
	


		
		