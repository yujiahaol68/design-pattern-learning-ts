interface Engine {
  start();
  accelerate();
  slowDown();
  stop();
}

interface GPSLocation {
  X:number;
  Y:number;
}

interface Assistant {
  boot();
  searchLocation(place:string) : GPSLocation;
  hint(s:string);
  sayGoodBye(s:string);
}

interface Navigable {
  destination:string;
  arrived:boolean;
  setLocation(name:string, coordinate:GPSLocation);
  navigate();
  displayNavigationTrack();
  arrive();
}


class ElectricEngine implements Engine {
  public start() {
    console.log('Power on');
  }

  public accelerate() {
    console.log('Boost and drive');
  }

  public slowDown() {
    console.log('Decelerate');
  }

  public stop() {
    console.log('Power off');
  }
}

class GoogleNow implements Assistant {
  public boot() {
    this.hint('Where do you want to go ? Just say it and Car will auto-drive to the location');
  }

  public hint(sentence:string) {
    console.log(`>> ` + sentence);
  }

  public searchLocation(name:string) : GPSLocation {
    return {
      X: 126,
      Y: 76
    }
  }

  public sayGoodBye(currentPlaceName:string) {
    this.hint(`You safely arrive ${currentPlaceName}. GoodBye.`);
  }
}

class GoogleMap implements Navigable {
  public destination:string;
  private location:GPSLocation;
  public arrived:boolean = false;

  public setLocation(name:string, coordinate:GPSLocation) {
    this.destination = name;
    this.location = coordinate;
  }

  public navigate() {
    console.log('Calculate route map ...');
  }

  public displayNavigationTrack() {
    console.log('Nav status is on the monitor in real time...');
  }

  public arrive() {
    this.arrived = true;
  }
}

class GoogleDriveLessCarFacade {
  private engine:Engine;
  public ai:Assistant;
  public map:Navigable;

  constructor(e:Engine, ai:Assistant, m:Navigable) {
    this.engine = e;
    this.ai = ai;
    this.map = m;
  }

  public setDestination(placeName:string) {
    this.engine.start();
    this.ai.boot();

    const location = this.ai.searchLocation(placeName);
    this.map.setLocation(placeName, location);
    this.ai.hint(`Destination set to __${placeName}__`);
    this.map.navigate();
    this.map.displayNavigationTrack();
  }

  public drive() {
    this.ai.hint(`OK. We are going to ${this.map.destination}. Please tie your belt !`);
    this.engine.accelerate();
  }

  public arriveDestination() {
    this.engine.slowDown();

    this.map.arrive();

    if(this.map.arrived)
    this.ai.sayGoodBye(this.map.destination);

    this.engine.stop();
  }
}

const futureCar = new GoogleDriveLessCarFacade(
  new ElectricEngine(),
  new GoogleNow(),
  new GoogleMap()
);

futureCar.setDestination('Shenzhen Kempinski Hotel');
futureCar.drive();
futureCar.arriveDestination();