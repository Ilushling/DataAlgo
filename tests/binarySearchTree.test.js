import assert from 'node:assert';
import { describe, it } from 'node:test';

import BinarySearchTree from '../src/Trees/BinarySearchTree.js';

function createTree() {
  return new BinarySearchTree();
}

describe('Binary search tree', () => {
  it('First insert', () => {
    const tree = createTree();

    assert.strictEqual(tree.getRoot(), undefined);

    tree.insert(9);

    assert.strictEqual(tree.getRoot()?.getKey(), 9);
  });

  it('First insert and remove', () => {
    const tree = createTree();

    assert.strictEqual(tree.getRoot(), undefined);

    tree.insert(9);

    assert.strictEqual(tree.getRoot()?.getKey(), 9);

    tree.remove(9);

    assert.strictEqual(tree.getRoot(), undefined);
  });

  it('Complex 1', async () => {
    const tree = createTree();

    tree.insert(9);
    tree.insert(3);
    tree.insert(10);
    tree.insert(1);
    tree.insert(6);
    tree.insert(14);
    tree.insert(4);
    tree.insert(7);
    tree.insert(8);
    tree.insert(13);
    tree.insert(5);
    /*
           9
         /   \
        3     10
       / \     \
      1   6     14
         / \    /
        4   7  13
         \   \
          5   8
    */

    await it('size', () => {
      assert.strictEqual(tree.getSize(), 11);
    });

    await it('min', () => {
      const min = tree.getMin();

      assert.strictEqual(min?.getKey(), 1);
    });

    await it('max', () => {
      const max = tree.getMax();

      assert.strictEqual(max?.getKey(), 14);
    });

    await it('13', () => {
      const node13 = tree.find(13);

      assert.strictEqual(node13?.getKey(), 13);
      assert.strictEqual(node13?.getLeft(), undefined);
      assert.strictEqual(node13?.getRight(), undefined);
    });
  });

  // const tree = createTree();

  // // Remove node with no childrens
  // tree.remove(1);
  // if (tree.find(3)?.getLeft() != null) {
  //   throw new Error('Error remove with no childrens');
  // }
  // // throw new Error('stop');

  // // Remove node with left chilren (left 13)
  // tree.remove(14);
  // if (tree.find(10)?.getRight()?.getKey() !== 13) {
  //   throw new Error('Error remove with left children');
  // }

  // // Remove node with right chilren (right 5)
  // tree.remove(4);
  // if (tree.find(6)?.getLeft()?.getKey() !== 5) {
  //   throw new Error('Error remove with right children');
  // }

  // // Remove node with 2 childrens (left 5 and right 7)
  // /*
  //      9               9
  //    /   \           /   \
  //   3     10        3     10  
  //    \     \         \     \
  //     6     13  ->    7     13
  //    / \             / \
  //   5   7           5   8
  //        \
  //         8
  // */
  // tree.remove(6);
  // if (tree.find(7)?.getLeft()?.getKey() !== 5) {
  //   throw new Error('Error remove with right children');
  // }

  // if (tree.getMin()?.getKey() !== 3) {
  //   throw new Error('Error min');
  // }

  // if (tree.getMax()?.getKey() !== 13) {
  //   throw new Error('Error max');
  // }

  // if (tree.getSize() !== 7) {
  //   throw new Error('Error size');
  // }
});
