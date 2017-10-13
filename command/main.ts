interface Task {
  getDate() : Date;
  execute();
}

class Scheduler {
  private taskQueue:Task[];
  private nextTaskTime:Date;

  constructor() {
    this.taskQueue = [];
    this.nextTaskTime = undefined;
  }

  public addTask(newTask:Task) {
    this.taskQueue.push(newTask);

    if(!this.nextTaskTime) {
      this.nextTaskTime = newTask.getDate();
      return;
    }

    this.nextTaskTime = this.nextTaskTime > newTask.getDate() ? newTask.getDate() : this.nextTaskTime;
    this.taskQueue = this.taskQueue.sort(this.compareDate);
  }

  public getNearestDate() {
    return this.nextTaskTime;
  }

  public doTask() {
    if (this.taskQueue.length === 0) {
      console.log('--> Task queue is now Empty');
      return;
    }

    const taskReady = this.taskQueue.shift();
    taskReady.execute();

    console.log('--> Task done !');
    console.log('======');
  }

  private compareDate(a:Task, b:Task) {
    return a.getDate() > b.getDate() ? 1 : -1;
  }
}

class Bus {
  public goTo(place:string) {
    console.log(`Go to ${place} by Bus`);
  }
}

class GotoSchool implements Task {
  private bus:Bus;
  private date:Date;

  constructor(bus:Bus, date:Date) {
    this.bus = bus;
    this.date = date;
  }

  public getDate() {
    return this.date;
  }

  public execute() {
    this.bus.goTo('school');
  }

}

class SpiderSuit {
  public wear() {
    console.log('Put on the suit ...');
    console.log('Suit Lady online ...');
  }

  public unlockKillingMode() {
    console.log('Unlock and enable killing Mode');
  }

  public enableNormalMode() {
    console.log('Enable basic suit function');
  }
}

class StarkInterShip implements Task {
  private suit:SpiderSuit;
  private date:Date;

  constructor(suit:SpiderSuit, date:Date) {
    this.suit = suit;
    this.date = date;
  }

  public getDate() {
    return this.date;
  }

  public execute() {
    this.suit.wear();
    this.suit.enableNormalMode();
    this.suit.unlockKillingMode();
    console.log('Go to catch Bad guys');
  }
}

const time1 = new Date();
const time2 = new Date();

time1.setSeconds(time1.getSeconds() + 2);
time2.setSeconds(time2.getSeconds() + 5);

const scheduler = new Scheduler();

const task1 = new GotoSchool(new Bus(), time1);
const task2 = new StarkInterShip(new SpiderSuit(), time2);

scheduler.addTask(task2);
scheduler.addTask(task1);

function checkScheduler() {
  console.log('--------------');
  console.log('Checking SpiderMan scheduler ...');

  let latestDate = new Date();
  if (scheduler.getNearestDate() <= latestDate) {
    scheduler.doTask();
  }
  latestDate = null;
}


setInterval(checkScheduler, 1000);