$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        rand = Math.random(),
        compNextMove = '',
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
    
    
  /* calculate which turn should be taken & if game is over */
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
    
  /* user plays if no moves have been made */ 
    if (boxCount === 0) {
        UserPlay();
    } 
    
  /* respond to center or edge play with corner */ /* REVISE */
    const PlayCorner = function() {
        // for first move
        if (boxCount === 1) { 
            // if it's the center box, play a random corner
            if (boxID === '5') {
                if (rand < .249) {
                    compNextMove = '1';
                } else if (rand < .499) {
                    compNextMove = '3';
                } else if (rand < .749) {
                    compNextMove = '7';
                } else {
                    compNextMove = '9';
                }
            // otherwise, if it's an edge, play a one of it's two adjacent corners 
            } else if (boxID === '2') {
                if (rand < .499) {
                    compNextMove = '1';
                } else {
                    compNextMove = '3';
                }
            } else if (boxID === '4') {
                if (rand < .499) {
                    compNextMove = '1';
                } else {
                    compNextMove = '7';
                }
            } else if (boxID === '6') {
                if (rand < .499) {
                    compNextMove = '3';
                } else {
                    compNextMove = '7';
                }
            } else if (boxID === '8') {
                if (rand < .499) {
                    compNextMove = '7';
                } else {
                    compNextMove = '9';
                }
            }    
        } else {
            // specific adjacent corner or opposite edge on subsequent moves
            if (boxID === '2') {
                if (!$('#1').hasClass('taken')) {
                    compNextMove = '1';
                } else if (!$('#3').hasClass('taken')) {
                    compNextMove = '3';
                } else {
                    compNextMove = PlayOppositeEdge();
                }
            } else if (boxID === '4') {
                if ($('#1').hasClass('taken')) {
                    compNextMove = '7';
                } else if ($('#7').hasClass('taken')) {
                    compNextMove = '1';
                } else {
                    compNextMove = PlayOppositeEdge();
                }
            } else if (boxID === '6') {
                if ($('#3').hasClass('taken')) {
                    compNextMove = '9';
                } else if ($('#9').hasClass('taken')) {
                    compNextMove = '3';
                } else {
                    compNextMove = PlayOppositeEdge();
                }
            } else if (boxID === '8') {
                if ($('#7').hasClass('taken')) {
                    compNextMove = '9';
                } else if ($('#9').hasClass('taken')) {
                    compNextMove = '7';
                } else {
                    compNextMove = PlayOppositeEdge();
                }
            }
        }
    };
    
  /* respond to corner play*/ 
    const PlayCenter = function() {
        if (boxCount === 1) {
            compNextMove = '5';
        //    console.log("computer has played box #5 (from PlayCenter)");
        } else {
            if ($('#5').hasClass('taken')) { // if the center box is taken
                compNextMove = PlayAdjEdge(); // play adacent edge
            } else {
                compNextMove = '5';
            }
        }
    };
    
  /* respond to edge with opposite edge*/
    const PlayOppositeEdge = function() {
        if (boxCount === 1) { 
            if (boxID === '2') { 
                compNextMove = '8';
            } else if (boxID === '4') {
                compNextMove = '6';
            } else if (boxID === '6') {
                compNextMove = '4';
            } else if (boxID === '8') {
                compNextMove = '2';  
            }
        } else { 
            if (boxID === '2') {
                if (!$('#8').hasClass('taken')) {
                    compNextMove = '8';
                } else {
                    compNextMove = PlayAdjCorner();
                }
            } else if (boxID === '4') {
                if (!$('#6').hasClass('taken')) {
                    compNextMove = '6';
                } else {
                    compNextMove = PlayAdjCorner();
                }
            } else if (boxID === '6') {
                if (!$('#4').hasClass('taken')) {
                    compNextMove = '4';
                } else {
                    compNextMove = PlayAdjCorner();
                }
            } else if (boxID === '8') {
                if (!$('#2').hasClass('taken')) {
                    compNextMove = '2';
                } else {
                    compNextMove = PlayAdjCorner();
                }
            }
        }
    };
    
    /* respond to corner with adjacent edge */ /* ADDITIONS NEEDED */
    const PlayAdjEdge = function() {            
        if (boxID === '1') {
            if ($('#2').hasClass('taken')) {
                compNextMove = '4';
            } else {
                compNextMove = '2';
            }
        } else if (boxID === '3') {
            if ($('#2').hasClass('taken')) {
                compNextMove = '6';
            } else {
                compNextMove = '2';
            }
        } else if (boxID === '7') {
            if ($('#6').hasClass('taken')) {
                compNextMove = '8';
            } else {
                compNextMove = '4';
            }
        } else if (boxID === '9') {
            if ($('#6').hasClass('taken')) {
                compNextMove = '8';
            } else {
                compNextMove = '6';
            }        
        }
        //*** need to add logic in case both adjacent edges are taken ***//
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
                        compNextMove = checkWP[0];
                        console.log("computer's next move should be " + compNextMove);
                      /*  if ($('#'+compNextMove).hasClass('taken')) {
                            // go to next subarray in WP and continue checking against possible blocks (wpPos) 
                        } else { */
                            return compNextMove;
                    //    }
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
                compNextMove = PlayCorner();
            } else if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                PlayCenter(); 
            } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                // if an edge is played, randomly play the center, the opposite edge, or an adjacent corner    
                if (rand < .333) {
                    PlayCenter();
                } else if (rand < .666) {
                    PlayOppositeEdge();
                } else {
                    PlayCorner();
                }        
            }
            if (computerIcon === 'X') {P
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
            
        } else if (boxCount >= 3) {
            compNextMove = BlockLogic();
          
            console.log("Computer's next move: " + compNextMove);
            if ($('#'+compNextMove).hasClass('taken')) {
                console.log("the move suggested by BlockLogic " + compNextMove + " is taken. Recalculating.")
                // if the user plays a corner, respond with an adjacent available edge box
                if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                    compNextMove = PlayAdjEdge(); 
                // if the user plays an edge, respond with an adjacent available corner box
                } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                    compNextMove = PlayCorner();
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

