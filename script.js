$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxCount = 0; 

    
  /* hide selection board & display game board */   
    const HideSelect = function() {
        $('.game-board').removeClass('hidden');
        $('#game-select').addClass('hidden');
    } 

  /* set user icon and computer icon */     
    $( '#cross' ).on('click', function() {
        userIcon = 'X';
        computerIcon = 'O';
        HideSelect();
    });   
    
    $( '#circle' ).on('click', function() {
        userIcon = 'O';
        computerIcon = 'X';
        HideSelect();
    }); 
    
  /* user play functionality to display icon */ 
    $('.boxes').on('click', function() {
        var boxID = this.id;
        userSquaresArr.push(boxID);
        console.log(userSquaresArr);
        if (userIcon === 'X') {
            $(this)
                .children('.player-icon-x')
                .fadeIn(500)
                .addClass('taken');
            boxCount++; 
            DeterminePlayer();
            return boxCount;
            
        } else {
            $(this)
                .children('.player-icon-o')
                .fadeIn(500)
                .addClass('taken');            
            boxCount++; 
            DeterminePlayer();
            return boxCount; 
        }
    });
    
    
    const ComputerPlay = function() {
            console.log('there are ' + boxCount + ' squares filled');
            //computer plays
        var positionCenter = userSquaresArr.indexOf('5', 0),
            positionCorner1 = userSquaresArr.indexOf('1', 0),
            positionCorner3 = userSquaresArr.indexOf('3', 0),
            positionCorner7 = userSquaresArr.indexOf('7', 0),
            positionCorner9 = userSquaresArr.indexOf('9', 0),
            positionEdge2 = userSquaresArr.indexOf('2', 0),
            positionEdge4 = userSquaresArr.indexOf('4', 0),
            positionEdge6 = userSquaresArr.indexOf('6', 0),
            positionEdge8 = userSquaresArr.indexOf('8', 0);
        if (boxCount < 2) {
            if (positionCenter == 0) {
                computerSquaresArr.push("1");
                if (computerIcon === 'X') {
                    $('#1')
                        .children('.player-icon-x')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    computerSquaresArr.push('1');
                    console.log("computer has played box " + computerSquaresArr);
                    boxCount++;

                } else {
                    $('#1')
                        .children('.player-icon-o')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    computerSquaresArr.push('1');
                    console.log("computer has played box " + computerSquaresArr);
                    boxCount++;                    
                }   
            } else if ((positionCorner1 > -1) || (positionCorner3 > -1) || (positionCorner7 > -1) || (positionCorner9 > -1)) {
                 computerSquaresArr.push("5");
                 if (computerIcon === 'X') {
                    $('#5')
                        .children('.player-icon-x')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                     computerSquaresArr.push('5');
                     console.log("computer has played box " + computerSquaresArr);
                     boxCount++;                     
                } else {
                    $('#5')
                        .children('.player-icon-o')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    computerSquaresArr.push('5');
                    console.log("computer has played box " + computerSquaresArr);
                    boxCount++;    
                }      
            } else if ((positionEdge2 > -1) || (positionEdge4 > -1) || (positionEdge6 > -1) || (positionEdge8 > -1)) {
                var userSquare = userSquaresArr.length,
                    lastPlayed = userSquare-1,
                    userLastPlayed = userSquaresArr[lastPlayed],
                    nextEdge = '';
                // if center square isn't taken, play center
                /* if (!$('#5').hasClass('taken')) {
                    if (computerIcon === 'X') {
                        $('#5')
                            .children('.player-icon-x')
                            .delay(800)
                            .fadeIn(500)
                            .addClass('taken');
                        computerSquaresArr.push('5');
                        console.log("computer has played box " + computerSquaresArr);
                        boxCount++;                     
                    } else {
                        $('#5')
                            .children('.player-icon-o')
                            .delay(800)
                            .fadeIn(500)
                            .addClass('taken');
                        computerSquaresArr.push('5');
                        console.log("computer has played box " + computerSquaresArr);
                        boxCount++;    
                    }
                } 
                // otherwise, play edge opposite (how do I determine this?)
                  else {
*/                          
                    if (userLastPlayed === '2') {
                        nextEdge = '#8';
                    } else if (userLastPlayed === '4') {
                        nextEdge = '#6';
                    } else if (userLastPlayed === '6') {
                        nextEdge = '#4';
                    } else if (userLastPlayed === '8') {
                        nextEdge = '#2'; 
                    } 
                    var calcNextEdge = userLastPlayed;  
                    if (computerIcon === 'X') {
                        $(nextEdge)
                            .children('.player-icon-x')
                            .delay(800)
                            .fadeIn(500)
                            .addClass('taken');
                        computerSquaresArr.push(nextEdge);
                        console.log("computer has played box " + computerSquaresArr);
                        boxCount++;                     
                    } else {
                        $(nextEdge)
                            .children('.player-icon-o')
                            .delay(800)
                            .fadeIn(500)
                            .addClass('taken');
                        computerSquaresArr.push(nextEdge);
                        console.log("computer has played box " + computerSquaresArr);
                        boxCount++;    
                    }
                }    
            }
        };
        
        
    
    const DeterminePlayer = function() {
        if (boxCount % 2 !== 0) {
            ComputerPlay();
        } else {
            console.log("it's the user's turn.");
        }
    }
  
    
});
