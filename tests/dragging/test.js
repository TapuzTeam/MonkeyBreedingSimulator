// Make the DIV element draggable:
//dragElement(document.getElementById("mydiv"));


    $('#mydiv').draggable({ start: function() {
        $(this).css({transform: "none", top: $(this).offset().top+"px", left:$(this).offset().left+"px"});
    },
        cursorAt: {top: 31, left: 31 },
        containment: $('.dad'),
        revert: true,
        //containment: 'document',
        //handle: "#mydiv"

     });




$('.dropbox').droppable({
    drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          
            .html( "Dropped!" );
      }
})