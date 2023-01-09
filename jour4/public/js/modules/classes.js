export class Personnage {
    constructor(name, health, attack) {
        this.name = name;
        this.health = health;
        this.attack = attack;

    }
}

export class Boss extends Personnage {
    constructor(name, health, attack) {
        super(name, health, attack);
    }
    enigme() {
        // Sélectionne aléatoirement une énigme parmi celles disponibles
        const enigmes = [
            "Une fois que l'on me prononce, je n'existe plus. Qui suis-je ?",
            "Je suis d'eau,je suis d'air,et je suis d'électricité. Qui suis-je ?",
            "Quel heure est-il ?(écriture informatisée)",
            "Quel est l'indice du premier 'i' de cette question ?",
            "Que fait retourne Math.floor(1.3 * 10) ?"
        ];
        const enigme = enigmes[Math.floor(Math.random() * enigmes.length)];

        // Demande à l'utilisateur de résoudre l'énigme


    }
}
export class Archer extends Personnage {
    constructor(name, health, attack, flèches) {
        super(name, health, attack);
        let tab = [7, 8, 9, 10, 11];
        let random = Math.floor(Math.random() * 4);
        this.fleches = tab[random];
    }
    attack() {
        if (this.fleches >= 2) {
            // consume 2 arrows and attack
            this.fleches -= 2;
            // perform attack
            // ...
        } else {
            prompt(`${this.name} n'a pas assez de flèches et doit recharger`)
            this.fleches += 6;
        }
    }

    replenishArrows() {
        this.fleches += 1;
    }
}
export class Guerrier extends Personnage {
    constructor(name, health, attack, rage) {
        super(name, health, attack);
        this.rage = 0
    }
}
export class Mage extends Personnage {
    constructor(name, health, attack, mana) {
        super(name, health, attack);
        let tab = [7, 9, 11];
        let random = Math.floor(Math.random() * 2);
        this.mana = tab[random]
    }
    attack(target) {
        if (this.mana >= 2) {
            this.mana -= 2;
            target.health -= this.attack;
        } else {
            prompt(`${this.name} n'a pas assez de mana , il prend un tour de repos et récupère son mana`);
            this.mana += 7;
        }
    }
}
export class Game {
    constructor() {
        // prompt the user to enter the heroes' stats
        console.log('Enter the stats for your hero:');
        let name = prompt(`Enter your hero's name:`);
        let health = parseInt(prompt(`Enter your hero's health:`));
        let attack = parseInt(prompt(`Enter your hero's attack:`));
        this.currentHero = new Hero(name, health, attack);
        console.log(`${this.currentHero.name} has been selected as your hero.`);

        console.log('Select a boss:');
        this.bosses = [
            new Boss('Venom', 150, 30, [
                new Enigma('I am water, I am air, I am electricity. Who am I?', 'lightning'),
                new Enigma('Once I am pronounced, I no longer exist. Who am I?', 'silence'),
                new Enigma('What is the output of Math.floor(1.3 * 10)?', '13')
            ]),
            new Boss('Father', 200, 25, [
                new Enigma('What is the current time?', new Date().toTimeString()),
                new Enigma('What is the index of the first "i" in this question?', '8'),
                new Enigma('What is the output of Math.floor(Math.random() * 10)?', 'random number between 0 and 9')
            ]),
            new Boss('Dio', 250, 20, [
                new Enigma('What is the capital of France?', 'Paris'),
                new Enigma('What is the square root of 256?', '16'),
                new Enigma('What is the output of "Hello World!".split(" ")[1][2]?', 'l')
            ])
        ];
        for (let i = 0; i < this.bosses.length; i++) {
            console.log(`${i + 1}: ${this.bosses[i].name}`);
        }
        let bossSelection = parseInt(prompt('Enter the number of your selection:'));
        this.currentBoss = this.bosses[bossSelection - 1];
        console.log(`${this.currentBoss.name} has been selected as your boss.`);
    }
    enigmaChallenge() {
        console.log('You have encountered an enigma challenge!');
        let enigma = this.currentBoss.enigmas[Math.floor(Math.random() * this.currentBoss.enigmas.length)];
        for (let i = 0; i < 3; i++) {
            let answer = prompt(enigma.question);
            if (answer === enigma.answer) {
                console.log('Correct answer! You have defeated the boss!');
                this.currentBoss = null;
                return true;
            } else {
                console.log('Incorrect answer. Try again.');
            }
        }
        console.log('You have failed the enigma challenge.');
        return false;
    }
    // method to select the hero and boss
    selectCharacters() {
        console.log('Enter the stats for your hero:');
        let name = prompt(`Enter your hero's name:`);
        let health = parseInt(prompt(`Enter your hero's health:`));
        let attack = parseInt(prompt(`Enter your hero's attack:`));
        this.currentHero = new Hero(name, health, attack);
        console.log(`${this.currentHero.name} has been selected as your hero.`);
    
        console.log('Select a boss:');
        for (let i = 0; i < this.bosses.length; i++) {
            console.log(`${i + 1}: ${this.bosses[i].name}`);
        }
        let bossSelection = parseInt(prompt('Enter the number of your selection:'));
        this.currentBoss = this.bosses[bossSelection - 1];
        console.log(`${this.currentBoss.name} has been selected as your boss.`);
    }
    
