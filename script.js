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
            // if userSquaresArr contains a winningPattern, display 'user-win' message
          /*  if () {
                $('#user-win').toggleClass('hidden'); */
            // else if compSquaresArr contains winningPattern, display 'comp-win' message
          /*  } else if () { 
                $('#comp-win').toggleClass('hidden'); */       
            // else display 'tied game' announcement 
          /*  } else { */
                $('#tied-game').toggleClass('hidden'); 
            //}
        // then clear the game board and display the message
            $('#game-board').toggleClass('hidden');
            $('#game-status').toggleClass('hidden');
            
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
        console.log("computer has played box #5 (from PlayCorner)");
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
        console.log("computer has played box #5 (from PlayCenter)");
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    /* respond to edge with opposite edge*/
    const PlayOppositeEdge = function() {
        var nextEdge = '',
            nextEdgePlay = '';
        
        if (boxID === '2') {
            if (!$('#8').hasClass('taken')) {
                nextEdge = '8';
                nextEdgePlay = '#8';
            } else {
                PlayAdjCorner();
            }
        } else if (boxID === '4') {
            if (!$('#6').hasClass('taken')) {
                nextEdge = '6';
                nextEdgePlay = '#6';
            } else {
                PlayAdjCorner();
            }
        } else if (boxID === '6') {
            if (!$('#4').hasClass('taken')) {
                nextEdge = '4';
                nextEdgePlay = '#4';
            } else {
                PlayAdjCorner();
            }
        } else if (boxID === '8') {
            if (!$('#2').hasClass('taken')) {
                nextEdge = '2';
                nextEdgePlay = '#2';
            } else {
                PlayAdjCorner();
            }
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
        console.log("computer has played box " + nextEdgePlay + " (from PlayOppositeEdge)");
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
        console.log("computer has played box " + nextEdgeToCorner + " (from PlayEdgeToCorner)");
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    
    /* respond to edge with a random adjacent corner */
    const PlayRandAdjCorner = function () {
        var randAdjCorner = '',
            randAdjCornerPlay = '',
            rand = Math.random();
        
        if (boxID === '2') {
            if (rand < .499) {
                randAdjCorner = '1';
                randAdjCornerPlay = '#1';
            } else {
                randAdjCorner = '3';
                randAdjCornerPlay = '#3';
            }
        } else if (boxID === '4') {
            if (rand < .499) {
                randAdjCorner = '1';
                randAdjCornerPlay = '#1';
            } else {
                randAdjCorner = '7';
                randAdjCornerPlay = '#7';
            }
        } else if (boxID === '6') {
            if (rand < .499) {
                randAdjCorner = '3';
                randAdjCornerPlay = '#3';
            } else {
                randAdjCorner = '7';
                randAdjCornerPlay = '#7';
            }
        } else if (boxID === '8') {
            if (rand < .499) {
                randAdjCorner = '7';
                randAdjCornerPlay = '#7';
            } else {
                randAdjCorner = '9';
                randAdjCornerPlay = '#9';
            }
        }
        
        computerSquaresArr.push(randAdjCorner);
        $(randAdjCornerPlay).addClass('taken');
        if (computerIcon === 'X') {
            $(randAdjCornerPlay)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500);                    
        } else {
            $(randAdjCornerPlay)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500);   
        }
        console.log("computer has played box " + randAdjCornerPlay + " (from PlayRandAdjCorner)");
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    
  /* respond to edge play with adjacent corner - if available */ 
    const PlayAdjCorner = function () {
        var adjCorner = '',
            adjCornerPlay = '';
        
        if (boxID === '2') {
            if (!$('#1').hasClass('taken')) {
                adjCorner = '1';
                adjCornerPlay = '#1';
            } else if (!$('#3').hasClass('taken')) {
                adjCornerdjCorner = '3';
                adjCornerPlay = '#3';
            } else {
                PlayOppositeEdge();
            }
        } else if (boxID === '4') {
            if ($('#1').hasClass('taken')) {
                adjCorner = '7';
                adjCornerPlay = '#7';
            } else if ($('#7').hasClass('taken')) {
                adjCorner = '1';
                adjCornerPlay = '#1';
            } else {
                PlayOppositeEdge();
            }
        } else if (boxID === '6') {
            if ($('#3').hasClass('taken')) {
                adjCorner = '9';
                adjCornerPlay = '#9';
            } else if ($('#9').hasClass('taken')) {
                adjCorner = '3';
                adjCornerPlay = '#3';
            } else {
                PlayOppositeEdge();
            }
        } else if (boxID === '8') {
            if ($('#7').hasClass('taken')) {
                adjCorner = '9';
                adjCornerPlay = '#9';
            } else if ($('#9').hasClass('taken')) {
                adjCorner = '7';
                adjCornerPlay = '#7';
            } else {
                PlayOppositeEdge();
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
        console.log("computer has played box " + adjCornerPlay + " (from PlayAdjCorner)");
        boxCount++; 
        console.log('boxCount is = ' + boxCount + ' and computer played last');
    };
    
    
    
    const BlockLogic = function () {
             // check if userSquaresArr contains the same values as any of the arrays in winningPatterns
    // duplicate the winningPattern array currently checking (using .slice()). 
    // if userSquaresArr first value matches any value in that array, remove that value from the array
    // then check second value in userSquaresArr against remaining values in same array in winningPattern. 
    // if an additional value matches, remove that value.
    // return the remaining value for the computer to play. 
    // if none of the moves match a winningPattern, select a random untaken box to play? (or go for winning move)    
        // usArr is short for userSquaresArr
        // wp is short for winningPatterns
        
        // usArrPos is position within userSquaresArr 
        // wpPos is position within winningPatterns (to fecth subArray)
        // wpSubArrPos is position within winningPatterns 
        // wpCurVal is value within winningPatterns subArray 
        
        var usArrPos = 0;

        for (var wpVal = 0; wpVal < winningPatterns.length; wpVal++ ) { 
            if (usArrPos >= userSquaresArr.length) { 
              usArrPos = 0; 
            }
            var checkWP = winningPatterns[wpVal].slice(); 
            console.log("WinningPattern " + wpVal + ": " + checkWP);
            var wpPos = 0;
            for (var wpCurVal = 0; wpCurVal <= winningPatterns[wpPos].length; wpCurVal++ ) {
                var userValue = userSquaresArr[usArrPos],
                    valPresent = checkWP.indexOf(userValue, 0);
                console.log("user has played " + userSquaresArr);
                console.log(userValue + " is current UserValue");
                if (valPresent > -1) {
                    checkWP.splice(valPresent, 1);
                    var checkWPleng = checkWP.length;    
                    console.log("the userValue is present in the current winningPattern at position " + valPresent)
                    usArrPos++; 
                    console.log("length of checkWP:" + checkWP.length);
                    if (checkWPleng < 2) {
                        var compNextMove = checkWP[0];
                        console.log("computer's next move should be " + compNextMove);
                        return compNextMove;
                    }
                } else if (valPresent == -1) { 
                  usArrPos++; 
                } /* else {  // if the user hasn't played any of the winning combinations
                    // select random untaken box
                    /* cycle through 1-9 until find one not in userSquaresArr or compSquaresArr? */
                    /* merge both & then check? 
                } */
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
                    PlayRandAdjCorner();
                }        
            }         
        } else if (boxCount >= 3) {
            //compNextMove = BlockLogic();
            // Lucas's alteration now isn't working and my original script for this function works fine. Very bizarre.
            compNextMove = BlockLogic();
          
            console.log("Computer's next move: " + compNextMove);
            if ($('#'+compNextMove).hasClass('taken')) {
                console.log("the move suggested by BlockLogic " + compNextMove + " is taken. Recalculating.")
                // if the user plays a corner, respond with an adjacent available edge box
                if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                    PlayEdgeToCorner(); 
                // if the user plays an edge, respond with an adjacent available corner box
                } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                    PlayAdjCorner();
                } else if (boxID === '5') {
                    PlayCorner();
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
