class Edge {
    constructor(data) {
        this.data = data;
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