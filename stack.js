class Stack {
  #size = 0;

  constructor() {
    this.top = new StackNode(null);
  }

  /**
   * Push a value to the top of the stack
   * @param {*} value
   */
  push(value) {
    const newNode = new StackNode(value);
    newNode.next = this.top.next;
    this.top.next = newNode;
    this.#size++;
  }

  /**
   * Remove and return the top item from the stack
   * @returns Top item
   */
  pop() {
    const poppedValue = this.top.next;
    this.top.next = poppedValue.next;

    if (poppedValue !== null) {
      this.#size--;
      return poppedValue.value;
    } else {
      return null;
    }
  }

  insertionSort() {
    const temp = new Stack();
    for (let i = 0; i < this.#size - 1; i++) {
      for (let j = 0; j <= i; j++) {
        temp.push(this.pop());
      }

      let insertionValue = this.pop();

      while (temp.size() > 0) {
        const currentValue = temp.pop();
        if (insertionValue > currentValue) {
          this.push(insertionValue);
          insertionValue = currentValue;
        } else {
          this.push(currentValue);
        }
      }

      if (insertionValue !== null) this.push(insertionValue);
    }
  }

  selectionSort() {
    const temp = new Stack();
    const sorted = new Stack();

    while (this.#size > 0) {
      let currentSmallestValue = this.pop();

      while (this.#size > 0) {
        const currentComparasionValue = this.pop();

        if (currentSmallestValue <= currentComparasionValue) {
          temp.push(currentComparasionValue);
        } else {
          temp.push(currentSmallestValue);
          currentSmallestValue = currentComparasionValue;
        }
      }

      sorted.push(currentSmallestValue);

      while (temp.size() > 0) {
        this.push(temp.pop());
      }
    }

    while (sorted.size() > 0) {
      this.push(sorted.pop());
    }
  }

  /**
   * Print off each value in order as a string
   * @returns stringifyed linked list
   */
  toString() {
    let printedList = '';
    let currentNode = this.top;

    while (currentNode.next !== null) {
      printedList += `(${currentNode.next.value}) -> `;
      currentNode = currentNode.next;
    }

    return printedList.length > 0 ? printedList.slice(0, printedList.length - 4) : 'Empty';
  }

  /**
   * Get the size of the stack
   * @returns The size of the stack
   */
  size() {
    return this.#size;
  }
}

class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function reverseStack(stack) {
  const reversed = new Stack();

  while (stack.size() > 0) {
    reversed.push(stack.pop());
  }

  return reversed;
}

const stack = new Stack();
stack.push(3);
stack.push(6);
stack.push(2);
stack.push(12);
stack.push(8);
stack.push(7);
stack.push(5);
console.log(stack.toString());
// console.log(`Current stack size = ${stack.size()}`);
// console.log(stack.toString());
// console.log(`Popped value = ${stack.pop()}`);
// console.log(`Current stack size = ${stack.size()}`);
// console.log(stack.toString());

//stack.insertionSort();
stack.selectionSort();
console.log(stack.toString());
