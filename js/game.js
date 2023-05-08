function openTab(tabName) {
    var i;
    var tabs = document.getElementsByClassName("tab");
    var ctx = ['production','breeding','infusion'].indexOf(tabName)
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
      document.getElementsByClassName('tab-button')[i].classList.remove('bg-gold');
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementsByClassName('tab-button')[ctx].classList.add('bg-gold')
  }

function getVar(variable) {
  let r = document.querySelector(':root');
  let rs = getComputedStyle(r)
  return rs.getPropertyValue(variable);
}
function setVar(variable, value, location=':root') {
  let r = document.querySelector(location);
  r.style.setProperty(variable, value);
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

  //Compendium
    scale = 1;
    zoom = document.getElementsByClassName("compendium")[0];
    parent = document.getElementsByClassName('compendiumBackground')[0]
    
    parent.onwheel = function (e) {
      e.preventDefault();
      var delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
      (delta > 0) ? (scale += .2) : (scale -= .2);
      scale = Math.round(scale*10)/10
      if (scale < 0.4){scale=(0.4)} else if (scale > 3){scale = 3};
      setTransform();
    }
} 



isDebug = true;
if (isDebug){var debug = console.log.bind(window.console)}
else {var debug = function(){}}


function compendiumSwitch(option = 'open'){
  if (option == 'open'){
    $('body').css('overflow', 'hidden')
    $('.gamePage').css('display', 'none')
    $('.compendiumBackground').css('display', '');
    
  } else {
    $('body').css('overflow', '')
    $('.gamePage').css('display', '')
    $('.compendiumBackground').css('display', 'none');
    $('.compendium').css('top', -600).css('left', 0)
    scale = 1;
    setTransform()
  }
}

function setTransform() {
  zoom.style.transform = " scale(" + scale + ")";
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

function monkey(ID){
    let monkey = getMonkeyByID(ID) || getMonkeyByID('monkey_basic')

    this.monkeyID = monkey.monkeyID
    if (typeof monkey.series !== 'undefined'){this.series=monkey.series}

    this.createMonkeyDIV = function(parent=['monkeyColumn', 0]){
        let div = document.createElement('div'),
            pos = monkey.spriteID,
            row = Math.floor(pos/32),
            col = pos%32
        div.classList.add('monkey');
        div.style.backgroundPosition = `${col * -64} ${row * -64}`
        div.setAttribute('monkeyID', this.monkeyID)
        //div.test = this.monkeyID

        document.getElementsByClassName(parent[0])[parent[1]].appendChild(div)

        //document.getElementsByClassName('monkeyColumn')[0].appendChild(div)
      }
}

function createMonkey(ID){
  monkeys.push(new monkey(ID))
}



function createMonkeyDIVs(){
  if (createAllMonkeys){
    for (const [type, attributes] of Object.entries(monkeysInfo)) {
        //debug(type, attributes)
        createMonkey(attributes.monkeyID)
    }
  }
    monkeys.forEach(monkey => {
      monkey.createMonkeyDIV();
    });
}


/*
setInterval(() => {
  if(document.hasFocus()){
  debug('focused')}
}, 1000);
*/

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
        //debug('received')
    },
  }).disableSelection();
  });

  //Compendium draggable
  $('.compendium').draggable({
    refreshPositions: true,
    scroll: false
  })
  $('.compendiumMonkey').draggable({
      containment: 'parent',
      scroll: false
  })

  $('.monkeyColumn, .breedingSlot').on('sortupdate',function(){
  //debug('updated!');
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

            slotNum = $('.breedingSlot').index(this);
            getBreederBySlot(slotNum).addToBreeder(slotNum, ui)  
                
            $(".draggable").draggable({
              connectToSortable: '.monkeyColumn',
              cursor: 'pointer',
              cursorAt: {top: 31, left: 31 },
              helper: 'clone',
              zIndex: 1000,
              revert: function(is_valid_drop){
                if(!is_valid_drop){
                  $(this).removeClass("exists");
                  getBreederBySlot(ui.helper[0].getAttribute('breederSlot')*1).addToBreeder(ui.helper[0].getAttribute('breederSlot')*1, ui)  

                  return true;
               } else {
               }
              },
              containment: $('.gamePage'),
              scroll: false,
              appendTo: $('.monkeyColumn'),
              start: function(event, ui){
                $(this).addClass('exists');
                debug(ui.helper[0].attributes)
                check = ui.helper[0]
                //debug('slot'+(ui.helper[0].getAttribute('breederSlot')*1%2+1) + ': ', getBreederBySlot(ui.helper[0].getAttribute('breederSlot')*1)[['slot'+(ui.helper[0].getAttribute('breederSlot')*1%2+1)]])
                getBreederBySlot(ui.helper[0].getAttribute('breederSlot')*1).removeFromBreeder(ui.helper[0].getAttribute('breederSlot')%2)
              },
            });
          }, 0);
}})});

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
  //debug('destroyed')
}


