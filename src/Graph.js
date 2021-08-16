import { Node } from './Node.js';
import { Edge } from './Edge.js';

export class Graph {
    constructor(nodes = new Map(), edges = new Map()) {
        this.nodes = nodes;
        this.edges = edges;
        this.nodesCount = this.nodes.size;
    }

    /**
     * @param {number|string} nodeId 
     * @param {number|string|object} value 
     * @returns {Node} 
     */
    addNode(nodeId, value) {
        if (this.hasNode(nodeId)) {
            throw new Error('Node already exists');
        }

        const node = new Node(nodeId, value);
        this.nodes.set(nodeId, node);

        this.nodesCount++;

        return node;
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @param {number|string|object} value 
     * @param {boolean} undirected 
     * @returns {object} edges
     */
    addEdge(sourceNodeId, targetNodeId, value, undirected = false) {
        if (!this.hasNode(sourceNodeId)) {
            throw new Error('sourceNode is not exists');
        }
        if (!this.hasNode(targetNodeId)) {
            throw new Error('targetNode is not exists');
        }

        this.setEdge(sourceNodeId, targetNodeId, new Edge(value));
        this.edgesCount++;
        if (undirected) {
            this.setEdge(targetNodeId, sourceNodeId, new Edge(value));
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
        return this.nodes.get(nodeId);
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
        return this.getEdges(sourceNodeId).get(targetNodeId);
    }

    /**
     * @param {number|string} nodeId 
     * @returns {object} edges
     */
    getEdges(nodeId) {
        return this.edges.get(nodeId);
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
        return this.nodes.has(nodeId);
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @returns {boolean}
     */
    hasEdge(sourceNodeId, targetNodeId) {
        return this.getEdges(sourceNodeId).has(targetNodeId);
    }

    /**
     * @param {number|string} nodeId 
     * @returns {boolean}
     */
    hasEdges(nodeId) {
        return this.edges.has(nodeId);
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
     * @param {object} value 
     */
    setNode(nodeId, value) {
        this.nodes.set(nodeId, value);
    }

    /**
     * @param {object} nodes 
     */
    setAllNodes(nodes) {
        this.nodes = nodes;
    }

    /**
     * @param {number|string} sourceNodeId 
     * @param {number|string} targetNodeId 
     * @param {object} edge 
     */
    setEdge(sourceNodeId, targetNodeId, edge) {
        if (!this.hasEdges(sourceNodeId)) {
            this.setEdges(sourceNodeId, new Map());
        }
        this.getEdges(sourceNodeId).set(targetNodeId, edge);
    }

    /**
     * @param {number|string} nodeId
     * @param {object} edges
     */
    setEdges(nodeId, edges) {
        if (this.hasEdges(nodeId)) {
            const edgesOld = this.getEdges(nodeId);
            this.edgesCount -= edgesOld.size;
        }

        this.edges.set(nodeId, edges);
        this.edgesCount += edges.size;
    }

    /**
     * @param {object} edges 
     */
    setAllEdges(edges) {
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

        this.getEdges(sourceNodeId).delete(targetNodeId);
        this.edgesCount--;

        return true;
    }

    /**
     * @param {number|string} nodeId 
     */
    removeEdges(nodeId) {
        if (!this.hasEdges(nodeId)) {
            return false;
        }

        const edges = this.getEdges(nodeId);
        this.edgesCount -= edges.size;

        edges.clear();

        return true;
    }

    clear() {
        this.nodes.clear();
        this.edges.clear();
        this.edgesCount = 0;
    }
}