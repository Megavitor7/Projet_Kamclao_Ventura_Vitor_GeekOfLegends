class Personnage {
    constructor(name, health, attack,posture) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.posture = posture;
    } 
    
    applyPostureEffect() {
        // Check the value of the posture property and apply the corresponding effects
        switch (this.posture) {
            case "Defense":
                this.attack *= 0.5;
                this.health *= 2.5;
                break;
            case "Attack":
                this.attack *= 1.4;
                this.health *= 0.75;
                break;
            default:
                // If the posture is not recognized, do nothing
                break;
        }
    }
}

class Hero extends Personnage {
    constructor(name, health, attack,posture) {
        super(name, health, attack,posture);
    }

    attack(target) {
        target.health -= this.attack;
    }
}

class Boss extends Personnage {
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
        return enigme;
    }
}

class Archer extends Hero {
    constructor(name, health, attack,posture,) {
        super(name, health, attack,posture);
        this.fleches = Math.floor(Math.random() * 5) + 7;
    }

    archerAttack(target) {
        if (this.fleches >= 2) {
            // consume 2 arrows and attack
            this.fleches -= 2;
            // perform attack
            target.health -= this.attack;
        } else {
            console.log(`${this.name} n'a pas assez de flèches et doit recharger`);
            this.fleches += 6;
        }
    }

    replenishArrows() {
        this.fleches += 1;
    }
}

class Guerrier extends Hero {
    constructor(name, health, attack,posture) {
        super(name, health, attack,posture);
        this.rage = 0;
    }

    attack(target) {
        // Code of the attack method in the Hero class
        target.health -= this.attack;
    }
}

class Mage extends Hero {
    constructor(name, health, attack,posture,mana) {
        super(name, health, attack,posture);
        this.mana = Math.floor(Math.random() * 2) + 7;
    }

    attack(target) {
        if (this.mana >= 2) {
            this.mana -= 2;
            target.health -= this.attack;
        } else {
            console.log(`${this.name} n'a pas assez de mana , il prend un tour de repos et récupère son mana`);
            this.mana += 7;
        }
    }
}

class Game extends Personnage {
    constructor(name, health, attack,posture) {
        super(name,health,attack,posture)
        console.log('Enter the stats for your warrior:');
         name = prompt(`Enter your warrior's name:`);
         health = parseInt(prompt(`Enter your warrior's health:`));
         attack = parseInt(prompt(`Enter your warrior's attack:`));
         posture = prompt(`Enter your mage's posture (Defense or Attack):`);
        this.warrior = new Guerrier(name, health, attack,posture);

        console.log('Enter the stats for your archer:');
        name = prompt(`Enter your archer's name:`);
        health = parseInt(prompt(`Enter your archer's health:`));
        attack = parseInt(prompt(`Enter your archer's attack:`));
        posture = prompt(`Enter your mage's posture (Defense or Attack):`);
        fleches = Math.floor(Math.random() * 5) + 7;
        this.archer = new Archer(name, health, attack,posture,fleches);

        console.log('Enter the stats for your mage:');
        name = prompt(`Enter your mage's name:`);
        health = parseInt(prompt(`Enter your mage's health:`));
        attack = parseInt(prompt(`Enter your mage's attack:`));
        posture = prompt(`Enter your mage's posture (Defense or Attack):`);
        this.mage = new Mage(name, health, attack,posture);



        this.possibleBosses = [
            new Boss("Father ", 500, 20),
            new Boss("Venom", 150, 25),
            new Boss("Dio", 200, 30)
        ];
        // Select a random boss from the array
        this.boss = this.possibleBosses[Math.floor(Math.random() * this.possibleBosses.length)];
    }

    round() {
        console.log(`${this.boss.name} a ${this.boss.health} points de vie`);
        console.log(`${this.warrior.name} a ${this.warrior.health} points de vie`);
        console.log(`${this.archer.name} a ${this.archer.health} points de vie`);
        console.log(`${this.mage.name} a ${this.mage.health} points de vie`);
        console.log('');

        // Boucle tant que le boss et au moins un des trois personnages sont en vie
        while (this.boss.health > 0 && (this.warrior.health > 0 || this.archer.health > 0 || this.mage.health > 0)) {
            // Si le guerrier est en vie, il attaque le boss
            if (this.warrior.health > 0) {
                console.log(`${this.warrior.name} attaque`);
                this.boss.health -= this.warrior.attack;
                console.log(`${this.boss.name} a ${this.boss.health} points de vie`);
                console.log(`${this.warrior.name} a ${this.warrior.health} points de vie`);
                console.log('');
            }

            // Si le boss est toujours en vie et que l'archer est en vie, l'archer attaque le boss
            if (this.boss.health > 0 && this.archer.health > 0 || this.archer.fleches > 0) {
                console.log(`${this.archer.name} attaque`);
                this.boss.health -= this.archer.attack;
                this.archer.fleches -= 1
                console.log(`${this.boss.name} a ${this.boss.health} points de vie`);
                console.log(`${this.archer.name} a ${this.archer.health} points de vie`);
                console.log('');
            }
            else 
            console.log(`${this.archer.name} doit recharger `);
            this.archer.fleches = +6


            // Si le boss est toujours en vie et que le mage est en vie, le mage attaque le boss
            if (this.boss.health > 0 && this.mage.health > 0) {
                console.log(`${this.mage.name} attaque`);
                this.boss.health -= this.mage.attack;
                console.log(`${this.boss.name} a ${this.boss.health} points de vie`);
                console.log(`${this.mage.name} a ${this.mage.health} points de vie`);
                console.log('');
            }
            if (this.boss.health > 0) {
                console.log(`${this.boss.name} attaque`);

                // Choose a random hero to attack
                const heroes = [this.warrior, this.archer, this.mage];
                const hero = heroes[Math.floor(Math.random() * heroes.length)];

                hero.health -= this.boss.attack;
                console.log(`${hero.name} a ${hero.health} points de vie`);
                console.log('');
            }
            if (this.boss.health <= this.boss.maxHealth * 0.2 || this.boss.health <= 0) {
                console.log("Un défi final vous attend !");

                // Choose a random riddle from an array of riddles
                const riddles = [{
                        question: "Combien font 1+1?",
                        answer: "2"
                    },
                    {
                        question: "Quel est le fruit de l'arbre de la connaissance?",
                        answer: "La pomme"
                    },
                    {
                        question: "Qu'est-ce qui est rouge et qui attend?",
                        answer: "Un coq qui attend l'heure"
                    }
                ];
                const riddle = riddles[Math.floor(Math.random() * riddles.length)];

                // Ask the riddle to the user
                console.log(riddle.question);

                // Get the user's answer
                const answer = prompt("Votre réponse :");

                // If the user's answer is correct, they win the game
                if (answer === riddle.answer) {
                    alert("Bravo ! Vous avez gagné !");
                    break;
                } else {
                    console.log("Désolé, ce n'est pas la bonne réponse. Réessayez !");
                }
            }
            if (this.warrior.health <= 0 && this.archer.health <= 0 && this.mage.health <= 0) {
                alert(`noob tu as perdu avec tes persos de noobz`)
            }

        }
    }
}

let game = new Game();
game.round();