    // method to play the game
    play() {
        // game loop
        while (this.currentHero.health > 0 && this.currentBoss.health > 0) {
            // hero's turn
            console.log(`${this.currentHero.name}'s turn.`);
            console.log(`${this.currentHero.name} has ${this.currentHero.health} health points and ${this.currentHero.attack} attack points.`);
            console.log('Enter 1 to attack, 2 to defend, or 3 to choose a stand:');
            let heroAction = parseInt(prompt('Enter your choice:'));
            if (heroAction === 1) {
                this.currentHero.attack(this.currentBoss);
            } else if (heroAction === 2) {
                this.currentHero.defense();
            }
        }
    }
    
    // method to handle the hero's turn
    heroTurn() {
        console.log(`${this.currentHero.name}'s turn.`);
        console.log(`${this.currentHero.name} has ${this.currentHero.health} health points and ${this.currentBoss.name} has ${this.currentBoss.health} health points.`);
        console.log('Select an action:');
        console.log('1: Attack');
        console.log('2: Defense');
        let action = parseInt(prompt('Enter the number of your selection:'));
        if (action === 1) {
            this.heroAttack();
        } else if (action === 2) {
            this.heroDefense();
        } else {
            console.log('Invalid action.');
            this.heroTurn();
        }
    }

    // method to handle the boss's turn
    bossTurn() {
        console.log(`${this.currentBoss.name}'s turn.`);
        console.log(`${this.currentHero.name} has ${this.currentHero.health} health points and ${this.currentBoss.name} has ${this.currentBoss.health} health points.`);
        this.bossAttack();
    }

    // method to handle the hero's attack action
    heroAttack() {
        this.currentHero.attack(this.currentBoss);
        if (this.currentBoss.health <= 0) {
            console.log(`${this.currentBoss.name} has been defeated! ${this.currentHero.name} wins!`);
            this.currentBoss = null;
        }
    }

    // method to handle the hero's defense action
    heroDefense() {
        this.currentHero.defense();
    }

    // method to handle the boss's attack action
    bossAttack() {
        this.currentBoss.attackRandomHero(this.heroes);
        if (this.currentHero.health <= 0) {
            console.log(`${this.currentHero.name} has been defeated! ${this.currentBoss.name} wins!`);
            this.currentHero = null;
        }
    }

    // method to check if the hero or boss has been defeated
    checkDefeat() {
        return this.currentHero === null || this.currentBoss === null;
    }

    // method to run the game
    run() {
        this.selectCharacters();
        while (this.currentHero.health > 0 && this.currentBoss.health > 0) {
            // check if the boss's health is below 20% and trigger the enigma challenge if it is
            if (this.currentBoss.health / this.currentBoss.maxHealth < 0.2) {
                if (!this.enigmaChallenge()) {
                    // if the user fails the enigma challenge, the game ends and the hero is defeated
                    console.log(`${this.currentHero.name} has been defeated! ${this.currentBoss.name} wins!`);
                    return;
                }
            }
            // if the boss's health is above 20% or the enigma challenge has been passed, the hero's turn begins
            this.heroTurn();
            // if the hero or
          
            if (this.checkDefeat()) {
                return;
            }
            // if the hero's turn ends and the boss is still alive, the boss's turn begins
            this.bossTurn();
            // if the hero or boss has been defeated, end the game
            if (this.checkDefeat()) {
                return;
            }
        }
    }
}


class Enigma {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

let venom = new Boss(`Venom`,1000,15)
let father = new Boss(`Father`,1000,25)
let dio = new Boss(`Dio`,3000,30)

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
let game = new Game();
game.play();