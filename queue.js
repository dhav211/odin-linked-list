class Queue {
  #size = 0;

  constructor() {
    this.head = new QueueNode(null);
    this.tail = new QueueNode(null);

    this.head.next = this.tail;
    this.tail.previous = this.head;
  }

  /**
   * Add value to the front of the queue
   * @param {*} value Value to add
   */
  enqueue(value) {
    const newNode = new QueueNode(value);
    newNode.previous = this.tail.previous;
    newNode.next = this.tail;
    this.tail.previous.next = newNode;
    this.tail.previous = newNode;

    this.#size++;
  }

  /**
   * Remove and return the first node of the queue
   * @returns First node of queue
   */
  dequeue() {
    const dequeuedValue = this.head.next;

    if (dequeuedValue !== null) {
      this.head.next = dequeuedValue.next;
      this.head.next.previous = this.head;
      this.#size--;
    }

    if (dequeuedValue !== null) {
      return dequeuedValue.value;
    } else {
      return null;
    }
  }

  /**
   * See the value of the first node in queue
   * @returns The value of the first node in queue
   */
  peek() {
    return this.head.next.value;
  }

  // create a queue called sorted
  // within a for loop that iterates thru the size of the queue
  // create two queues called longer and shorter
  // dequeue a value and call it insertion value
  // within a while loop that runs until sorted queue is empty
  // dequeue a value from sorted array and compare it
  insertionSort() {
    const sorted = new Queue();
    const initialLength = this.size();

    for (let i = 0; i < initialLength; i++) {
      const shorter = new Queue();
      const longer = new Queue();
      const insertionValue = this.dequeue();

      const sortedLength = sorted.size();
      for (let j = 0; j < sortedLength; j++) {
        const comparasionValue = sorted.dequeue();

        if (comparasionValue > insertionValue) {
          longer.enqueue(comparasionValue);
        } else {
          shorter.enqueue(comparasionValue);
        }
      }

      while (shorter.size() > 0) sorted.enqueue(shorter.dequeue());
      sorted.enqueue(insertionValue);
      while (longer.size() > 0) sorted.enqueue(longer.dequeue());
    }

    while (sorted.size() > 0) this.enqueue(sorted.dequeue());
  }

  /**
   * Print off each value in order as a string
   * @returns stringifyed linked list
   */
  toString() {
    let printedList = '';
    let currentNode = this.head;

    while (currentNode.next !== null) {
      printedList += `(${currentNode.next.value}) -> `;
      currentNode = currentNode.next;
    }

    return printedList.length > 0 ? printedList.slice(0, printedList.length - 4) : 'Empty';
  }

  /**
   * Get the size of the queue
   * @returns Size of the queue
   */
  size() {
    return this.#size;
  }
}

class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

const queue = new Queue();
queue.enqueue(5);
queue.enqueue(3);
queue.enqueue(6);
queue.enqueue(9);
queue.enqueue(21);
queue.enqueue(4);
queue.enqueue(19);
queue.enqueue(16);
// console.log(`Current size = ${queue.size()}`);
// console.log(queue.toString());
// console.log('--------------------------');
// while (queue.size() > 0) {
//   console.log(`Dequeued value = ${queue.dequeue()}`);
//   console.log(`Current size = ${queue.size()}`);
//   console.log(queue.toString());
//   console.log('--------------------------');
// }
console.log(queue.toString());
queue.insertionSort();
console.log(queue.toString());
