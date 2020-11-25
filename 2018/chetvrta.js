function Character(name) {
    this.name = name;
    this.hitpoints = 100;
    this.is_alive = true;
}

Character.prototype.attack = function (victim) {
    let miss = Math.random() <= 0.3;
    if (!miss) {
        victim.hitpoints -= 5;
        victim.is_alive = victim.hitpoints > 0;
        console.log(`<Attack from=${this.name} to=${victim.name}/>`)
    } else {
        console.log(`<AttackMissed from=${this.name} to=${victim.name}/>`)
    }
}

Character.prototype.status = function () {
    return `<Character name=${this.name} hitpoints=${this.hitpoints}/>`;
}

let N = 35
let players = []
for (let i = 0; i < N; i++) {
    players[i] = new Character(`Player ${i}`)
}

let round = 0;
while (true) {
    console.log(`Round: ${round++}`)

    for (let i = players.length - 1; i >= 0; i--) {
        let attacker = players[i];
        let victim_id = Math.floor(Math.random() * players.length);
        while (i === victim_id)
            victim_id = Math.floor(Math.random() * players.length);
        let victim = players[victim_id]
        attacker.attack(victim)

        if (!victim.is_alive) {
            players = players.filter(pl => pl.is_alive)
            if (players.length === 1)
                break
        }
    }

    if (players.length === 1) {
        let winner = players[0];
        console.log('Winner: ' + winner.status());
        break;
    } else {
        console.log("========= PLAYERS =========")
        players.forEach(pl => console.log(pl.status()))
    }
}