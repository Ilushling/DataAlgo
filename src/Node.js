class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    /**
     * @returns {number|string}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {number|string|object}
     */
    getData() {
        return this.data;
    }

    /**
     * @param {number|string|object} data 
     */
    setData(data) {
        this.data = data;
    }
}