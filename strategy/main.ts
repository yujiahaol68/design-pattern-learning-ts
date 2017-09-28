
interface WeaponBehavior {
  useWeapon() : void;
}

interface LanguageBehavior {
  sayFightWords() : void;
}

abstract class Character {
  protected weapon:WeaponBehavior;
  protected language:LanguageBehavior;

  public fight() {
    this.weapon.useWeapon();
  }

  public speak() {
    this.language.sayFightWords();
  }

  public abstract showUp();

  public setWeapon(w:WeaponBehavior) {
    this.weapon = w;
  }

  public setLanguage(l:LanguageBehavior) {
    this.language = l;
  }
}

class Ninja extends Character {

  constructor() {
    super();
    this.language = new SayNothing();
    this.weapon = new Gun();
  }

  showUp() {
    console.log('Ninja usually shows up in the shadow');
  }
}

class Knight extends Character {

  constructor() {
    super();
    this.language = new Chinese();
    this.weapon = new Sword();
  }

  showUp() {
    console.log('Knight shows up like a gentleman');
  }
}

class Chinese implements LanguageBehavior {
  sayFightWords() {
    console.log('来干架啊！');
  }
}

class English implements LanguageBehavior {
  sayFightWords() {
    console.log('OK! Let us FIGHT !');
  }
}

class SayNothing implements LanguageBehavior {
  sayFightWords() {
    console.log('.....');
  }
}

class Gun implements WeaponBehavior {
  useWeapon() {
    console.log('Use gun to shoot');
  }
}

class Sword implements WeaponBehavior {
  useWeapon() {
    console.log('Use sword to cut');
  }
}

// Main
const ninja = new Ninja();
const knight = new Knight();

ninja.showUp();
ninja.speak();
ninja.fight();

console.log('======');

knight.showUp();
knight.speak();
knight.fight();

console.log('====== After a while ======')

ninja.setLanguage(new Chinese());
ninja.setWeapon(new Sword());
knight.setLanguage(new English());
knight.setWeapon(new Gun());

ninja.showUp();
ninja.speak();
ninja.fight();

console.log('======');

knight.showUp();
knight.speak();
knight.fight();