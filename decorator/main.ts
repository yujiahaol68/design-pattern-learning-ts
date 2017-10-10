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

  // TODO: pretty print
  // https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
  protected prettyDescription() {
    return this.burger.getDescription();
  }

  public cost() {
    return 'Total:  $ ' + this.burger.cost();
  }
}


let hamBurger = new HamBurger();
let turkeyBurger = new TurkeyBurger();
console.log('Before decorate:');
console.log(hamBurger.getDescription());
console.log('It costs ' + hamBurger.cost());
console.log('Add Bacon:');
hamBurger = new Bacon(hamBurger);
console.log(hamBurger.getDescription());
console.log('It costs ' + hamBurger.cost());

console.log('=====');

console.log('Before decorate:');
console.log(turkeyBurger.getDescription());
console.log('It costs ' + turkeyBurger.cost());
console.log('Add Onion Ring:');
turkeyBurger = new OnionRing(turkeyBurger);
console.log(turkeyBurger.getDescription());
console.log('It costs ' + turkeyBurger.cost());

