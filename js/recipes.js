
//Breeding recipe syntax:

/*

name: {parent:{
    attribute: {
        attribute_name: [accepted_types],
        attribute_name: [accepted_types]
    }
},
parent:{}, child:{}}

Examples
advanced: {
    parent:{
        attribute: {
            monkey: ['*'],
            monkey_type: ['primitive]
        }
    },
    parent:{
        attribute: {
            monkey: ['*'],
            monkey_type: ['primitive]
        }
    }
},
    child: 'monkey_advanced'

orange: {
    parent:{
        attribute: {
            monkey: ['monkey_yellow'],
            monkey_type: ['primitive']
        }
    },
    parent:{
        attribute: {
            monkey: ['monkey_yellow'],
            monkey_type: ['primitive']
        }
    }
},
    child: 'monkey_orange'
}


*/

recipeBook = {
    infusions:{

    },
    breeding: [
        green= {
            parent1:{
                monkeyID:['monkey_blue'],
                monkey_type: ['primitive']
            },
            parent2:{
                monkeyID: ['monkey_yellow'],
                monkey_type: ['primitive']
            },
            child: 'monkey_green'
        },
        purple= {
            parent1:{
                monkeyID:['monkey_blue'],
                monkey_type: ['primitive']
            },
            parent2:{
                monkeyID: ['monkey_red'],
                monkey_type: ['primitive']
            },
            child: 'monkey_purple'
        },
        orange= {
            parent1:{
                monkeyID: ['monkey_yellow'],
                monkey_type: ['primitive']
            },
            parent2:{
                monkeyID: ['monkey_red'],
                monkey_type: ['primitive']
            },
            child: 'monkey_orange'
        },
        bb= {
            parent1:{
                monkeyID: ['monkey_blue'],
                monkey_type: ['primitive']
            },
            parent2:{
                monkeyID: ['monkey_blue'],
                monkey_type: ['primitive']
            },
            child: 'monkey_blue'
        }
    ]
}

//sorts all monkeys by sprite ID
function sortMonkeys(){
    let sortable = [];
    for ([monkey, values] of Object.entries(monkeysInfo)){
        sortable.push([monkey, values]);
    }
    sortable.sort(function(a, b) {
        return a[1].spriteID - b[1].spriteID;
    });
    let newsort = {};
    sortable.forEach(monkey => {
        newsort[monkey[0]] = getMonkeyByID(monkey[1].monkeyID)
    });
    return newsort
}

function getSortedJSON(){
    return JSON.stringify(sortMonkeys())
}



recipe= {
    parent1:{
        monkeyID: ['monkey_blue'],
        monkey_type: ['primitive']
    },
    parent2:{
        monkeyID: ['monkey_blue'],
        monkey_type: ['primitive']
    },
}

function checkRecipe(recipe){
    let check = recipeBook.breeding.find(function(curRecipe){

        let p1_in;
        let p2_in;

        if (recipe.parent1.monkeyID[0] == recipe.parent2.monkeyID[0]){
        //checks if parents are same, and if that is a valid recipe
            p1_in = (curRecipe.parent1.monkeyID.includes(recipe.parent1.monkeyID[0]))
            p2_in = (curRecipe.parent2.monkeyID.includes(recipe.parent2.monkeyID[0]))
        } else {
        //checks if both parents are included
            p1_in = (curRecipe.parent1.monkeyID.includes(recipe.parent1.monkeyID[0]) || curRecipe.parent2.monkeyID.includes(recipe.parent1.monkeyID[0]))
            p2_in = (curRecipe.parent1.monkeyID.includes(recipe.parent2.monkeyID[0]) || curRecipe.parent2.monkeyID.includes(recipe.parent2.monkeyID[0]))
        }

        
        //debug(p1_in, p2_in)
        
        if (p1_in && p2_in){
            return true;
            }
        }
    )
    if (!check){check = 'None'; return check;}
    else { return check.child}
}

function getMonkeyByID(id){
    return Object.values(monkeysInfo).find((monkey) => monkey.monkeyID==id) || monkeysInfo['basic']
}

function getMonkeysBySeries(series){
    return Object.values(monkeysInfo).filter((monkey) => monkey.series==series)
}

function createMonkeyRecipe(monkey1_id, monkey2_id){
    let monkey1=getMonkeyByID(monkey1_id);
    let monkey2=getMonkeyByID(monkey2_id);
    recipe= {
        parent1:{
            monkeyID: [monkey1.monkeyID],
            monkey_type: ['primitive']
        },
        parent2:{
            monkeyID: [monkey2.monkeyID],
            monkey_type: ['primitive']
        },
    }
    return recipe; 
}

breeders = [];
function breeder(){
    this.id = breeders.length;
    this.slots = [this.id*2]
    this.slots.push(this.slots[0]+1)
    this.slot1 = 'empty';
    this.slot2 = 'empty';
    this.output;
    breeders.push(this)

    this.addToBreeder = function(slotNum, ui){
        let monkey = getMonkeyByID(ui.draggable[0].getAttribute('monkeyID'));
        ui.draggable[0].setAttribute('breederSlot', slotNum)
        test = ui.draggable[0]
        this['slot'+ (slotNum%2+1)] = monkey;
        this.createMonkeyRecipe()
        debug(`ADDED: ${monkey.monkeyID} TO BREEDER ${breeders.indexOf(this)}`)
    }
    this.removeFromBreeder = function(slotNum){
        debug(`REMOVED:  ${this['slot'+ (slotNum+1)].monkeyID} FROM BREEDER ${breeders.indexOf(this)}`)
        this['slot'+ (slotNum+1)] = 'empty';
    }

    this.createMonkeyRecipe = function(){
        if (this.slot1 == 'empty' || this.slot2 == 'empty'){
            //debug('No monkeys!');
            this.recipe= {
                parent1:{
                    monkeyID: [],
                    monkey_type: []
                },
                parent2:{
                    monkeyID: [],
                    monkey_type: []
                },
            }
            return;
        }
        this.recipe= {
            parent1:{
                monkeyID: [this.slot1.monkeyID],
                monkey_type: ['primitive']
            },
            parent2:{
                monkeyID: [this.slot2.monkeyID],
                monkey_type: ['primitive']
            },
        }
        debug(checkRecipe(this.recipe))
        return recipe; 
    }
}


function getBreederBySlot(slotNum){
    let curBreeder = breeders.find(function(breed){
        if (breed.slots.includes(slotNum)) {
            return true;
        }
    })
    return curBreeder;
}


new breeder()
new breeder()
new breeder()
new breeder()