class Character {
    
    _life = 1;
    maxLife = 1;
    atack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.maxLife = this.life;
        this.atack = 10;
        this.defense = 8;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.atack = 15;
        this.defense = 3;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('LittleMonster');
        this.life = 40;
        this.maxLife = this.life;
        this.atack = 4;
        this.defense = 4;
    }
}

class BigMonster extends Character {
    constructor() {
        super('BigMonster');
        this.life = 120;
        this.maxLife = this.life;
        this.atack = 16;
        this.defense = 5;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.atackButton').addEventListener('click', () => this.doAtack(this.fighter1, this.fighter2))
        this.fighter2El.querySelector('.atackButton').addEventListener('click', () => this.doAtack(this.fighter2, this.fighter1))
    }

    update() {
        //figther1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        //figther2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAtack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMgs("Atacando cachorro morto.");
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.atack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;
        
        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMgs(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}!`);
        } else {
            this.log.addMgs(`${attacked.name} defendeu!`);
        }

        this.update();
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMgs(msg) {
        this.list.push(msg)
        this.render()
    }

    render(){
        this.listEl.innerHTML = '';

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}