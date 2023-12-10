import Node from './Node.js';
import Edge from './Edge.js';

/**
 * @typedef {number|string} Id
 */

/**
 * @typedef {Map<Id, Node>} Nodes
 */

/**
 * @typedef {Map<Id, Edge>} Edges
 * @typedef {Map<Id, Edges>} NodeEdges
 */

/**
 * @typedef {object} GraphProperties
 * @property {Nodes=} nodes
 * @property {NodeEdges=} edges
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
   * @param {Id} nodeId
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
   * @param {Id} nodeId
   */
  getNode(nodeId) {
    return this.#nodes.get(nodeId);
  }

  getAllNodes() {
    return this.#nodes;
  }

  /**
   * @param {Id} nodeId
   */
  hasNode(nodeId) {
    return this.#nodes.has(nodeId);
  }

  getNodesCount() {
    return this.#nodesCount;
  }

  /**
   * @param {Id} nodeId
   * @param {Node} value
   */
  setNode(nodeId, value) {
    this.#nodes.set(nodeId, value);
  }

  /**
   * @param {Nodes} nodes
   */
  setAllNodes(nodes) {
    this.#nodes = nodes;
  }


  /**
   * @param {Id} sourceNodeId
   * @param {Id} targetNodeId
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
   * @param {Id} sourceNodeId
   * @param {Id} targetNodeId
   */
  getEdge(sourceNodeId, targetNodeId) {
    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return;
    }

    return sourceEdges.get(targetNodeId);
  }

  /**
   * @param {Id} nodeId
   */
  getEdges(nodeId) {
    return this.#edges.get(nodeId);
  }

  getAllEdges() {
    return this.#edges;
  }

  /**
   * @param {Id} sourceNodeId
   * @param {Id} targetNodeId
   */
  hasEdge(sourceNodeId, targetNodeId) {
    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return false;
    }

    return sourceEdges.has(targetNodeId);
  }

  /**
   * @param {Id} nodeId
   */
  hasEdges(nodeId) {
    return this.#edges.has(nodeId);
  }

  getEdgesCount() {
    return this.#edgesCount;
  }

  /**
   * @param {Id} sourceNodeId
   * @param {Id} targetNodeId
   * @param {Edge} edge
   */
  setEdge(sourceNodeId, targetNodeId, edge) {
    if (!this.hasEdges(sourceNodeId)) {
      this.setEdges(sourceNodeId, new Map());
    }

    const sourceEdges = this.getEdges(sourceNodeId);
    if (sourceEdges == null) {
      return;
    }

    sourceEdges.set(targetNodeId, edge);
  }

  /**
   * @param {Id} nodeId
   * @param {Edges} edges
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
   * @param {NodeEdges} edges
   */
  setAllEdges(edges) {
    this.#edges = edges;
  }

  /**
   * @param {Id} sourceNodeId
   * @param {Id} targetNodeId
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
   * @param {Id} nodeId
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