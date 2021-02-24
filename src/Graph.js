class Graph {
    constructor(nodes = [], edges = []) {
        this.nodes = nodes;
        this.edges = edges;
    }

    /**
     * @param {number|string} nodeId 
     * @param {number|string|object} data 
     * @returns {Node} 
     */
    addNode(nodeId, data) {
        const node = this.hasNode(nodeId);
        if (node) {
            throw new Error('Node already exists');
        }

        this.nodes[nodeId] = new Node(nodeId, data);

        this.nodesCount++;

        return this.getNode(nodeId);
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @param {number|string|object} data 
     * @param {boolean} undirected 
     * @returns {object} edges
     */
    addEdge(sourceNodeId, targetNodeId, data, undirected) {
        const sourceNode = this.hasNode(sourceNodeId);
        if (!sourceNode) {
            throw new Error('sourceNode is not exists');
        }
        const targetNode = this.hasNode(targetNodeId);
        if (!targetNode) {
            throw new Error('targetNode is not exists');
        }

        if (!this.edges[sourceNodeId]) {
            this.edges[sourceNodeId] = [];
        }
        if (!this.edges[targetNodeId]) {
            this.edges[targetNodeId] = [];
        }

        this.edges[sourceNodeId][targetNodeId] = new Edge(data);
        this.edgesCount++;
        if (undirected) {
            this.edges[targetNodeId][targetNodeId] = new Edge(data);
            this.edgesCount++;
            return [this.getEdge(sourceNodeId, targetNodeId), this.getEdge(targetNodeId, sourceNodeId)];
        }

        return [this.getEdge(sourceNodeId, targetNodeId)];
    }

    /**
     * @param {number|string} nodeId 
     * @returns {Node}
     */
    getNode(nodeId) {
        return this.nodes[nodeId];
    }

    /**
     * @returns {object} nodes
     */
    getAllNodes() {
        return this.nodes;
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @returns {Edge}
     */
    getEdge(sourceNodeId, targetNodeId) {
        return this.edges[sourceNodeId][targetNodeId];
    }

    /**
     * @param {number|string} nodeId 
     * @returns {object} edges
     */
    getEdges(nodeId) {
        return this.edges[nodeId];
    }

    /**
     * @returns {object} edges
     */
    getAllEdges() {
        return this.edges;
    }

    /**
     * @param {number|string} nodeId 
     * @returns {boolean}
     */
    hasNode(nodeId) {
        return !!this.getNode(nodeId);
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @returns {boolean}
     */
    hasEdge(sourceNodeId, targetNodeId) {
        return this.hasNode(sourceNodeId) && this.hasNode(targetNodeId) && this.getEdge(sourceNodeId, targetNodeId);
    }

    /**
     * @returns {number}
     */
    getNodesCount() {
        return this.nodesCount;
    }

    /**
     * @returns {number}
     */
    getEdgesCount() {
        return this.edgesCount;
    }

    /**
     * @param {number|string} nodeId 
     * @param {number|string|object} data 
     */
    setNode(nodeId, data) {
        this.getNode(nodeId).setData(data);
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @param {number|string|object} data 
     */
    setEdge(sourceNodeId, targetNodeId, data) {
        this.getEdge(sourceNodeId, targetNodeId).setData(data);
    }

    /**
     * @param {object} nodes 
     */
    setNodes(nodes) {
        this.nodes = nodes;
    }

    /**
     * @param {object} edges 
     */
    setEdges(edges) {
        this.edges = edges;
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @returns {boolean} isRemoved
     */
    removeEdge(sourceNodeId, targetNodeId) {
        if (!this.hasEdge(sourceNodeId, targetNodeId)) {
            return false;
        }

        delete this.edges[sourceNodeId][targetNodeId];
        this.edgesCount--;

        return true;
    }

    /**
     * @param {number|string} nodeId 
     */
    removeEdges(nodeId) {
        const edges = this.getEdges(nodeId);
        this.edgesCount -= edges.length;
        edges.forEach(edge => delete edge[nodeId]);
    }

    clear() {
        this.nodes = [];
        this.edges = [];
        this.edgesCount = 0;
    }
}