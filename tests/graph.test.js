
import assert from 'node:assert';
import { describe, it } from 'node:test';

import Graph from '../src/Graph.js';
import Node from '../src/Node.js';

function createGraph() {
  return new Graph();
}

describe('Graph', () => {
  describe('Node', () => {
    it('Add', () => {
      const graph = createGraph();

      const node1 = graph.addNode(1, 1);

      assert.ok(node1);
    });

    it('Has', () => {
      const graph = createGraph();

      graph.addNode(1, 1);

      assert.ok(graph.hasNode(1));
    });

    it('Get', () => {
      const graph = createGraph();

      graph.addNode(1, 1);

      assert.strictEqual(graph.getNode(1)?.getId(), 1);
    });

    it('Set', () => {
      const graph = createGraph();

      const node = new Node({ id: 1, value: 1 });
      graph.setNode(1, node);

      assert.ok(graph.hasNode(1));
    });
  });

  describe('Edge', () => {
    describe('Add', () => {
      it('Directed', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);

        const edge1 = graph.addEdge(1, 2, 1);
        const edge2 = graph.addEdge(2, 1, 2);

        assert.strictEqual(edge1[0]?.getValue(), 1);
        assert.strictEqual(edge2[0]?.getValue(), 2);
      });

      it('Undirected', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);

        const edges = graph.addEdge(1, 2, 1, true);

        assert.strictEqual(edges[0]?.getValue(), 1);
        assert.strictEqual(edges[1]?.getValue(), 1);
      });
    });

    it('Has', () => {
      const graph = createGraph();

      graph.addNode(1, 1);
      graph.addNode(2, 2);

      graph.addEdge(1, 2, 1);
      graph.addEdge(2, 1, 2);

      assert.ok(graph.hasEdge(1, 2));
      assert.ok(graph.hasEdge(2, 1));
    });

    describe('Get', () => {
      it('Edge', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);

        graph.addEdge(1, 2, 1);
        graph.addEdge(2, 1, 2);

        assert.strictEqual(graph.getEdge(1, 2)?.getValue(), 1);
        assert.strictEqual(graph.getEdge(2, 1)?.getValue(), 2);
      });

      it('Edges', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);
        graph.addNode(3, 3);

        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 2);
        graph.addEdge(2, 1, 3);

        const edges = graph.getEdges(1);
        const edge1 = edges?.get(2);
        const edge2 = edges?.get(3);

        assert.strictEqual(edge1?.getValue(), 1);
        assert.strictEqual(edge2?.getValue(), 2);
      });
    });

    describe('Remove', () => {
      it('Edge', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);

        graph.addEdge(1, 2, 1);
        graph.addEdge(2, 1, 2);

        const isRemoved = graph.removeEdge(1, 2);

        assert.ok(isRemoved);

        assert.ok(!graph.hasEdge(1, 2));
        assert.ok(graph.hasEdge(2, 1));
      });

      it('Edges', () => {
        const graph = createGraph();

        graph.addNode(1, 1);
        graph.addNode(2, 2);
        graph.addNode(3, 3);

        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 2);
        graph.addEdge(2, 1, 3);

        const isRemoved = graph.removeEdges(1);

        assert.ok(isRemoved);

        assert.ok(!graph.hasEdge(1, 2));
        assert.ok(!graph.hasEdge(1, 3));
        assert.ok(graph.hasEdge(2, 1));
      });
    });
  });
});
