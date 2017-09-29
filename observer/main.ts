interface Subject {
  registerObserver(o:Observer);
  removeObserver(o:Observer);
  notifyObservers();
}

interface Observer {
  id:number;
  update(dispatchedData:any);
  display();
}

// e.g.1

interface Magazine {
  articles:string[];
  ads:string[];
}

class Publisher implements Subject {
  private subscriberList:Observer[];
  private magazine:Magazine;
  private subscriberIndex:number;

  constructor() {
    this.subscriberList = [];
    this.subscriberIndex = 1;
  }

  public publishNewMagazine(magazineReady:Magazine) {
    this.magazine = magazineReady;
    this.measurementsChanged();
  }

  public registerObserver(o:Observer) {
    o.id = this.subscriberIndex;
    this.subscriberIndex++;
    this.subscriberList.push(o);
  }

  public removeObserver(o:Observer) {
    const unSubscriberIndex = this.subscriberList.findIndex(observer => observer.id === o.id);
    if (unSubscriberIndex !== -1) {
      let unSubscriber = this.subscriberList.splice(unSubscriberIndex, 1);
      unSubscriber = undefined;
    }
  }

  public measurementsChanged() {
    this.notifyObservers();
  }

  public notifyObservers() {
    this.subscriberList.map(subscriber => subscriber.update(
      JSON.parse(JSON.stringify(this.magazine))
    ));
  }
}

class PaperBack implements Observer {
  public id:number;
  private magazine:Magazine;
  private ads:string[];

  constructor() {
    this.ads = ['PaperAd1', 'PaperAd2'];
  }

  public update(newRelease:Magazine) {
    this.magazine = newRelease;
    this.magazine.ads = this.ads.concat(this.magazine.ads);
  }

  public addNewAds(ad:string) {
    this.magazine.ads.push(ad);
  }

  public display() {
    console.log('PaperBack shows in a paper magazine');
    console.log('Title:', this.magazine.articles);
    console.log('Ads:', this.magazine.ads.join(','));
  }
}

class DigitalEdition implements Observer {
  public id:number;
  private magazine:Magazine;

  public update(newRelease:Magazine) {
    this.magazine = newRelease;
  }

  public display() {
    console.log('DigitalEdition shows in digital device.');
    console.log('Title:', this.magazine.articles);
    console.log('Ads:', this.magazine.ads.join(','));
  }
}

// Main
const times = new Publisher();

const yellowPaperBack = new PaperBack();
const timesApp = new DigitalEdition();

times.registerObserver(yellowPaperBack);
times.registerObserver(timesApp);

console.log('First journal released');
times.publishNewMagazine({
  articles: ['The White house', 'Bill Gates'],
  ads: ['iPhone x', 'iPhone 8']
});

yellowPaperBack.display();
timesApp.display();

console.log('===========');

console.log('Second journal released');
times.publishNewMagazine({
  articles: ['China', 'Golden brick conference'],
  ads: ['One Plus 5', 'Macbook Pro 2018']
});

yellowPaperBack.addNewAds('Amazon Kindle PaperWhite 3');
yellowPaperBack.display();
timesApp.display();

console.log('==========');
console.log('Third journal released and remove Paper Edition');
times.removeObserver(yellowPaperBack);
times.publishNewMagazine({
  articles: ['Video clip 1', 'Video clip 2'],
  ads: ['Hololens', 'XBox one X']
});

yellowPaperBack.display();
timesApp.display();


// e.g.2

interface LazyObserver {
  id:number;
  LazyBoard:NoticeBoard;
  unSubscribeNotice();
  needUpdate:boolean;
  update(dispatchedData:any);
  display();
}

class NoticeBoard implements Subject {
  private notices:string[];
  private subscriberList:LazyObserver[];
  private subscriberIndex:number;

  constructor() {
    this.notices = [];
    this.subscriberIndex = 1;
  }

  public addNewNotice(notice:string) {
    this.notices.push(notice);
    this.measurementsChanged();
  }

  public measurementsChanged() {

  }

  public registerObserver(o:LazyObserver) {
    o.id = this.subscriberIndex;
    this.subscriberIndex++;
    this.subscriberList.push(o);
  }

  public removeObserver(o:LazyObserver) {
    const unSubscriberIndex = this.subscriberList.findIndex(observer => observer.id === o.id);
    if (unSubscriberIndex !== -1) {
      let unSubscriber = this.subscriberList.splice(unSubscriberIndex, 1);
      unSubscriber = undefined;
    }
  }

  public notifyObservers() {}

}