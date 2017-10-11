abstract class Burger {
  protected description = 'Unknown Burger';

  public getDescription() {
    return this.description;
  }

  public abstract cost();
}

abstract class CondimentDecorator extends Burger {
  public abstract getDescription();
}

class HamBurger extends Burger {
  constructor() {
    super();
    this.description = 'HamBurger';
  }

  public cost() {
    return 6.75
  }
}

class TurkeyBurger extends Burger {
  constructor() {
    super();
    this.description = 'Turkey Burger'
  }

  public cost() {
    return 6.99
  }
}

class Bacon extends CondimentDecorator {
  protected burger:Burger;

  constructor(burger:Burger) {
    super();
    this.burger = burger;
  }

  public getDescription() {
    return 'Bacon, ' + this.burger.getDescription();
  }

  public cost() {
    return 1.79 + this.burger.cost();
  }
}

class OnionRing extends CondimentDecorator {
  protected burger:Burger;

  constructor(burger:Burger) {
    super();
    this.burger = burger;
  }

  public getDescription() {
    return 'Onion Ring, ' + this.burger.getDescription();
  }

  public cost() {
    return 2.99 + this.burger.cost();
  }
}

class Checker extends CondimentDecorator {
  protected burger:Burger;
  protected ingredients:string[];

  constructor(burger:Burger) {
    super();
    this.burger = burger;
    this.ingredients = burger.getDescription().split(',').map(ingredient => ingredient.trim());
  }

  public getDescription() {
    return this.prettyDescription();
  }

  protected prettyDescription() {
    let count = 0;
    let prettyFormat = [];
    const unique = Array.from(new Set(this.ingredients));
    unique.forEach(item => {
      this.ingredients.forEach(ingredient => {
        if (item === ingredient) count++;
      })
      switch (count) {
        case 1: prettyFormat.push(item);
          break;
        case 2: prettyFormat.push('Double ' + item);
          break;
        case 3: prettyFormat.push('Triple ' + item);
          break;
      }
      if (count > 3) prettyFormat.push(`${count} ${item}`);
      count = 0;
    });
    return prettyFormat.join(', ');
  }

  public cost() {
    return 'Total:  $ ' + this.burger.cost().toFixed(2);
  }
}


let hamBurger = new HamBurger();
console.log('Before decorate:');
console.log(hamBurger.getDescription());
console.log('It costs ' + hamBurger.cost());
console.log('Add 2 Bacons:');
hamBurger = new Bacon(hamBurger);
hamBurger = new Bacon(hamBurger);
console.log(hamBurger.getDescription());
console.log('It costs ' + hamBurger.cost());
const checkOut = new Checker(hamBurger);
console.log(checkOut.getDescription());
console.log(checkOut.cost());

console.log('=====');

let turkeyBurger = new TurkeyBurger();
console.log('Before decorate:');
console.log(turkeyBurger.getDescription());
console.log('It costs ' + turkeyBurger.cost());
console.log('Add Onion Ring:');
turkeyBurger = new OnionRing(turkeyBurger);
turkeyBurger = new OnionRing(turkeyBurger);
turkeyBurger = new OnionRing(turkeyBurger);
console.log(turkeyBurger.getDescription());
console.log('It costs ' + turkeyBurger.cost());

const check2Out = new Checker(turkeyBurger);
console.log(check2Out.getDescription());
console.log(check2Out.cost());
