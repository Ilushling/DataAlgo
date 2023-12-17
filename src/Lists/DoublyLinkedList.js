import DoublyLinkedListNode from './DoublyLinkedListNode.js';

/**
 * @typedef {object} DoublyLinkedListProperties
 * @property {DoublyLinkedListNode=} head
 * @property {DoublyLinkedListNode=} tail
 * 
 * @property {number} count
 * 
 * @typedef {DoublyLinkedListProperties} DoublyLinkedListParams
 */
export default class DoublyLinkedList {
  #head;
  #tail;

  #count;

  /** @param {DoublyLinkedListParams} params */
  constructor({ head, tail }) {
    this.#head = head;
    this.#tail = tail;

    this.#count = 0;
  }

  /**
   * @param {unknown} value
   */
  prepend(value) {
    const head = this.#head;
    const tail = this.#tail;

    const newNode = new DoublyLinkedListNode({ value, next: head });

    this.#count++;

    if (head != null) {
      head.setPrevious(newNode);
    }

    this.#head = newNode;

    if (tail == null) {
      this.#tail = newNode;
    }
  }

  /**
   * @param {unknown} value
   */
  append(value) {
    const head = this.#head;

    const newNode = new DoublyLinkedListNode({ value, next: head });

    this.#count++;

    if (this.#tail != null) {
      this.#tail.setNext(newNode);

      newNode.setPrevious(this.#tail);
    }

    this.#tail = newNode;

    if (head == null) {
      this.#head = newNode;
    }
  }

  /**
   * @param {unknown} value
   */
  find(value) {
    let currentNode = this.#head;

    while (currentNode != null) {
      if (currentNode.getValue() === value) {
        return currentNode;
      }

      currentNode = currentNode.getNext();
    }
  }

  deleteTail() {
    const tail = this.#tail;

    if (tail == null) {
      return;
    }

    this.#count--;

    const deletedTail = tail;

    if (tail.getPrevious()) {
      this.#tail = tail.getPrevious();
      tail.clearNext();
    } else {
      this.#head = undefined;
      this.#tail = undefined;
    }

    return deletedTail;
  }

  deleteHead() {
    const head = this.#head;

    if (head == null) {
      return;
    }

    this.#count--;

    const deletedHead = head;

    if (head.getNext()) {
      this.#head = head.getNext();
      head?.clearPrevious();
    } else {
      this.#head = undefined;
      this.#tail = undefined;
    }

    return deletedHead;
  }

  clear() {
    this.#head = undefined;
    this.#tail = undefined;

    this.#count = 0;
  }
}