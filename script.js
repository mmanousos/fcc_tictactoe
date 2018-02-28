$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxID = '',
        boxCount = 0, 
        nextEdge = '';
    
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
    
  /* calculate which turn should be taken */
    const DeterminePlayer = function() {
        if (boxCount % 2 !== 0) {
            ComputerPlay();
        } else {
            console.log("it's the user's turn.");
        }
    }  
    
  /* user play functionality - displays icon, pushes box value to array, increases box counter, marks box as taken, returns boxID and boxCount */ 
    const UserPlay = function () {
        $('.boxes').on('click', function() {
            boxID = this.id;
            userSquaresArr.push(boxID);
            console.log(userSquaresArr);
            if (userIcon === 'X') {
                $(this)
                    .children('.player-icon-x')
                    .fadeIn(500)
                    .addClass('taken');
                boxCount++; 
                console.log('boxCount is = ' + boxCount);
                console.log("user played " + boxID + ' (from UserPlay function)');
                DeterminePlayer();
            } else {
                $(this)
                    .children('.player-icon-o')
                    .fadeIn(500)
                    .addClass('taken');            
                boxCount++; 
                console.log('boxCount is = ' + boxCount);
                console.log("user played " + boxID);
                DeterminePlayer();
            }
        });
    };
    
    if (boxCount === 0) {
        UserPlay();
    } 
    
    /* respond to center play */ 
    const PlayCorner = function() {
        computerSquaresArr.push("1");
        if (computerIcon === 'X') {
            $('#1')
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            console.log("computer has played box #1");
            boxCount++;
        } else {
            $('#1')
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            console.log("computer has played box #1");
            boxCount++;                    
        }   
    };
    
    /* respond to corner play*/ 
    const PlayCenter = function() {
        computerSquaresArr.push("5");
        if (computerIcon === 'X') {
            $('#5')
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            console.log("computer has played box #5");
            boxCount++;                     
        } else {
            $('#5')
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            console.log("computer has played box #5");
            boxCount++;    
        }
    };
    
    const PlayOppositeEdge = function() {
        if (boxID === '2') {
            nextEdge = '#8';
        } else if (boxID === '4') {
            nextEdge = '#6';
        } else if (boxID === '6') {
            nextEdge = '#4';
        } else if (boxID === '8') {
            nextEdge = '#2'; 
        } 
        if (computerIcon === 'X') {
            $(nextEdge)
                .children('.player-icon-x')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            computerSquaresArr.push(nextEdge);
            console.log("computer has played box " + nextEdge);
            boxCount++;                     
        } else {
            $(nextEdge)
                .children('.player-icon-o')
                .delay(800)
                .fadeIn(500)
                .addClass('taken');
            computerSquaresArr.push(nextEdge);
            console.log("computer has played box " + nextEdge);
            boxCount++;    
        }
    };
    
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
                // if center square isn't taken, computer plays center
             //   if (!$('#5').hasClass('taken')) {
            //        PlayCenter();
            //    } else {  // otherwise play opposite edge
                //UsersPlay();    
                PlayOppositeEdge();
            //    } 
            }         
        }    
    };
        
        
    
    
  
    
});
