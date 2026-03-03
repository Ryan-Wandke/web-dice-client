let attack = 1
let defense = 1

function start(){
    makeAttacker()
    makeDefender()
    displayDice()
}

start()

function makeAttacker(){
    document.getElementById("selectorA").innerHTML = `<p>Attacker</p>
        <select name="Attacker" id="Attacker" onchange="setAttackDice(this.value)">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>`
}

function makeDefender(){
    document.getElementById("selectorD").innerHTML = `<p>Defender</p>
        <select name="Defender" id="Defender" onchange="setDefenseDice(this.value)">
        <option value="1">1</option>
        <option value="2">2</option>
        </select>`
}

function setDefenseDice(number){
    defense = number
}

function setAttackDice(number){
    attack = number
}

async function displayDice(){
    document.getElementById("dice").readOnly = true;
    const attackerDice = await stringBuild(attack);
    const defenderDice = await stringBuild(defense);
    document.getElementById("dice").innerHTML = `
    <p>Attackers Dice</p>${attackerDice}<p>Defenders Dice</p>${defenderDice}`
}

async function stringBuild(number){
    let x = number
    let y = ""
    while(x > 0){
        const diceNumber = await testAPI();
        y += `<img src="dice${diceNumber}.jpg">`
        x--
    }
    return y
}

async function testAPI() {
    try {
        const res = await fetch('/api/random');
        const data = await res.json();
        // this seems janky but  12 is the index of the first random number 1-6.
        return JSON.stringify(data,null,0).charAt(12);
    } catch (error) {
        console.log("error fetching from API");
        return 1; // Default fallback
    }
}