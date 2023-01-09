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