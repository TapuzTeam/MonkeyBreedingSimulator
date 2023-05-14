for(let i=0; i<4; i++){
    let div = document.createElement('div');
    div = document.getElementsByClassName('row')[0].cloneNode(true);
    document.getElementsByClassName('memoryGame')[0].appendChild(div)
}

$('.memoryBox').click(function(){
    let index = $('.memoryBox').index(this)
    checkBox(index)
    console.log(timer)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getBox(boxIndex){
    return memoryGame.getElementsByClassName('memoryBox')[boxIndex];
}

memoryGame = document.getElementsByClassName('memoryGame')[0];
currentLevel = 4;
currentBoxes = []
pressed = false;

//mode = 'timed'
mode = 'onpress'

function createNewLevel(){
    if (mode == 'onpress'){
        pressed = false;
    }
    currentBoxes = []
    for (let i=0; i < currentLevel; i++){
        let newInt;
        newInt = getRandomInt(60)
        while (currentBoxes.includes(newInt)){newInt = getRandomInt(60);}
        currentBoxes.push(newInt)
        let curBox = getBox(currentBoxes[i])
        curBox.innerHTML = i+1
        curBox.classList.add('activeBox')
        //console.log(curBox)
    }
    constBoxes = currentBoxes.slice()
    switch(mode){
        case 'timed':
            timer = setTimeout(() => {
            clearBoxes(false)
            }, 2000);
            break;
        case 'onpress':
            pressed = false;
    }

}

function checkBox(boxIndex){
    //pressed = false
    if (mode == 'onpress' && !pressed){
        console.log('clear')
        clearBoxes(false)
        pressed = true
    }

    if (!currentBoxes.includes(boxIndex)){
        return;
    }

    if (currentBoxes.shift() == boxIndex){
        //console.log('Correct!')
        clearBox(boxIndex)
        if (currentBoxes.length == 0){
            currentLevel += 1;
            clearBoxes()
            createNewLevel()
        }
        if (currentLevel == 10){resetGame()}
    } else{
        //console.log('incorrect!')
        resetGame()
    }
}

function clearBoxes(all=true){
    //console.log(constBoxes)
    constBoxes.forEach(boxIndex => {
        clearBox(boxIndex, all)
    });
}

function clearBox(boxIndex, all=true){
    let box  = getBox(boxIndex)
    box.innerHTML = '';
    if (all){
        box.classList.remove('activeBox')
    }
}

function resetGame(){
    endGame()
    currentLevel = 4;
    if (typeof variable !== 'undefined'){
        clearTimeout(timer)
    }
    if (mode == 'onpress'){
        pressed = false;
    }
    clearBoxes()
    setTimeout(() => {
    createNewLevel()
    }, 0);
}

function endGame(){
    result = currentLevel;
    console.log(`You got to level ${result}!`)
}

createNewLevel()