/**
 * @typedef {object} NodeProperties
 * @property {number|string} id
 * @property {unknown} value
 * 
 * @typedef {NodeProperties} NodeParams
 */
export default class Node {
  #id;
  #value;

  /** @param {NodeProperties} params */
  constructor({ id, value }) {
    this.#id = id;
    this.#value = value;
  }

  /** @returns {NodeProperties} */
  getProperties() {
    return {
      id: this.#id,
      value: this.#value
    };
  }


  getId() {
    return this.#id;
  }


  getValue() {
    return this.#value;
  }

  /**
   * @param {unknown} value 
   */
  setValue(value) {
    this.#value = value;
  }
}
