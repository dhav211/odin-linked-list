class LinkedList {
  #size = 0;

  constructor() {
    const headSentinel = new ListNode(null);
    const tailSentinel = new ListNode(null);

    headSentinel.next = headSentinel.previous = tailSentinel;
    tailSentinel.next = tailSentinel.previous = headSentinel;

    this.head = headSentinel;
    this.tail = tailSentinel;
  }

  /**
   * Add a value to the back of the linked list
   * @param {*} value Value of any type to be added
   */
  append(value) {
    this.#insertAfter(this.tail.previous, value);
  }

  /**
   * Add a value to the front of the linked list
   * @param {*} value Value of any type to added
   */
  prepend(value) {
    this.#insertAfter(this.head, value);
  }

  insertSorted(value) {
    let currentNode = this.head;

    while (currentNode.next.value !== null && currentNode.next.value < value) {
      currentNode = currentNode.next;
    }

    this.#insertAfter(currentNode, value);
  }

  /**
   * Insert a value after the given node
   * @param {*} node The node the value will be inserted after
   * @param {*} value Value to be inserted
   */
  #insertAfter(node, value) {
    const newNode = new ListNode(value);
    newNode.previous = node;
    newNode.next = node.next;
    node.next.previous = newNode;
    node.next = newNode;
    this.#size++;
  }

  /**
   * Insert value at given index
   * @param {*} value value to insert
   * @param {*} index position to insert value
   */
  insertAt(value, index) {
    let currentNode = this.head;
    let currentIndex = 0;
    let hasFoundIndex = false;

    while (currentNode.next.value !== null && currentIndex <= index) {
      if (currentIndex == index) {
        this.#insertAfter(currentNode, value);

        hasFoundIndex = true;
        break;
      }

      currentIndex++;
      currentNode = currentNode.next;
    }

    if (!hasFoundIndex) {
      this.append(value);
    }
  }

  /**
   * Print off each value in order as a string
   * @returns stringifyed linked list
   */
  toString() {
    let printedList = '';
    let currentNode = this.head;

    while (currentNode.next.value !== null) {
      printedList += `(${currentNode.next.value}) -> `;
      currentNode = currentNode.next;
    }

    return printedList.slice(0, printedList.length - 4);
  }

  /**
   * Print off each value in reverse as a string
   * @returns stringifyed linked list
   */
  toStringReversed() {
    let printedList = '';
    let currentNode = this.tail;

    while (currentNode.previous.value !== null) {
      printedList += `(${currentNode.previous.value}) -> `;
      currentNode = currentNode.previous;
    }

    return printedList.slice(0, printedList.length - 4);
  }

  /**
   * Remove and return the last value, if list is empty will return null
   * @returns Last item of list
   */
  pop() {
    let poppedNode = null;

    if (this.tail.previous.value !== null) {
      poppedNode = this.tail.previous;
      this.tail.previous = poppedNode.previous;
      this.tail.previous.next = this.tail;
      this.#size--;
      return poppedNode.value;
    } else {
      return null;
    }
  }

  /**
   * Remove and return value at given index
   * @param {*} index Position of value to remove
   * @returns Removed value, if value doesn't exist return null
   */
  removeAt(index) {
    let removedNode = null;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode.next.value !== null && currentIndex <= index) {
      if (currentIndex === index) {
        removedNode = currentNode.next;
        currentNode.next = removedNode.next;
        removedNode.next.previous = currentNode;
        this.#size--;

        break;
      }
      currentIndex++;
      currentNode = currentNode.next;
    }

    return removedNode !== null ? removedNode.value : null;
  }

  /**
   * Remove the node that comes after the given node
   * @param {*} afterNode The node to be removed will come after this given node
   * @returns The value of the the removed node
   */
  removeAfter(afterNode) {
    if (afterNode.value === null) return;

    const removedNode = afterNode.next;
    afterNode.next = removedNode.next;
    removedNode.next.previous = afterNode;
    this.#size--;

    return removedNode.value;
  }

  /**
   * Remove a given node and return it's value.
   * @param {*} nodeToRemove The node to remove
   * @returns The value of returned node.
   */
  removeNode(nodeToRemove) {
    if (nodeToRemove.value === null) return;

    nodeToRemove.previous.next = nodeToRemove.next;
    nodeToRemove.next.previous = nodeToRemove.previous;

    return nodeToRemove.value;
  }

  /**
   * Get the first value of the linked list
   * @returns first value
   */
  first() {
    return this.head.next.value;
  }

  /**
   * Get the last value of the linked list
   * @returns last value
   */
  last() {
    return this.tail.previous.value;
  }

  /**
   * Get the number of indexes in linked list
   * @returns size of linked list
   */
  size() {
    return this.#size;
  }

  /**
   * Get the value at a given position of the linked list
   * @param {*} index position of linked list to get value
   * @returns value of given position
   */
  at(index) {
    let value = null;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode.next.value !== null && currentIndex <= index) {
      if (currentIndex == index) {
        value = currentNode.next.value;
      }

      currentNode = currentNode.next;
      currentIndex++;
    }

    return value;
  }

  /**
   * Get the index of the given value if value exists
   * @param {*} value Vaule to find
   * @returns Index of value, if value doesn't exist return null
   */
  find(value) {
    let index = null;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode.next.value !== null) {
      if (currentNode.next.value === value) {
        index = currentIndex;
        break;
      }

      currentNode = currentNode.next;
      currentIndex++;
    }

    return index;
  }

  /**
   * Find the largest value in linked list.
   * @returns Largest value in linked list
   */
  findLargest() {
    let currentNode = this.head;
    let currentLargest = currentNode.next.value !== null ? currentNode.next.value : null;

    while (currentNode.next.value !== null) {
      if (currentNode.next.value > currentLargest) currentLargest = currentLargest.next.value;

      currentNode = currentNode.next;
    }

    return currentLargest;
  }

  /**
   * Check if given value exists in linked list
   * @param {*} value searching value
   * @returns boolean value for wether value exists in linked list
   */
  contains(value) {
    let exists = false;
    let currentNode = this.head;

    while (currentNode.next.value !== null) {
      if (currentNode.next.value == value) {
        exists = true;
        break;
      }

      currentNode = currentNode.next;
    }

    return exists;
  }

  isSorted() {
    let sorted = true;
    let currentNode = this.head;

    while (currentNode.next.value !== null && sorted) {
      const nextNode = currentNode.next;
      if (currentNode.value !== null && currentNode.value > nextNode.value) {
        sorted = false;
      }

      currentNode = currentNode.next;
    }

    return sorted;
  }

  /**
   * Sort the linked list with insertion sort.
   */
  insertionSort() {
    let currentNode = this.head.next;
    let nextNode = currentNode.next.next;

    while (currentNode.next.value !== null) {
      const insertionNodeValue = this.removeAfter(currentNode);

      while (currentNode.value !== null && currentNode.value > insertionNodeValue) {
        currentNode = currentNode.previous;
      }

      this.#insertAfter(currentNode, insertionNodeValue);

      currentNode = nextNode.previous;
      nextNode = nextNode.next;
    }
  }

  /**
   * Sort the linked list with selection sort.
   */
  selectionSort() {
    let currentNode = this.head.next;

    while (currentNode.next.value !== null) {
      let currentLowestNode = currentNode;
      let comparsionNode = currentNode.next;

      while (comparsionNode.value !== null) {
        if (currentLowestNode.value > comparsionNode.value) currentLowestNode = comparsionNode;

        comparsionNode = comparsionNode.next;
      }

      const lowestValue = currentLowestNode.value;
      const currentNodeValue = currentNode.value;

      currentNode.value = lowestValue;
      currentLowestNode.value = currentNodeValue;

      currentNode = currentNode.next;
    }
  }
}

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

const linkedList = new LinkedList();
linkedList.append(17);
linkedList.append(3);
linkedList.append(5);
linkedList.prepend(6);
linkedList.append(12);
linkedList.prepend(15);

console.log(linkedList.toString());
console.log(linkedList.toStringReversed());
console.log(`First value = ${linkedList.first()}`);
console.log(`Last value = ${linkedList.last()}`);

linkedList.insertAt(14, 3);
console.log(linkedList.toString());
console.log(`Popped value = ${linkedList.pop()}`);
console.log(linkedList.toString());
console.log(`Value removed at index 2 = ${linkedList.removeAt(2)}`);
console.log(linkedList.toString());
console.log(`Linked list size = ${linkedList.size()}`);

//console.log(`Current largest = ${linkedList.findLargest()}`);
//linkedList.insertionSort();
linkedList.selectionSort();
console.log(linkedList.toString());
linkedList.insertSorted(7);
linkedList.insertSorted(2);
linkedList.insertSorted(18);
console.log(linkedList.toString());
