$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxCount = 0 /*, 
        cross = $('<img></>')
            .attr('src', 'cross-small.png')
            .attr('alt', 'cross icon')
            .addClass('player-icon'),
        circle = $('<img></>')
            .attr('src', 'circle-outline-128.png')
            .attr('alt', 'circle icon')
            .addClass('player-icon')*/; 

    
  /* hide selection board & display game board */   
    const HideSelect = function() {
        $('.game-board').removeClass('hidden');
        $('#game-select').addClass('hidden');
    } 

  /* set user icon and computer icon */     
    $( '#cross' ).on('click', function() {
        userIcon = 'X';
        computerIcon = 'O';
        $('#x-turn').removeClass('hidden');
        HideSelect();
    });   
    
    $( '#circle' ).on('click', function() {
        userIcon = 'O';
        computerIcon = 'X';
        $('#o-turn').removeClass('hidden');
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
            $('#x-turn').fadeOut(200).addClass('hidden');
            $('#o-turn').fadeIn(800).removeClass('hidden');
            boxCount++; 
            DeterminePlayer();
            return boxCount;
        } else {
            $(this)
                .children('.player-icon-o')
                .fadeIn(500)
                .addClass('taken');
            $('#o-turn').addClass('hidden');
            $('#x-turn').fadeIn(800);
            boxCount++; 
            DeterminePlayer();
            return boxCount; 
        }
    });
    
    
    const ComputerPlay = function() {
            console.log('there are ' + boxCount + ' squares filled');
            //computer plays
            var positionCenter = userSquaresArr.indexOf('box5', 0);
            var positionCorner1 = userSquaresArr.indexOf('box1', 0);
            var positionCorner3 = userSquaresArr.indexOf('box3', 0);
            var positionCorner7 = userSquaresArr.indexOf('box7', 0);
            var positionCorner9 = userSquaresArr.indexOf('box9', 0);
            if (positionCenter > -1) {
                console.log("the user played the center square");
                computerSquaresArr.push("box1");
                if (computerIcon === 'X') {
                    $('#box1')
                        .children('.player-icon-x')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    console.log("computer has played " + computerSquaresArr);
                    boxCount++;
                    $('#o-turn').delay(1300).fadeIn(800);
                    $('#x-turn').addClass('hidden');
                    
                } else {
                    $('#box1')
                        .children('.player-icon-o')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    console.log("computer has played " + computerSquaresArr);
                    boxCount++;
                    $('#o-turn').addClass('hidden');
                    $('#x-turn').delay(1300).fadeIn(800);
                }
            } else if ((positionCorner1 > -1) || (positionCorner3 > -1) || (positionCorner7 > -1) || (positionCorner9 > -1)) {
                 computerSquaresArr.push("box5");
                 if (computerIcon === 'X') {
                    $('#box5')
                        .children('.player-icon-x')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                     console.log("computer has played " + computerSquaresArr);
                     boxCount++;
                     $('#o-turn').addClass('hidden');
                     $('#x-turn').fadeIn(800);
                } else {
                    $('#box5')
                        .children('.player-icon-o')
                        .delay(800)
                        .fadeIn(500)
                        .addClass('taken');
                    console.log("computer has played " + computerSquaresArr);
                    boxCount++;
                    $('#x-turn').addClass('hidden');
                    $('#o-turn').fadeIn(800);    
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
