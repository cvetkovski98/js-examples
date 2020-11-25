function NPC(name, hitpoints, is_hero = false) {
    this.name = name ? name : `NPC ${NPC.NPCs++}`
    this.hitpoints = hitpoints
    this.is_hero = is_hero
    this.is_alive = true
}

NPC.NPCs = 0

NPC.prototype.status = function () {
    console.log(`<Status name=${this.name}, hp=${this.hitpoints}/>`);
}

function Hero(name, hitpoints = 100, damage = 10, has_critical = false) {
    NPC.call(this, name, hitpoints, true)
    this.damage = damage
    this.has_critical = has_critical
}

Hero.prototype = Object.create(NPC.prototype)
Hero.prototype.constructor = Hero

Hero.prototype.attack = function (victim) {
    let amplifier = this.has_critical ? 1.5 : 1.0
    let total_damage = amplifier * this.damage
    if (this.has_critical)
        console.log(`<CriticalAttack from=${this.name} to=${victim.name} damage=${total_damage}/>`);
    else
        console.log(`<Attack from=${this.name} to=${victim.name} damage=${total_damage}/>`);
    victim.hitpoints -= total_damage
    if (victim.hitpoints <= 0)
        victim.is_alive = false
    if (victim.is_hero && this.has_critical) {
        if (victim.is_alive) {
            victim.has_critical = true
        }
        this.has_critical = false
    }
    this.status()
}

const N = 35;
let players = [];
let heroes_left = [];
let victims_left = [];
let set_first_critical = true
let heroes = 0;

for (let i = 0; i < N; i++) {
    if (i % 5 === 0) {
        let hp = Math.floor(Math.random() * 100 + 1)
        let dmg = Math.floor(Math.random() * 35 + 1)
        players[i] = new Hero(`Hero ${heroes++}`, hp, dmg, set_first_critical)
        set_first_critical = false
        heroes_left.push(players[i])
        victims_left.push(players[i])
    } else {
        players[i] = new NPC()
        victims_left.push(players[i])
    }
}

console.log(`NPCs: ${NPC.NPCs}, HEROs: ${heroes_left.length}`)
heroes_left.filter(it => it.has_critical).forEach(it => it.status())

let round = 1
while (true) {
    console.log(`Round: ${round}`)
    if (heroes_left.length === 1) {
        let winner = heroes_left[0];
        console.log(`<Winner name=${winner.name} hp=${winner.hitpoints}/>`)
        break;
    }
    let attacker_id = Math.floor(Math.random() * heroes_left.length)
    let victim_id = Math.floor(Math.random() * victims_left.length)
    let attacker = heroes_left[attacker_id]
    let victim = victims_left[victim_id]
    while (attacker.name === victim.name) {
        victim_id = Math.floor(Math.random() * victims_left.length)
        victim = victims_left[victim_id]
    }
    attacker.attack(victim);
    if (!victim.is_alive) {
        victims_left = victims_left.filter(vic => vic.name !== victim.name)
        if (victim.is_hero) {
            heroes_left = heroes_left.filter(vic => vic.name !== victim.name)
        }
    }
    ++round;
}