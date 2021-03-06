class Queue {
  private count: number;
  private lowestCount: number;
  private items: {[key: number]: unknown};

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element: unknown): void {
    this.items[this.count] = element;
    this.count += 1;
  }

  add(element: unknown): void {
    this.items[this.count] = element;
    this.count += 1;
  }

  dequeue(): undefined|unknown {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount += 1;
    return result;
  }

  remove(): undefined|unknown {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount += 1;
    return result;
  }

  peek(): undefined|unknown {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    return this.items[this.lowestCount];
  }

  scry(): undefined|unknown {
    if (this.isEmpty()) { return undefined; } // Return undefined if the queue is empty
    return this.items[this.lowestCount];
  }

  isEmpty(): boolean {
    return this.count - this.lowestCount === 0; // Returns true if empty and false otherwise
  }

  size(): number {
    return this.count - this.lowestCount;
  }

  length(): number {
    return this.count - this.lowestCount;
  }

  clear(): void {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString(): string {
    if (this.isEmpty()) return ''; // Return blank if the queue is empty
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++){
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }

  forEach(callback: (iteratorValue: unknown, tempIterator: number, queueItem: unknown) => any): void {
    if (this == null) throw new TypeError('"this" is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`);

    const queueObject = Object(this); // Assign the results of 'this' to queueObject
    const queueLength: number = this.size(); // Get the queues length
    let scopeArg, tempIterator = 0;
    if (arguments.length > 1) scopeArg = arguments[1];

    while (tempIterator < queueLength) {
      let iteratorValue;
      if (tempIterator in queueObject.items) {
        iteratorValue = queueObject.items[tempIterator];
        callback.call(scopeArg, iteratorValue, tempIterator, queueObject.items);
      }
      tempIterator += 1;
    }
  }

  toArray(): Array<unknown> {
    const tempArray: Array<unknown> = [];
    this.forEach((item: unknown): void => {
      tempArray.push(item);
    });
    return tempArray;
  }
}

export = Queue;
