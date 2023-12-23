/**
 * @typedef {object} EdgeProperties
 * @property {unknown} value
 * 
 * @typedef {EdgeProperties} EdgeParams
 */
export default class Edge {
  #value;

  /** @param {EdgeParams} params */
  constructor({ value }) {
    this.#value = value;
  }

  /** @returns {EdgeProperties} */
  getProperties() {
    return {
      value: this.#value
    };
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
