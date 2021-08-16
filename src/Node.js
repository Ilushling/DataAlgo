export class Node {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }

    /**
     * @returns {number|string}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {any}
     */
    getValue() {
        return this.value;
    }

    /**
     * @param {any} value 
     */
    setValue(value) {
        this.value = value;
    }
}