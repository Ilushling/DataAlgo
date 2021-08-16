import { Graph } from '../src/Graph.js';

const graph = new Graph();

const node1 = graph.addNode(1, 1);
const node2 = graph.addNode(2, 2);
const node3 = graph.addNode(3, 3);

if (!node1 || !node2 || !node3) {
    throw new Error('Error addNode');
}

if (!graph.hasNode(1) || !graph.hasNode(2) || !graph.hasNode(3)) {
    throw new Error('Error hasNode');
}

if (!graph.getNode(1) || !graph.getNode(2) || !graph.getNode(3)) {
    throw new Error('Error getNode');
}

const node1Edges = graph.addEdge(1, 2, 1);
const node2Edges = graph.addEdge(2, 3, 2);
const node3Edges = graph.addEdge(3, 2, 3, true);

if (!node1Edges || !node2Edges || !node3Edges) {
    throw new Error('Error addEdge');
}

if (!graph.hasEdge(1, 2) || !graph.hasEdge(2, 3)) {
    throw new Error('Error hasEdge');
}

if (!graph.getEdges(1) || !graph.getEdges(2) || !graph.getEdges(3)) {
    throw new Error('Error getEdges');
}

if (!graph.getEdge(1, 2) || !graph.getEdge(2, 3)) {
    throw new Error('Error getEdge');
}

if (!graph.hasEdge(3, 2)) {
    throw new Error('Error addEdge undirected');
}

if (graph.setNode(1, 2) && graph.getNode(1).value !== 2) {
    throw new Error('Error setNode');
}

if (!graph.removeEdge(1, 2)) {
    throw new Error('Error removeEdge');
}

if (!graph.removeEdges(2)) {
    throw new Error('Error removeEdge');
}

console.log('Tests done');