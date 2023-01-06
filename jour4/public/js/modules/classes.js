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