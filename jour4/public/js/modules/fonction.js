export function puzzle() {
    let riddles = [
        "Je suis d'eau, je suis d'air, et je suis d'électricité. Qui suis-je ?",
        "Une fois que l'on me prononce, je n'existe plus. Qui suis-je ?",
        "Qui suis-je ? Un animal qui marche sur 4 pattes le matin, sur 2 pattes l'après-midi, et sur 3 pattes le soir."
    ];
    let answer = ["l'éclair", "le silence", "l'homme"];
    let riddle = riddles[Math.floor(Math.random() * riddles.length)];
    let tries = 0;
    while (tries < 3) {
        let userAnswer = prompt(riddle);
        if (userAnswer === answer[riddles.indexOf(riddle)]) {
            console.log("Bravo, vous avez trouvé la bonne réponse !");
            break;
        } else {
            console.log("Désolé, ce n'est pas la bonne réponse.");
            tries++;
        }
    }
    if (tries === 3) {
        console.log("Vous avez échoué à trouver la bonne réponse. Game over.");
    }
}


// method to play the game
export function play() {
    // select the characters
    this.selectCharacters()
    // game loop
    while (this.currentHero.health > 0 && this.currentBoss.health > 0) {
        // hero's turn
        console.log(`${this.currentHero.name}'s turn.`);
        console.log(`${this.currentHero.name} has ${this.currentHero.health} health points and ${this.currentHero.attack} attack points.`);
        console.log('Enter 1 to attack or 2 to defend:');
        let heroAction = parseInt(prompt('Enter your choice:'));
        if (heroAction === 1) {
            this.currentHero.attack(this.currentBoss);
        } else if (heroAction === 2) {
            this.currentHero.defense();
        }
        console.log(`${this.currentBoss.name} has ${this.currentBoss.health} health points remaining.`);

        // check if boss is defeated
        if (this.currentBoss.health <= 0) {
            console.log(`${this.currentHero.name} has defeated ${this.currentBoss.name}!`);
            break;
        }

        // check if enigma challenge is triggered
        if (this.currentBoss.health <= this.currentBoss.maxHealth * 0.2) {
            console.log('Enigma challenge triggered!');
            if (!this.enigmaChallenge()) {
                console.log(`${this.currentHero.name} has been defeated.`);
                break;
            }
        }

        // boss's turn
        console.log(`${this.currentBoss.name}'s turn.`);
        console.log(`${this.currentBoss.name} has ${this.currentBoss.health} health points and ${this.currentBoss.attack} attack points.`);
        this.currentBoss.attackRandomHero(this.heroes);

        // check if hero is defeated
        if (this.currentHero.health <= 0) {
            console.log(`${this.currentHero.name} has been defeated.`);
            break;
        }
    }
}