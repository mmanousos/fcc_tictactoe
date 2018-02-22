$(document).ready(function(){    
    var userIcon = '', 
        computerIcon = '', 
        userSquaresArr = [],
        computerSquaresArr = [],
        boxCount = 0, 
        cross = $('<img></>')
            .attr('src', 'cross-small.png')
            .attr('alt', 'cross icon')
            .addClass('player-icon'),
        circle = $('<img></>')
            .attr('src', 'circle-outline-128.png')
            .attr('alt', 'circle icon')
            .addClass('player-icon');

    
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
            $(this).append(cross);
            $('#x-turn').addClass('hidden');
            $('#o-turn').removeClass('hidden');
            boxCount++; 
            DeterminePlayer();
            return boxCount;
        } else {
            $(this).append(circle);
            $('#o-turn').addClass('hidden');
            $('#x-turn').removeClass('hidden');
            boxCount++; 
            DeterminePlayer();
            return boxCount; 
        }
    });
    
    
    const ComputerPlay = function() {
            console.log('there are ' + boxCount + ' squares filled');
            //computer plays
            
        };
    
    const DeterminePlayer = function() {
        if (boxCount % 2 !== 0) {
            ComputerPlay();
        } else {
            console.log("it's the user's turn.");
        }
    }
    
    
    
    

    
    
    
    
    
});
