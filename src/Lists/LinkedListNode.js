/**
 * @typedef {object} LinkedListNodeParams
 * @property {unknown} value
 * 
 * @property {LinkedListNode=} next
 */
export default class LinkedListNode {
  #value;

  #next;

  /** @param {LinkedListNodeParams} params */
  constructor({
    value,

    next
  }) {
    this.#value = value;

    this.#next = next;
  }

  getValue() {
    return this.#value;
  }


  getNext() {
    return this.#next;
  }

  /**
   * @param {LinkedListNode} next
   */
  setNext(next) {
    this.#next = next;
  }

  clearNext() {
    this.#next = undefined;
  }
}
