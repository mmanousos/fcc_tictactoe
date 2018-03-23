$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        compSquaresArr = [],
        usArrLen = userSquaresArr.length,
        csArrLen = compSquaresArr.length,
        rand = Math.random(),
        /* for checking wins */
        userWin,
        compWin,
        /* for determining random next move */ 
        totalSquares = [],
        possibleSquares = ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        /* end random next move variables */
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
    
    
  /* helper function to sort arrays in ascending order - not really necessary*/     
    const Ascending = function ( a, b ) {
            return a - b;
    }     
    
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
    

  /* check if user won */ 
    const UserWins = function () {
        for (var i = 0; i <= winningPatterns.length - 1; i++) {
            var wpTest = winningPatterns[i];
            var a1 = wpTest[0],
                a2 = wpTest[1],
                a3 = wpTest[2];
            if ((userSquaresArr.includes(a1)) && (userSquaresArr.includes(a2)) && (userSquaresArr.includes(a3))) {
                console.log("user has played a winning pattern!");
                return true;
            } 
        }
    }

    
  /* check if computer won */ 
    const CompWins = function () {
        for (var i = 0; i <= winningPatterns.length - 1; i++) {
            var wpTest = winningPatterns[i];
            var a1 = wpTest[0],
                a2 = wpTest[1],
                a3 = wpTest[2];
            if ((compSquaresArr.includes(a1)) && (compSquaresArr.includes(a2)) && (compSquaresArr.includes(a3))) {
                console.log("computer has played a winning pattern!");
                return true;
            } 
        }
    }
  
   
  /* check for winners */      
    const CheckWinners = function() {
        userWin = UserWins(); 
        compWin = CompWins(); 
        console.log("userWin: " + userWin + " and compWin: " + compWin);
        if (userWin === true) {
            return userWin;
        } else if (compWin === true) { 
            return compWin;
        } 
    }
    
  /* calculate which turn should be taken & if game is over */
    const DeterminePlayer = function() {
        if (boxCount % 2 !== 0) {
            if (boxCount === 9) {
                CheckWinners();
                if (userWin === true) {
                    console.log("user wins!");
                    $('#user-win').toggleClass('hidden').addClass('displayed'); 
                    $('#game-status').toggleClass('hidden');
                } else if (compWin === true) { 
                    console.log("computer wins!");
                    $('#comp-win').toggleClass('hidden').addClass('displayed'); 
                    $('#game-status').toggleClass('hidden');
                } else if ((userWin !== true) && (compWin!== true)) { 
                    console.log("it's a tie!");
                    $('#tied-game').toggleClass('hidden').addClass('displayed'); 
                    $('#game-status').toggleClass('hidden');
                }
            } else if (boxCount >= 5) {
                // check if there is a winner
                CheckWinners();
                if ((userWin !== true) && (compWin !== true)) { // if neither have won
                    ComputerPlay();
                }
            } else {
                console.log("computer's turn");
                ComputerPlay();
            }
        } else {
            if (boxCount >=5) {
                // check if there is a winner
                CheckWinners();
                if (userWin === true) {
                    console.log("user wins!");
                    $('#user-win').toggleClass('hidden').addClass('displayed'); 
                    $('#game-status').toggleClass('hidden');
                } else if (compWin === true) {
                    console.log("computer wins!");
                    $('#comp-win').toggleClass('hidden').addClass('displayed'); 
                    $('#game-status').toggleClass('hidden');
                }
            } else {
            console.log("It's the user's turn.");
            }
        }
    }     
    
    
  /* 'Play Again' button - resets game */    
    $('#again').on('click', function() {
        console.log("### RESET");
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
        // hide the game board 
        $('#game-board').toggleClass('hidden');
        // hide the game-status display (winner status)
        $('#game-status').toggleClass('hidden');
        // rehide 'tied game' notification to ready for subsequent games
        if (boxCount === 9) { 
            if ($('#tied-game').hasClass('displayed')) {
                $('#tied-game').toggleClass('hidden').removeClass('displayed');
            } else if ($('#comp-win').hasClass('displayed')) {
                $('#comp-win').toggleClass('hidden').removeClass('displayed'); 
            } else if ($('#user-win').hasClass('displayed')) {
                $('#user-win').toggleClass('hidden').removeClass('displayed'); 
            }
        } else {
            if ($('#comp-win').hasClass('displayed')) {
                $('#comp-win').toggleClass('hidden').removeClass('displayed'); 
            } else if ($('#user-win').hasClass('displayed')) {
                $('#user-win').toggleClass('hidden').removeClass('displayed'); 
            }
        }
        // clear boxCount and other tracking data
        userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        compSquaresArr = [],
        boxID = '',
        boxCount = 0;
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
                    .fadeIn(300);
            } else {
                $(this)
                    .children('.player-icon-o')
                    .fadeIn(300);            
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
    
  /* respond to center or edge play with corner */ 
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
                    compNextMove = PlayCorner();
                }
            } else if (boxID === '4') {
                if (!$('#6').hasClass('taken')) {
                    compNextMove = '6';
                } else {
                    compNextMove = PlayCorner();
                }
            } else if (boxID === '6') {
                if (!$('#4').hasClass('taken')) {
                    compNextMove = '4';
                } else {
                    compNextMove = PlayCorner();
                }
            } else if (boxID === '8') {
                if (!$('#2').hasClass('taken')) {
                    compNextMove = '2';
                } else {
                    compNextMove = PlayCorner();
                }
            }
        }
    };
    
    /* respond to corner with adjacent edge */ 
    const PlayAdjEdge = function() {            
        if (boxID === '1') {
            if ($('#2').hasClass('taken')) {
                compNextMove = '4';
            } else if ($('#4').hasClass('taken')) {
                compNextMove = '2';
            } else {
                compNextMove = RandomPlay();
            }
        } else if (boxID === '3') {
            if ($('#2').hasClass('taken')) {
                compNextMove = '6';
            } else if ($('#6').hasClass('taken')) {
                compNextMove = '2';
            } else {
                compNextMove = RandomPlay();
            }
        } else if (boxID === '7') {
            if ($('#6').hasClass('taken')) {
                compNextMove = '8';
            } else if ($('#8').hasClass('taken')) {
                compNextMove = '4';
            } else {
                compNextMove = RandomPlay();
            }
        
        } else if (boxID === '9') {
            if ($('#6').hasClass('taken')) {
                compNextMove = '8';
            } else if ($('#8').hasClass('taken')) {
                compNextMove = '6';
            } else {
                compNextMove = RandomPlay();
            }       
        }
    };
       
    
    const RandomPlay = function () {
        //select random untaken box
        /* cycle through 1-9 until find one not in userSquaresArr or compSquaresArr */
        /* merge both & then check */
    
        totalSquares = userSquaresArr.concat(compSquaresArr);
        totalSquares.sort( Ascending ); 
        console.log('all squares played to this point are: ' + totalSquares);

        for (var num = 0; num <= possibleSquares.length; num++) {
            var isPres = possibleSquares[num],
                valPresentTotal = totalSquares.includes(isPres);
            if (valPresentTotal === true) {
                num++;
            } else {
                compNextMove = isPres; 
                console.log('next random move should be ' + compNextMove);
                if ($('#'+compNextMove).hasClass('taken')) {
                    // go to next value in possibleSquares
                    num++;
                } else { 
                    return compNextMove;
                    break;
                }
            } 
        }
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
        // wpVal is position within winningPatterns (subArray itself)
        // wpCurVal is value within winningPatterns subArray 
        
        var usArrPos = 0;
        userSquaresArr = userSquaresArr.sort(Ascending);
        for (var wpVal = 0; wpVal < winningPatterns.length; wpVal++ ) { 
            if (usArrPos >= usArrLen) { 
              usArrPos = 0; 
            }
            var checkWP = winningPatterns[wpVal].slice(); 
            console.log("* WinningPattern " + wpVal + ": " + checkWP);
            console.log("user has played " + userSquaresArr);
            var wpPos = 0;
            for (var wpCurVal = 0; wpCurVal <= winningPatterns[wpPos].length - 1; wpCurVal++ ) {
                var userValue = userSquaresArr[usArrPos],
                    valPresent = checkWP.indexOf(userValue, 0); // check if the userValue is present in the winningPattern subarray
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
                        if ($('#'+compNextMove).hasClass('taken')) {
                            console.log(compNextMove + " is taken. Checking additional available.")
                            // go to next subarray in WP and continue checking against possible blocks (wpVal)
                            wpVal++;
                            if (wpVal >= winningPatterns.length) {
                                console.log("there are no additional appropriate blocks");
                                compNextMove = RandomPlay();
                                return compNextMove;    
                            }
                        } else { 
                            return compNextMove;
                        }
                    }
                } else if (valPresent == -1) { 
                    usArrPos++; 
                    if (wpVal === winningPatterns.length -1) {
                        console.log("wpVal is: " + wpVal);
                        wpVal++; 
                        console.log("none of the moves played so far are within a winning pattern so block randomly");
                        compNextMove = RandomPlay();
                        return compNextMove;
                    }
                } 
            };
        };
    }
    
    const WinLogic = function () {
             // check if userSquaresArr contains the same values as any of the arrays in winningPatterns
    // duplicate the winningPattern array currently checking (using .slice()). 
    // if userSquaresArr first value matches any value in that array, remove that value from the array
    // then check second value in userSquaresArr against remaining values in same array in winningPattern. 
    // if an additional value matches, remove that value.
    // return the remaining value for the computer to play. 
    // if none of the moves match a winningPattern, select a random untaken box to play? (or go for winning move)    
        // csArr is short for compSquaresArr
        // wp is short for winningPatterns
        
        // csArrPos is position within compSquaresArr 
        // wpPos is position within winningPatterns (to fecth subArray)
        // wpVal is position within winningPatterns (subArray itself)
        // wpCurVal is value within winningPatterns subArray 
        
        var csArrPos = 0;

        for (var wpVal = 0; wpVal < winningPatterns.length; wpVal++ ) { 
            if (csArrPos >= csArrLen) { 
              csArrPos = 0; 
            }
            var checkWP = winningPatterns[wpVal].slice(); 
            console.log("WinningPattern " + wpVal + ": " + checkWP);
            var wpPos = 0;
            for (var wpCurVal = 0; wpCurVal <= winningPatterns[wpPos].length - 1; wpCurVal++ ) {
                var compValue = compSquaresArr[csArrPos],
                    valPresent = checkWP.indexOf(compValue, 0);
                console.log("computer has played " + compSquaresArr);
                console.log(compValue + " is current compValue");
                if (valPresent > -1) {
                    checkWP.splice(valPresent, 1);
                    var checkWPleng = checkWP.length;    
                    console.log("the compValue is present in the current winningPattern at position " + valPresent)
                    csArrPos++; 
                    console.log("length of checkWP:" + checkWP.length);
                    if (checkWPleng < 2) {
                        compNextMove = checkWP[0];
                        console.log("computer's next move to win should be " + compNextMove);
                        if ($('#'+compNextMove).hasClass('taken')) {
                            // go to next subarray in WP and continue checking against possible wins (wpVal) 
                            wpVal++;
                            if (wpVal === winningPatterns.length) {
                                break;
                            }
                        } else { 
                            return compNextMove;
                        }
                    }
                } else if (valPresent == -1) { 
                  csArrPos++; 
                } /* else {  // if the computer hasn't played any of the winning combinations
                    // select random untaken box ?
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
        if (boxCount === 1) {
            if (boxID === '5') {
                //compNextMove = PlayCorner();
                PlayCorner();
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
        } 
        else if (boxCount >= 3) {
            if (boxCount === 3) {
                compNextMove = BlockLogic();
            } else if (boxCount > 3) {
                WinLogic();
                if ($('#'+compNextMove).hasClass('taken')) {
                    console.log("the move suggested by WinLogic " + compNextMove + " is taken. Calculating block.")
                    BlockLogic();
                } else { 
                    console.log("computer's next move can go in box " + compNextMove + " because it's not taken");
                }
            }
          
        //    console.log("Computer's next move: " + compNextMove);
         /*   if ($('#'+compNextMove).hasClass('taken')) {
                console.log("the move suggested by BlockLogic " + compNextMove + " is taken. Recalculating.")
                // if the user plays a corner, respond with an adjacent available edge box
                if ((boxID === '1') || (boxID === '3') || (boxID === '7') || (boxID === '9')) {
                    compNextMove = PlayAdjEdge(); 
                // if the user plays an edge, respond with an adjacent available corner box
                } else if ((boxID === '2') || (boxID === '4') || (boxID === '6') || (boxID === '8')) {
                    compNextMove = PlayCorner();
                } else if (boxID === '5') {
                    PlayCorner();
                } */
            //}
            //else {    
            }
        if (computerIcon === 'X') {
            $('#'+compNextMove)
                .children('.player-icon-x')
                .delay(300)
                .fadeIn(300);                                    
        } else {
            $('#'+compNextMove)
                .children('.player-icon-o')
                .delay(300)
                .fadeIn(300);  
        }
        $('#'+compNextMove).addClass('taken');    
        compSquaresArr.push(compNextMove);
        console.log("computer has played box #" + compNextMove);
        boxCount++;
        console.log('boxCount is = ' + boxCount + ' and computer played last');
        DeterminePlayer();
    };   
});