function getVar(variable) {
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r)
  return rs.getPropertyValue(variable);
}
function setVar(variable, value, location=':root') {
    let r = document.querySelector(location);
  r.style.setProperty(variable, value);
}
let 
setInterval(() => {
  getNewDistances()
}, interval);

function getNewDistances(){
  let compSize = [$('.compendium')[0].clientWidth/2, $('.compendium')[0].clientHeight/2]
  let backgroundSize = [$('.compendiumBackground')[0].clientWidth, $('.compendiumBackground')[0].clientHeight]
  
  console.log(backgroundSize + ' bg')
  console.log(compSize + ' comp')
  console.log($( ".compendium" ).draggable( "option", 'containment'))

  let compSizeX = compSize[0] * scale
  maxDistanceX = backgroundSize[0] - compSizeX

  let compSizeY = compSize[1] * scale
  maxDistanceY = backgroundSize[1] - compSizeY

  $( ".compendium" ).draggable( "option", 'containment', [ -compSize[0]*scale, -compSize[1]*scale, maxDistanceX, maxDistanceY,])
}
scaleX = -1200
scaleY = -1550

$('.compendium').draggable({
  //containment: [-1200, -1550, 100, 100],
  containment: 'parent',
  scroll: false
})

$('.compendiumMonkey').draggable({
    containment: 'parent',
    scroll: false
})

var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("zoom");
        parent = document.getElementsByClassName('compendiumBackground')[0]

      function setTransform() {

        zoom.style.transform = " scale(" + scale + ")";

      }

      

      parent.onwheel = function (e) {
        e.preventDefault();
        var xs = (e.clientX - pointX) / scale,
          ys = (e.clientY - pointY) / scale,
          delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale += .200000) : (scale -= .200000);
        scale = Math.round(scale*10)/10
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;
        if (scale < 0.4){scale=(0.4)} else if (scale > 3){scale = 3};
        getNewDistances()
        setTransform();
      }


