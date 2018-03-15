$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxID = '',
        boxCount = 0, 
        winningPatterns = [['1', '2', '3'], 
                           ['4', '5', '6'], 
                           ['7', '8', '9'], 
                           ['1', '4', '7'], 
                           ['2', '5', '8'], 
                           ['3', '6', '9'], 
                           ['1', '5', '9'], 
                           ['3', '5', '7']];
    
    
  /* hide selection board & display game board */   
    const HideSelect = function() {
        $('.game-board').toggleClass('hidden');
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
    
  
      
    
    
  /* calculate which turn should be taken */
    const DeterminePlayer = function() {
        if (boxCount === 9 ) {
            // display 'tied game' announcement 
         // write script to display "tied game" announcement and reset game board   
            $('#game-board').toggleClass('hidden');
            $('#game-status').toggleClass('hidden');
            $('#tied-game').toggleClass('hidden');
        } else if (boxCount % 2 !== 0) {
            ComputerPlay();
        } else {
            console.log("It's the user's turn.");
        }
    }  
    
    
  /* 'Play Again' button - resets game */    
    //$('#again').on('click', Reset());
    $('#again').on('click', function() {
        // remove display of player markers
        if ($('.boxes').hasClass('taken')) {
            $('.boxes img').fadeOut(500);
        }
        // unmark the boxes as 'taken'
        if ($('.boxes').hasClass('taken')) {
            $('.boxes').removeClass('taken'); 
        } 
        // display the game-select choice box
        $('#game-select').removeClass('hidden'); 
        // hide the game-status display
        $('#game-status').toggleClass('hidden');
        // rehide 'tied game' notification to ready for subsequent games
        if (boxCount === 9) { 
            $('#tied-game').toggleClass('hidden')
        }
        // clear boxCount
        userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxID = '',
        boxCount = 0,
        winningPatterns = [['1', '2', '3'], 
                       ['4', '5', '6'], 
                       ['7', '8', '9'], 
                       ['1', '4', '7'], 
                       ['2', '5', '8'], 
                       ['3', '6', '9'], 
                       ['1', '5', '9'], 
                       ['3', '5', '7']];
    });
    
    
  /* user play functionality:  
  displays icon, pushes box value to array, increases box counter, marks box as taken, returns boxID and boxCount */ 
    const UserPlay = function () {
        $('.boxes').on('click', function() {
            boxID = this.id;
            userSquaresArr.push(boxID);
            console.log("user's plays: " + userSquaresArr);
            if (userIcon === 'X') {
                $(this)
                    .children('.player-icon-x')
                    .fadeIn(500);
            } else {
                $(this)
                    .children('.player-icon-o')
                    .fadeIn(500);            
            }
            $(this).addClass('taken');
            boxCount++; 
                console.log('boxCount is = ' + boxCount + ' and user played last');
                console.log("user played " + boxID + ' (from UserPlay function)');
            DeterminePlayer();
        });
    };
    
    if (boxCount === 0) {
        UserPlay();
    } 
    
    /* respond to center play */ 
    const PlayCorner = function() {
        var corner = '',
            cornerPlay = '',
            rand = Math.random();
        
        if (rand < .249) {
            corner = '1';
            cornerPlay = '#1';
        } else if (rand < .499) {
            corner = '3';
            cornerPlay = '#3';
        } else if (rand < .749) {
            corner = '7';
            cornerPlay = '#7';
        } else {
            corner = '9';
            cornerPlay = '#9';
        }

        computerSquaresArr.push(corner);
        $(cornerPlay).addClass('taken');
        if (computerIcon === 'X') {
            $(cornerPlay)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);
        } else {
            $(cornerPlay)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);                   
        }   
        console.log("computer's plays: " + computerSquaresArr);
        boxCount++;
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    /* respond to corner play*/ 
    const PlayCenter = function() {
        computerSquaresArr.push("5");
        $('#5').addClass('taken');
        if (computerIcon === 'X') {
            $('#5')
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);
        } else {
            $('#5')
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);   
        }
        console.log("computer has played box #5");
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    /* respond to edge with opposite edge*/
    const PlayOppositeEdge = function() {
        var nextEdge = '',
            nextEdgePlay = '';
        
        if (boxID === '2') {
            nextEdge = '8';
            nextEdgePlay = '#8';
        } else if (boxID === '4') {
            nextEdge = '6';
            nextEdgePlay = '#6';
        } else if (boxID === '6') {
            nextEdge = '4';
            nextEdgePlay = '#4';
        } else if (boxID === '8') {
            nextEdge = '2';
            nextEdgePlay = '#2';
        }
        computerSquaresArr.push(nextEdge);
        $(nextEdgePlay).addClass('taken');
        if (computerIcon === 'X') {
            $(nextEdgePlay)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);
        } else {
            $(nextEdgePlay)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);
        }
        console.log("computer has played box " + nextEdgePlay);
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    /* respond to corner with adjacent edge*/
    const PlayEdgeToCorner = function() {
        var edgeToCorner = '',
            nextEdgeToCorner = '';
        
        if (boxID === '1') {
            if ($('#2').hasClass('taken')) {
                edgeToCorner = '4';
                nextEdgeToCorner = '#4';
            } else {
                edgeToCorner = '2';
                nextEdgeToCorner = '#2';
            }
        } else if (boxID === '3') {
            if ($('#2').hasClass('taken')) {
                edgeToCorner = '6';
                nextEdgeToCorner = '#6';
            } else {
                edgeToCorner = '2';
                nextEdgeToCorner = '#2';
            }
        } else if (boxID === '7') {
            if ($('#6').hasClass('taken')) {
                edgeToCorner = '8';
                nextEdgeToCorner = '#8';
            } else {
                edgeToCorner = '4';
                nextEdgeToCorner = '#4';
            }
        } else if (boxID === '9') {
            if ($('#6').hasClass('taken')) {
                edgeToCorner = '8';
                nextEdgeToCorner = '#8';
            } else {
                edgeToCorner = '6';
                nextEdgeToCorner = '#6';
            }        
        }
        computerSquaresArr.push(edgeToCorner);
        $(nextEdgeToCorner).addClass('taken');
        if (computerIcon === 'X') {
            $(nextEdgeToCorner)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);                   
        } else {
            $(nextEdgeToCorner)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);   
        }
        console.log("computer has played box " + nextEdgeToCorner);
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    
    /* respond to edge with adjacent corner */
    const PlayAdjCorner = function () {
        var adjCorner = '',
            adjCornerPlay = '',
            rand = Math.random();
        
        if (boxID === '2') {
            if (rand < .499) {
                adjCorner = '1';
                adjCornerPlay = '#1';
            } else {
                adjCorner = '3';
                adjCornerPlay = '#3';
            }
        } else if (boxID === '4') {
            if (rand < .499) {
                adjCorner = '1';
                adjCornerPlay = '#1';
            } else {
                adjCorner = '7';
                adjCornerPlay = '#7';
            }
        } else if (boxID === '6') {
            if (rand < .499) {
                adjCorner = '3';
                adjCornerPlay = '#3';
            } else {
                adjCorner = '7';
                adjCornerPlay = '#7';
            }
        } else if (boxID === '8') {
            if (rand < .499) {
                adjCorner = '7';
                adjCornerPlay = '#7';
            } else {
                adjCorner = '9';
                adjCornerPlay = '#9';
            }
        }
        
        computerSquaresArr.push(adjCorner);
        $(adjCornerPlay).addClass('taken');
        if (computerIcon === 'X') {
            $(adjCornerPlay)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);                    
        } else {
            $(adjCornerPlay)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);   
        }
        console.log("computer has played box " + adjCornerPlay);
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    
    const BlockLogic = function () {
             // check if userSquaresArr contains the same values as any of the arrays in winningPatterns
    // duplicate the winningPattern array currently checking. if userSquaresArr first value matches any value in that array, remove that value from the array, and check second value in userSquaresArr against remaining values in same array in winningPattern. 
    // if an additional value matches, remove that value.
    //return the remaining value for the computer to play. 
        var i = 0;

        for (var j = 0; j < winningPatterns.length; j++ ) { 
            if (i >= userSquaresArr.length) { 
              i = 0; 
            }
            var checkWP = winningPatterns[j];
            console.log("WinningPattern " + j + ": " + checkWP);
            var l = 0;
            for (var k = 0; k <= winningPatterns[l].length; k++ ) {
                var userValue = userSquaresArr[i],
                    valPresent = checkWP.indexOf(userValue, 0);
                console.log(userValue + " is current UserValue")
                if (valPresent > -1) {
                    checkWP.splice(valPresent, 1);
                    var checkWPleng = checkWP.length;    
                    console.log("the userValue is present in the current winningPattern at position " + valPresent)
                    i++; 
                    console.log("length of checkWP:" + checkWP.length);
                    if (checkWPleng < 2) {
                        compNextMove = checkWP[0];
                        console.log("computer's next move should be " + compNextMove);
                        return compNextMove;
                    }
                } else if (valPresent == -1) { 
                  i++; 
                } 
            };
        };
    }
        
    
    const ComputerPlay = function() {
        console.log("user played = " + boxID + ' (from ComputerPlay function)');
        console.log('there are ' + boxCount + ' squares filled (from ComputerPlay function)');
            //computer plays
        if (boxCount < 2) {
            if (boxID === '5') {
                PlayCorner();
            } else if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                PlayCenter(); 
            } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                var rand = Math.random();
                if (rand < .333) {
                    PlayCenter();
                } else if (rand < .666) {
                    PlayOppositeEdge();
                } else {
                    PlayAdjCorner();
                }        
            }         
        } else if (boxCount >= 3) {
            //compNextMove = BlockLogic();
            // Lucas's alteration now isn't working and my original script for this function works fine. Very bizarre.
            BlockLogic();
          
            console.log("Computer's next move: " + compNextMove);
            if ($('#'+compNextMove).hasClass('taken')) {
                console.log("the move suggested by BlockLogic " + compNextMove + " is taken. Recalculating.")
                // if the user plays a corner, respond with an adjacent available edge box
                if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                    PlayEdgeToCorner(); 
                // if the user plays an edge, respond with an adjacent available corner box
                } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                    PlayAdjCorner();
                }
            } else {    
                console.log("computer's next move can go in box " + compNextMove + " because it's not taken");
                if (computerIcon === 'X') {
                    $('#'+compNextMove)
                        .children('.player-icon-x')
                        .delay(800)
                        .fadeIn(500);                                    
                } else {
                    $('#'+compNextMove)
                        .children('.player-icon-o')
                        .delay(800)
                        .fadeIn(500);  
                }
            $('#'+compNextMove).addClass('taken');    
            computerSquaresArr.push(compNextMove);
            console.log("computer has played box #" + compNextMove);
            boxCount++;
            console.log('boxCount is = ' + boxCount + ' and computer played last');
            }
        }   
    };

    
});
