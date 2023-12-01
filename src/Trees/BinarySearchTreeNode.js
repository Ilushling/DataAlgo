import LinkedList from '../Lists/LinkedList.js';

/**
 * @typedef1 {import('../Lists/LinkedList.js').default} LinkedList
 */

/**
 * @typedef {object} BinarySearchTreeNodeParams
 * @property {number} key
 * @property {unknown} value
 * @property {number=} height
 * 
 * @property {BinarySearchTreeNode=} left
 * @property {BinarySearchTreeNode=} right
 * @property {BinarySearchTreeNode=} parent
 * 
 * @property {number=} count
 * @property {LinkedList=} siblings
 * 
 */
export default class BinarySearchTreeNode {
  #key;
  #value;
  #height;

  #left;
  #right;
  #parent;

  #count;
  #siblings;

  /** @param {BinarySearchTreeNodeParams} params */
  constructor({
    key,
    value,
    height,

    left,
    right,
    parent,

    count = 0,
    siblings = new LinkedList()
  }) {
    this.#key = key;
    this.#value = value;
    this.#height = height;

    this.#left = left;
    this.#right = right;
    this.#parent = parent;

    // For duplicates key
    this.#count = count;
    // LinkedList of values
    this.#siblings = siblings;
  }

  getKey() {
    return this.#key;
  }

  getValue() {
    return this.#value;
  }


  getHeight() {
    return this.#height;
  }

  /**
   * @param {number} height
   */
  setHeight(height) {
    this.#height = height;
  }


  getLeft() {
    return this.#left;
  }

  /**
   * @param {BinarySearchTreeNode} left
   */
  setLeft(left) {
    this.#left = left;
  }

  clearLeft() {
    this.#left = undefined;
  }


  getRight() {
    return this.#right;
  }

  /**
   * @param {BinarySearchTreeNode} right
   */
  setRight(right) {
    this.#right = right;
  }

  clearRight() {
    this.#right = undefined;
  }


  getParent() {
    return this.#parent;
  }

  /**
   * @param {BinarySearchTreeNode} parent
   */
  setParent(parent) {
    this.#parent = parent;
  }

  clearParent() {
    this.#parent = undefined;
  }


  getCount() {
    return this.#count;
  }

  incrementCount() {
    this.#count++;
  }

  decrementCount() {
    this.#count--;
  }


  getSiblings() {
    return this.#siblings;
  }
}