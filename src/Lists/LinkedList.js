import LinkedListNode from './LinkedListNode.js';

/**
 * @typedef {object} LinkedListProperties
 * @property {LinkedListNode=} head
 * @property {LinkedListNode=} tail
 * 
 * @property {number} count
 * 
 * @typedef {object} LinkedListParams
 * @property {LinkedListNode=} head
 * @property {LinkedListNode=} tail
 */
export default class LinkedList {
  #head;
  #tail;

  #count;

  /** @param {LinkedListParams} params */
  constructor({ head, tail } = {}) {
    this.#head = head;

    if (tail == null && head != null) {
      tail = this.getTailFromHead();
    }
    this.#tail = tail;

    this.#count = 0;
  }

  /**
   * @param {unknown} value
   */
  prepend(value) {
    const newNode = new LinkedListNode({ value, next: this.#head });

    this.#count++;

    this.#head = newNode;

    if (this.#tail == null) {
      this.#tail = newNode;
    }
  }

  /**
   * @param {unknown} value
   */
  append(value) {
    const newNode = new LinkedListNode({ value });

    this.#count++;

    if (this.#count === null || this.#tail == null) {
      this.#head = newNode;
      this.#tail = newNode;

      return;
    }

    this.#tail.setNext(newNode);

    this.#tail = newNode;
  }


  getCount() {
    return this.#count;
  }


  /**
   * @param {unknown} value
   */
  find(value) {
    let currentNode = this.#head;

    if (currentNode == null) {
      return null;
    }

    while (currentNode != null) {
      if (currentNode.getValue() === value) {
        return currentNode;
      }

      currentNode = currentNode.getNext();
    }

    return;
  }


  getHead() {
    return this.#head;
  }

  removeHead() {
    if (this.#head == null) {
      return;
    }

    this.#count--;

    const deletedHead = this.#head;

    if (this.#head.getNext()) {
      this.#head = this.#head.getNext();
    } else {
      this.#head = undefined;
      this.#tail = undefined;
    }

    return deletedHead;
  }


  getTail() {
    return this.#tail;
  }

  getTailFromHead() {
    const head = this.getHead();
    if (head == null) {
      return;
    }

    let nextNode = head.getNext();
    if (nextNode == null) {
      return head;
    }

    while (nextNode != null) {
      const nextNextNode = nextNode.getNext();

      if (nextNextNode == null) {
        return nextNode;
      }

      nextNode = nextNextNode;
    }
  }

  deleteTail() {
    const head = this.#head;
    const tail = this.#tail;

    if (head == null || tail == null) {
      return;
    }

    const deletedTail = tail;

    if (this.#count === 1) {
      this.#head = undefined;
      this.#tail = undefined;

      this.#count--;

      return deletedTail;
    }

    let currentNode = head;
    let nextNode = currentNode.getNext();

    // Go from head to tail
    while (nextNode != null) {
      const nextNextNode = nextNode.getNext();

      // isLast
      if (nextNextNode == null) {
        currentNode.clearNext();
        break;
      }

      currentNode = nextNode;
      nextNode = currentNode.getNext();
    }

    this.#tail = currentNode;

    this.#count--;

    return deletedTail;
  }


  clear() {
    this.#head = undefined;
    this.#tail = undefined;

    this.#count = 0;
  }
}