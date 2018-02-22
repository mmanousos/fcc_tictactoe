$(document).ready(function(){    
    var user_icon = "", 
        computer_icon = "", 
        cross = $('<img></>')
            .attr('src', 'cross-small.png')
            .attr('alt', 'cross icon')
            .addClass('player-icon'),
        circle = $('<img></>')
            .attr('src', 'circle-outline-128.png')
            .attr('alt', 'circle icon')
            .addClass('player-icon');

    
    
    const HideSelect = function() {
        $(".game-board").removeClass("hidden");
        $("#game-select").addClass("hidden");
    } 

    
    $( "#cross" ).on("click", function() {
        user_icon = "X";
        computer_icon = "O";
        $("#x-turn").removeClass("hidden");
        HideSelect();
    });   
    
    $( "#circle" ).on("click", function() {
        user_icon = "O";
        computer_icon = "X";
        $("#o-turn").removeClass("hidden");
        HideSelect();
    }); 
    
    $(".boxes").on("click", function() {
        if (user_icon === "X") {
            $(this).append(cross);
        } else {
            $(this).append(circle);
        }
    });
    

    
    
    
    
    
});
