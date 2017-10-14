interface Actress {
  name:string;
  dance();
  sing();
}

interface StripperDancer {
  name:string;
  twistAss();
  sexyGasp();
}

class BroadwayActress implements Actress {
  public name:string;

  constructor(name:string) {
    this.name = name;
  }

  public dance() {
    console.log(`Professianal dancer ${this.name} is performing ballet`);
  }

  public sing() {
    console.log(`${this.name} is singing opera`);
  }
}

class ExoticDancer implements StripperDancer {
  public name:string;

  constructor(name:string) {
    this.name = name;
  }

  public twistAss() {
    console.log(`${this.name} performs twist ass`);
  }

  public sexyGasp() {
    console.log(`Listen. ${this.name}'s gasp sounds so deep and sexy`);
  }
}

class ExoticDancerAdapter implements Actress {
  private dancer:ExoticDancer;
  public name:string;

  constructor(exoticDancer:ExoticDancer) {
    this.dancer = exoticDancer;
    this.name = exoticDancer.name;
  }

  public dance() {
    this.dancer.twistAss();
  }

  public sing() {
    this.dancer.sexyGasp();
  }
}

class BroadwayTheater {
  private girls:Actress[] = [];

  public hireDancer(goodDancer:Actress) {
    this.girls.push(goodDancer);
  }

  public giveShows() {
    if(this.girls.length === 0)
      return console.log('No dancers No show');

    this.girls.forEach(girl => girl.dance());
    this.girls.forEach(girl => girl.sing());
  }
}

const theater = new BroadwayTheater();

theater.hireDancer(new BroadwayActress('Lisa'));
theater.hireDancer(new BroadwayActress('Mary'));

theater.giveShows();

const unknownDancer = new ExoticDancerAdapter(new ExoticDancer('Lily'));
theater.hireDancer(unknownDancer);

console.log('=====');
console.log('I heard that they hire some good dancers and singers someWhere ? Let us go to watch');
console.log('=====');

theater.giveShows();
