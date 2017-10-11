// e.g Simple Factory

interface Pizza {
  prepare();
  bake();
  cut();
  box();
  getDescription();
}

class CheesePizza implements Pizza {
  public prepare() {
    console.log('Prepare pizza');
  }

  public bake() {
    console.log('Bake pizza');
  }

  public cut() {
    console.log('Cut pizza');
  }

  public box() {
    console.log('Box pizza');
  }

  public getDescription() {
    return 'Here is a cheese Pizza!';
  }
}

class VeggiePizza implements Pizza {
  public prepare() {
    console.log('Prepare pizza');
  }

  public bake() {
    console.log('Bake pizza');
  }

  public cut() {
    console.log('Cut pizza');
  }

  public box() {
    console.log('Box pizza');
  }

  public getDescription() {
    return 'Here is a veggie Pizza!';
  }
}

class SimplePizzaFactory {
  public createPizza(type:string) {
    switch(type) {
      case 'cheese':
        return new CheesePizza();
      case 'veggie':
        return new VeggiePizza();
    }
  }
}

class PizzaStore {
  private factory:SimplePizzaFactory;

  constructor(factory:SimplePizzaFactory) {
    this.factory = factory;
  }

  public orderPizza(type:string) {
    const pizza = this.factory.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

const pizzaStore = new PizzaStore(new SimplePizzaFactory());

const pizzaOrdered1 = pizzaStore.orderPizza('cheese');
console.log(pizzaOrdered1.getDescription());

console.log('========');

const pizzaOrdered2 = pizzaStore.orderPizza('veggie');
console.log(pizzaOrdered2.getDescription());
