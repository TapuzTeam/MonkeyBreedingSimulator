function getVar(variable) {
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r)
  return rs.getPropertyValue(variable);
}
function setVar(variable, value, location=':root') {
    let r = document.querySelector(location);
  r.style.setProperty(variable, value);
}
scaleX = -1500
scaleY = -2000
$('.compendiumBackground').draggable({
    containment: [scaleX, scaleY, 0, 0],
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
        if (scale < 0.33){scale=(0.334898)} else if (scale > 3.58){scale = 3.5831807999999996}

        zoom.style.transform = " scale(" + scale + ")";

        $( ".compendiumBackground" ).draggable( "option", "containment", [scaleX*scale*.75,scaleY*scale*.75, 0*scale, 0*scale]);
        setVar('--CompendiumTop', (200*scale)+'px')
        setVar('--CompendiumLeft', (200*scale)+'px')
        //console.log($( ".compendiumBackground" ).draggable( "option", "containment"))
      }

      

      parent.onwheel = function (e) {
        e.preventDefault();
        var xs = (e.clientX - pointX) / scale,
          ys = (e.clientY - pointY) / scale,
          delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
        (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;

        setTransform();
      }


