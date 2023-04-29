function getVar(variable) {
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r)
  return rs.getPropertyValue(variable);
}
function setVar(variable, value, location=':root') {
    let r = document.querySelector(location);
  r.style.setProperty(variable, value);
}







$('.compendium').draggable({
  //containment: [-1200, -1550, 100, 100],
  refreshPositions: true,
  scroll: false
})

$('.compendiumMonkey').draggable({
    containment: 'parent',
    scroll: false
})

    var scale = 1,
        zoom = document.getElementsByClassName("compendium")[0];
        parent = document.getElementsByClassName('compendiumBackground')[0]

      function setTransform() {
        console.log(scale)
        zoom.style.transform = " scale(" + scale + ")";

      }

      

      parent.onwheel = function (e) {
        e.preventDefault();
        var delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale += .200000) : (scale -= .200000);
        scale = Math.round(scale*10)/10
        if (scale < 0.4){scale=(0.4)} else if (scale > 3){scale = 3};
        setTransform();
      }


