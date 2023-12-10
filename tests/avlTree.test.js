import assert from 'node:assert';
import { describe, it } from 'node:test';

import AvlTree from '../src/Trees/AvlTree.js';
import BinarySearchTree from '../src/Trees/BinarySearchTree.js';

function createAvlTree() {
  const tree = new BinarySearchTree();

  return new AvlTree({ tree });
}

describe('Avl tree', () => {
  it('First insert', () => {
    const tree = createAvlTree();

    assert.strictEqual(tree.getRoot(), undefined);

    tree.insert(9);

    assert.strictEqual(tree.getRoot()?.getKey(), 9);
  });

  it('First insert and remove', () => {
    const tree = createAvlTree();

    assert.strictEqual(tree.getRoot(), undefined);

    tree.insert(9);

    assert.strictEqual(tree.getRoot()?.getKey(), 9);

    tree.remove(9);

    assert.strictEqual(tree.getRoot(), undefined);
  });

  it('First insert and find', () => {
    const tree = createAvlTree();

    tree.insert(9);

    const node9 = tree.find(9);
    assert.notStrictEqual(node9, undefined);
    assert.strictEqual(node9?.getKey(), 9);
  });


  it('RL', async () => {
    const tree = createAvlTree();

    tree.insert(1);
    tree.insert(3);
    tree.insert(2);

    assert.strictEqual(tree.getRoot()?.getKey(), 2);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getKey(), 1);
    assert.strictEqual(tree.getRoot()?.getRight()?.getKey(), 3);
  });

  it('LR', async () => {
    const tree = createAvlTree();

    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    assert.strictEqual(tree.getRoot()?.getKey(), 2);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getKey(), 1);
    assert.strictEqual(tree.getRoot()?.getRight()?.getKey(), 3);
  });


  it('Complex 1', () => {
    const tree = createAvlTree();

    tree.insert(9);
    tree.insert(3);
    tree.insert(10);
    tree.insert(1);
    tree.insert(6);
    tree.insert(14);
    /*
          9
         / \
        3   10
       / \    \
      1   6    14
    */
    tree.insert(4);
    /*
          9
         / \
        3   10
       / \   \
      1   6   14
         /
        4
    */
    tree.insert(7);
    /*
          9
         / \
        3   10  
       / \   \
      1   6   14
         / \
        4   7
    */
    tree.insert(8);
    /*
          9               9
         / \             / \
        3   10          6   10
       / \   \    ->   / \   \
      1   6   14      3   7   14
         / \         / \   \
        4   7       1   4   8
             \
              8
    */
    assert.strictEqual(tree.getRoot()?.getKey(), 9);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getKey(), 6);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getLeft()?.getKey(), 3);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getLeft()?.getLeft()?.getKey(), 1);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getLeft()?.getRight()?.getKey(), 4);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getRight()?.getKey(), 7);
    assert.strictEqual(tree.getRoot()?.getLeft()?.getRight()?.getRight()?.getKey(), 8);

    tree.insert(13);
    /*
              9                     9
           /     \               /     \
          6       10            6       13
         / \       \    ->     / \     /  \
        3   7       14        3   7   10   14
       / \   \     /         / \   \
      1   4   8   13        1   4   8
    */

    assert.strictEqual(tree.getRoot()?.getKey(), 9);
    assert.strictEqual(tree.getRoot()?.getRight()?.getKey(), 13);
    assert.strictEqual(tree.getRoot()?.getRight()?.getLeft()?.getKey(), 10);
    assert.strictEqual(tree.getRoot()?.getRight()?.getRight()?.getKey(), 14);
  });

  describe('Complex 2', () => {
    const tree = createAvlTree();

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
             6
         /        \
        3          9
       / \      /     \
      1   4    7      13
           \    \    /  \
            5    8  10   14
    */

    it('size', () => {
      assert.strictEqual(tree.getSize(), 11);
    });

    it('min', () => {
      const min = tree.getMin();

      assert.strictEqual(min?.getKey(), 1);
    });

    it('max', () => {
      const max = tree.getMax();

      assert.strictEqual(max?.getKey(), 14);
    });

    it('13', () => {
      const node13 = tree.find(13);

      assert.strictEqual(tree.getRoot()?.getKey(), 6);
      assert.strictEqual(tree.getRoot()?.getRight()?.getKey(), 9);
      assert.strictEqual(tree.getRoot()?.getRight()?.getRight()?.getKey(), 13);

      assert.strictEqual(node13?.getKey(), 13);
      assert.strictEqual(node13.getLeft()?.getKey(), 10);
      assert.strictEqual(node13.getRight()?.getKey(), 14);
    });

    const node3 = tree.find(3);
    it('3', () => {
      assert.strictEqual(node3?.getKey(), 3);
      assert.strictEqual(node3.getLeft()?.getKey(), 1);
    });

    it('4', () => {
      const node4 = node3?.getRight();

      assert.strictEqual(node4?.getKey(), 4);
      assert.strictEqual(node4.getRight()?.getKey(), 5);
    });
  });

  // const tree = createAvlTree();

  // tree.insert(3);
  // tree.insert(2);
  // tree.insert(1);
  // /*
  //   Left Left (LL)
  //       3        2  
  //      /        / \ 
  //     2    ->  1   3
  //    /              
  //   1               
  // */

  // tree.clear();
  // tree.insert(1);
  // tree.insert(2);
  // tree.insert(3);
  // /*
  //   Right Right (RR)
  //   1            2  
  //    \          / \ 
  //     2    ->  1   3
  //      \            
  //       3           
  // */

  // tree.clear();
  // tree.insert(5);
  // tree.insert(3);
  // tree.insert(6);
  // tree.insert(2);
  // tree.insert(4);
  // tree.insert(1);

  // /*
  //   Left Left (LL)
  //         5            3    
  //        / \          / \   
  //       3   6        2   5  
  //      / \     ->   /   / \ 
  //     2   4        1   4   6
  //    /                      
  //   1                       
  // */

  // tree.clear();
  // tree.insert(5);
  // tree.insert(1);
  // tree.insert(6);
  // tree.insert(2);
  // tree.insert(3);
  // /*
  //   Left Right (LR)
  //     5            5  
  //    / \          / \ 
  //   1   6        2   6
  //    \     ->   / \   
  //     2        1   3  
  //      \              
  //       3             
  // */
  // tree.insert(4);
  // /*
  //   Left Right (LR)
  //       5            3    
  //      / \          / \   
  //     2   6  ->    2   5  
  //    / \          /   / \ 
  //   1   3        1   4   6
  //        \                
  //         4               
  // */

  // tree.clear();
  // tree.insert(2);
  // tree.insert(1);
  // tree.insert(5);
  // tree.insert(4);
  // tree.insert(6);
  // tree.insert(3);
  // /*
  //   Right Left (RL)
  //     2              4    
  //    / \            / \   
  //   1   5          2   5  
  //      / \   ->   / \   \ 
  //     4   6      1   3   6
  //    /                    
  //   3                     
  // */

  // tree.clear();
  // tree.insert(2);
  // tree.insert(1);
  // tree.insert(4);
  // tree.insert(3);
  // tree.insert(5);
  // tree.insert(6);
  // /*
  //   Right Right (RR)
  //     2                4    
  //    / \              / \   
  //   1   4            2   5  
  //      / \     ->   / \   \ 
  //     3   5        1   3   6
  //          \                
  //           6               
  // */
});
