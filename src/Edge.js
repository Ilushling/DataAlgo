export class Edge {
    constructor(value) {
        this.value = value;
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