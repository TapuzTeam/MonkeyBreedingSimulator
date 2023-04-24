function openTab(tabName) {
    var i;
    var tabs = document.getElementsByClassName("tab");
    var ctx = ['production','breeding','Tokyo'].indexOf(tabName)
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
      document.getElementsByClassName('tab-button')[i].classList.remove('bg-gold');
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementsByClassName('tab-button')[ctx].classList.add('bg-gold')
  }
  

function monkey(){
    this.type = 'basic';
}


monkeys = []
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())
monkeys.push(new monkey())


function createMonkeys(){

}

function createMonkeyDIVs(){
  monkeys.forEach(monkey => {
    let div = document.createElement('div');
    div.classList.add('monkey');
    document.getElementsByClassName('monkeyColumn')[0].appendChild(div)
  });
}





$( document ).ready(function() {

  $( function() {
      $( ".monkeyColumn" ).sortable({
      connectWith: ".connectedSortable",
      cursorAt: {top: 31, left: 31 },
      revert: false,
      tolerance: 'pointer',
      receive: function( event, ui ) {
        removeDraggable($('.draggable, ui-draggable-dragging', $('.monkeyColumn')), false)
        ui.item.remove()
    },
  }).disableSelection();
  });

  $('.monkeyColumn, .breedingSlot').on('sortupdate',function(){
  //console.log('updated!');
});

$('.breedingSlot').droppable({
  drop: function( event, ui ) {
    droppableOrigin = event.target
    ctx = ui.draggable[0]
    ctx.style.display = 'none'
      $( this )
        .addClass( "ui-state-highlight" )
          setTimeout(() => {
              ctx.style.display = ''
              ctx.style.top = ''
              ctx.style.left = ''
              moveDivs()
              ui.draggable.addClass('draggable')
              droppableOrigin.appendChild(ctx)

              $(".draggable").draggable({
              connectToSortable: '.monkeyColumn',
              cursor: 'pointer',
              helper: 'clone',
              zIndex: 1000,
              revert: 'invalid',
              appendTo: $('.monkeyColumn')
            });}, 0);
}})

});

function moveDivs(){
  var lis = droppableOrigin.getElementsByTagName('div')
  if (lis.length == 0){return;}
  for( i=0; i <= lis.length; i++ ){
      removeDraggable($('.monkey', droppableOrigin))
      $('.monkey', droppableOrigin).appendTo($('.monkeyColumn')[0])      }  
}

function removeDraggable($item, needsDestroy=true){
  $item.removeClass('draggable').removeClass('ui-draggable').removeClass('ui-draggable-handle')
  if (needsDestroy){$item.draggable('destroy')}
  console.log('destroyed')
}

createMonkeyDIVs()