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

function createMonkeys(){

}

function createMonkeyDIVs(){
  monkeys.forEach(monkey => {
    let div = document.createElement('div');
    div.classList.add('monkey');

    $(div).draggable({ helper: 'clone',
    start: function(){ //hide original when showing clone
        $(this).hide();             
    },
    stop: function(){ //show original when hiding clone
        $(this).show();
    },
      cursorAt: {top: 31, left: 31 },
      containment: 'document',
      scroll:false,
      revert: false,
      distance: 1

   });

    document.getElementsByClassName('monkeyColumn')[0].appendChild(div)
  });
}

$( function() {
  $( ".monkeyColumn" ).sortable();
  $( ".monkeyColumn" ).disableSelection();
} );

createMonkeyDIVs()