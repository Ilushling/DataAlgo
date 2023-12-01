/**
 * @typedef {object} DoublyLinkedListNodeParams
 * @property {unknown} value
 * 
 * @property {DoublyLinkedListNode=} next
 * @property {DoublyLinkedListNode=} previous
 */
export default class DoublyLinkedListNode {
  #value;

  #next;
  #previous;

  /** @param {DoublyLinkedListNodeParams} params */
  constructor({
    value,

    next,
    previous
  }) {
    this.#value = value;

    this.#next = next;
    this.#previous = previous;
  }

  getValue() {
    return this.#value;
  }


  getNext() {
    return this.#next;
  }

  /**
   * @param {DoublyLinkedListNode} next
   */
  setNext(next) {
    this.#next = next;
  }

  clearNext() {
    this.#next = undefined;
  }


  getPrevious() {
    return this.#previous;
  }

  /**
   * @param {DoublyLinkedListNode} previous
   */
  setPrevious(previous) {
    this.#previous = previous;
  }

  clearPrevious() {
    this.#previous = undefined;
  }
}