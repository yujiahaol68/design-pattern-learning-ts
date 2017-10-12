interface Material {
  name:string;
}

interface Shoelace {
  color:string;
  material:Material;
}

interface Sole {
  color:string;
  material:Material;
}

interface Pattern {
  color:string;
}

interface Brand {
  name:string;
  logoUrl:string;
}

interface ShoesInfo {
  type:string;
  size:number;
  color:string;
}

interface ShoeMaterialFactory {
  createShoelace();
  createSole();
  createShoeShell();
}

abstract class Shoes {
  public name:string;
  public brand:Brand;
  public shoelace:Shoelace;
  public sole:Sole;
  public pattern:Pattern;
  public shoeShell:Material;
  public size:number;

  public abstract prepare();

  public setName(name:string) {
    this.name = name;
  }

  public setBrand(brandName:string, logoUrl:string) {
    this.brand = {
      name: brandName,
      logoUrl: logoUrl
    }
  }

  public setSize(size:number) {
    this.size = size;
  }

  public setColor(color:string) {
    this.pattern = { color };
  }

  public getDescription() {
    return `A size ${this.size} ${this.brand.name} ${this.shoeShell.name} ${this.name} shoes that is ${this.pattern.color}`;
  }

  public printColor() {
    console.log('Turn shoelace into ' + this.shoelace.color);
    console.log('Turn sole into ' + this.sole.color);
    console.log('Turn main material ' + this.shoeShell.name + ' into ' + this.pattern.color);
  }

  public agglutinate() {
    console.log('Agglutinate all the material');
  }

  public pasteLogo() {
    console.log('Paste ' + this.brand.name + ' LOGO');
  }

  public box() {
    console.log('Box this pretty shoes');
  }

}

class NikeMaterialFactory implements ShoeMaterialFactory {
  public createShoelace() : Shoelace {
    return {
      color: 'White',
      material: {
        name: 'NikeSuperCotton'
      }
    }
  }

  public createShoeShell() : Material {
    return {
      name: 'superLeather'
    }
  }

  public createSole() : Sole {
    return {
      color: 'White',
      material: {
        name: 'NikeSpaceRubber'
      }
    }
  }
}

class NikeFreeRunningShoe extends Shoes {
  protected factory:ShoeMaterialFactory;

  constructor(factory:ShoeMaterialFactory, info:ShoesInfo) {
    super();
    this.factory = factory;
    this.setBrand('Nike', 'nike.png');
    this.setName('FreeRun');
    this.setSize(info.size);
    this.setColor(info.color);
    this.prepare();
  }

  public prepare() {
    this.shoelace = this.factory.createShoelace();
    this.shoeShell = this.factory.createShoeShell();
    this.sole = this.factory.createSole();
  }

}

interface ShoeFactory {
  makeShoes(info:ShoesInfo) : Shoes;
}

class NikeShoeFactory implements ShoeFactory {
  public makeShoes(info:ShoesInfo) {
    const name = info.type;
    switch(name) {
      case 'FreeRun':
        const newFreeRunShoes = new NikeFreeRunningShoe(new NikeMaterialFactory(), info);
        newFreeRunShoes.printColor();
        newFreeRunShoes.agglutinate();
        newFreeRunShoes.box();
        return newFreeRunShoes;
      // case 'Air Force':
      // return ...
      // case 'Zoom Fly':
      // return ...
    }
  }
}

interface ShoesStore {
  reserveShoes(info:ShoesInfo);
}

class NikeRetailStore implements ShoesStore {
  private factory:ShoeFactory;
  private shoesOrder:ShoesInfo[] = [];

  constructor(factory:ShoeFactory) {
    this.factory = factory;
  }

  reserveShoes(info:ShoesInfo) {
    this.shoesOrder.push(info);
  }

  produceShoes() : Shoes[] {
    console.log('We got ' + this.shoesOrder.length + ' Orders');
    const products:Shoes[] = [];

    this.shoesOrder.forEach(shoes => {
      products.push(this.factory.makeShoes(shoes));
    });

    return products;
  }
}

const NYNikeStore = new NikeRetailStore(new NikeShoeFactory());

NYNikeStore.reserveShoes({
  type: 'FreeRun',
  color: 'blue',
  size: 40
});

NYNikeStore.reserveShoes({
  type: 'FreeRun',
  color: 'Red',
  size: 38
});

const orderedShoes = NYNikeStore.produceShoes();

console.log('========');
console.log('Here are your shoes: ');

orderedShoes.forEach(shoes => {
  console.log(shoes.getDescription());
});