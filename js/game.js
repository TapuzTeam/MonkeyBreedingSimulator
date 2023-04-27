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

initialize()
function initialize(){
  monkeys = [];
  createAllMonkeys = true;
  //Sprite locations in id
  fetch('./monkeys.json')
  .then((response) => response.json())
  .then((json) => monkeysInfo = json);
  waitForJson()
} 

//waits for monkeys.json to be loaded
function waitForJson(){
  if(typeof monkeysInfo !== "undefined"){
    createMonkeyDIVs()
  }
  else{
      setTimeout(waitForJson, 5);
  }
}

function monkey(type='basic'){
    this.type = type;
}

function createMonkey(type){
  monkeys.push(new monkey(type))
}

function createMonkeyDIV(monkey){
  let div = document.createElement('div');
  let pos = monkeysInfo[monkey.type].id;
  let row = Math.floor(pos/32)
  let col = pos%32

  div.classList.add('monkey');
  div.style.backgroundPosition = `${col * -64} ${row * -64}`

  document.getElementsByClassName('monkeyColumn')[0].appendChild(div)
}

function createMonkeyDIVs(){
  if (createAllMonkeys){
    for (const [type, attributes] of Object.entries(monkeysInfo)) {
      createMonkey(type)
    }
  }
    monkeys.forEach(monkey => {
      createMonkeyDIV(monkey);
    });
  
  
}





$( document ).ready(function() {
  //adds Jquery.exists()
  jQuery.fn.exists = function(){ return this.length > 0; }
  $( function() {
      $( ".monkeyColumn" ).sortable({
      containment: $('.gamePage'),
      connectWith: ".connectedSortable",
      cursorAt: {top: 31, left: 31 },
      revert: false,
      tolerance: 'pointer',
      receive: function( event, ui ) {
        removeDraggable($('.draggable, ui-draggable-dragging', $('.monkeyColumn')), false)
        ui.item.remove()
        console.log('received')
    },
  }).disableSelection();
  });
  $('.monkeyColumn, .breedingSlot').on('sortupdate',function(){
  //console.log('updated!');
});

$('.breedingSlot').droppable({
  accept: ".monkey",
  drop: function( event, ui ) {
    droppableOrigin = event.target
    ctx = ui.draggable
    ctx.css('display','none')
      $(this)
          setTimeout(() => {
            ctx.css('display','').css('top', '').css('left', '')
              moveDivs()
              ui.draggable.addClass('draggable')
              ctx.css('position','inherit')
              $('.exists').remove()
              droppableOrigin.appendChild(ctx[0])
              $('.exists').removeClass('exists')

              $(".draggable").draggable({
              connectToSortable: '.monkeyColumn',
              cursor: 'pointer',
              cursorAt: {top: 31, left: 31 },
              helper: 'clone',
              zIndex: 1000,
              revert: 'invalid',
              containment: $('.gamePage'),
              scroll: false,
              appendTo: $('.monkeyColumn'),
              start: function(event, ui){
                console.log('ass')
                $(this).addClass('exists')
              },
              
            });
            console.log($('.exists'))

          }, 0);
          

}})



});

function moveDivs(){
  var lis = droppableOrigin.getElementsByTagName('div')
  if (lis.length == 0){return;}
  for( i=0; i <= lis.length; i++ ){
      removeDraggable($('.monkey', droppableOrigin))

      $('.monkey', droppableOrigin).appendTo($('.monkeyColumn')[0])
    }  
}

function removeDraggable($item, needsDestroy=true){
  $item.removeClass('draggable').removeClass('ui-draggable').removeClass('ui-draggable-handle')
  if (needsDestroy){$item.draggable('destroy')}
  console.log('destroyed')
}
