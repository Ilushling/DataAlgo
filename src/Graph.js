import Node from './Node.js';
import Edge from './Edge.js';

/**
 * @typedef {Map<number|string, Map<number|string, Edge>>} Edges
 */

/**
 * @typedef {object} GraphProperties
 * @property {Map<number|string, Node>=} nodes
 * @property {Edges=} edges
 * 
 * @typedef {GraphProperties} GraphParams
 */
export default class Graph {
  #nodes;
  #edges;

  #nodesCount;
  #edgesCount;

  /** @param {GraphParams} params */
  constructor({ nodes = new Map(), edges = new Map() } = {}) {
    this.#nodes = nodes;
    this.#edges = edges;

    this.#nodesCount = this.#nodes.size;
    this.#edgesCount = 0;
  }

  /**
   * @param {number|string} nodeId
   * @param {unknown} value
   */
  addNode(nodeId, value) {
    if (this.hasNode(nodeId)) {
      throw new Error('Node already exists');
    }

    const node = new Node({ id: nodeId, value });
    this.#nodes.set(nodeId, node);

    this.#nodesCount++;

    return node;
  }

  /**
   * @param {number|string} nodeId
   */
  getNode(nodeId) {
    return this.#nodes.get(nodeId);
  }

  getAllNodes() {
    return this.#nodes;
  }

  /**
   * @param {number|string} nodeId
   */
  hasNode(nodeId) {
    return this.#nodes.has(nodeId);
  }

  getNodesCount() {
    return this.#nodesCount;
  }

  /**
   * @param {number|string} nodeId
   * @param {Node} value
   */
  setNode(nodeId, value) {
    this.#nodes.set(nodeId, value);
  }

  /**
   * @param {Map<number|string, Node>} nodes
   */
  setAllNodes(nodes) {
    this.#nodes = nodes;
  }


  /**
   * @param {number|string} sourceNodeId
   * @param {number|string} targetNodeId
   * @param {unknown} value
   * @param {boolean} undirected
   */
  addEdge(sourceNodeId, targetNodeId, value, undirected = false) {
    if (!this.hasNode(sourceNodeId)) {
      throw new Error('sourceNode is not exists');
    }
    if (!this.hasNode(targetNodeId)) {
      throw new Error('targetNode is not exists');
    }

    this.setEdge(sourceNodeId, targetNodeId, new Edge({ value }));
    this.#edgesCount++;

    if (undirected) {
      this.setEdge(targetNodeId, sourceNodeId, new Edge({ value }));
      this.#edgesCount++;
      return [this.getEdge(sourceNodeId, targetNodeId), this.getEdge(targetNodeId, sourceNodeId)];
    }

    return [this.getEdge(sourceNodeId, targetNodeId)];
  }

  /**
   * @param {number|string} sourceNodeId
   * @param {number|string} targetNodeId
   */
  getEdge(sourceNodeId, targetNodeId) {
    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return;
    }

    return sourceEdges.get(targetNodeId);
  }

  /**
   * @param {number|string} nodeId
   */
  getEdges(nodeId) {
    return this.#edges.get(nodeId);
  }

  getAllEdges() {
    return this.#edges;
  }

  /**
   * @param {number|string} sourceNodeId
   * @param {number|string} targetNodeId
   */
  hasEdge(sourceNodeId, targetNodeId) {
    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return false;
    }

    return sourceEdges.has(targetNodeId);
  }

  /**
   * @param {number|string} nodeId
   */
  hasEdges(nodeId) {
    return this.#edges.has(nodeId);
  }

  getEdgesCount() {
    return this.#edgesCount;
  }

  /**
   * @param {number|string} sourceNodeId
   * @param {number|string} targetNodeId
   * @param {Edge} edge
   */
  setEdge(sourceNodeId, targetNodeId, edge) {
    if (!this.hasEdges(sourceNodeId)) {
      this.setEdges(sourceNodeId, new Map());
    }

    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return false;
    }

    sourceEdges.set(targetNodeId, edge);
  }

  /**
   * @param {number|string} nodeId
   * @param {Map<number|string, Edge>} edges
   */
  setEdges(nodeId, edges) {
    if (this.hasEdges(nodeId)) {
      const edgesOld = this.getEdges(nodeId);
      if (edgesOld != null) {
        this.#edgesCount -= edgesOld.size;
      }
    }

    this.#edges.set(nodeId, edges);
    this.#edgesCount += edges.size;
  }

  /**
   * @param {Edges} edges
   */
  setAllEdges(edges) {
    this.#edges = edges;
  }

  /**
   * @param {number|string} sourceNodeId
   * @param {number|string} targetNodeId
   */
  removeEdge(sourceNodeId, targetNodeId) {
    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return false;
    }

    sourceEdges.delete(targetNodeId);

    this.#edgesCount--;

    return true;
  }

  /**
   * @param {number|string} nodeId
   */
  removeEdges(nodeId) {
    const edges = this.getEdges(nodeId);
    if (edges == null) {
      return false;
    }

    this.#edgesCount -= edges.size;

    edges.clear();

    return true;
  }

  clear() {
    this.#nodes.clear();
    this.#edges.clear();
    this.#edgesCount = 0;
  }
}