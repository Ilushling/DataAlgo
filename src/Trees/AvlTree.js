/**
 * @typedef {import('./BinarySearchTree.js').default} BinarySearchTree
 * @typedef {import('./BinarySearchTreeNode.js').default} BinarySearchTreeNode
 */

/**
 * @typedef {object} AvlTreeParams
 * @property {BinarySearchTree} tree
 */
export default class AvlTree {
  #tree;

  /** @param {AvlTreeParams} params */
  constructor({
    tree
  }) {
    this.#tree = tree;
  }

  getRoot() {
    return this.#tree.getRoot();
  }

  getSize() {
    return this.#tree.getSize();
  }

  /**
   * @param {number} key
   * @param {BinarySearchTreeNode=} current
   */
  find(key, current = this.getRoot()) {
    return this.#tree.find(key, current);
  }

  getMin() {
    return this.#tree.getMin();
  }

  getMax() {
    return this.#tree.getMax();
  }

  clear() {
    return this.#tree.clear();
  }


  /**
   * Balance node
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    this.#updateHeight(node);

    const balanceFactor = this.getBalanceFactor(node);

    let newRoot = node;

    if (balanceFactor > 1) {
      const left = node.getLeft();

      if (left != null) {
        const leftBalanceFactor = this.getBalanceFactor(left);

        // Left is bigger - Left Left (LL)
        if (leftBalanceFactor < 0) {
          // Right of Left is bigger - Left Right (LR)
          newRoot = this.#rotateLeft(left);

          /*
                3           3
               /           /
              1     ->    2
               \         /
                2       1
          */
        }
      }

      newRoot = this.#rotateRight(node);

      /*
            3        2
           /        / \
          1    ->  1   3
           \
            2
      */

      return newRoot;
    }

    if (balanceFactor < -1) {
      const right = node.getRight();

      if (right != null) {
        const rightBalanceFactor = this.getBalanceFactor(right);

        // Right is bigger - Right Right (RR)
        if (rightBalanceFactor > 0) {
          // Left of Right is bigger - Right Left (RL)
          newRoot = this.#rotateRight(right);

          /*
              1        1
               \        \
                3  ->    2
               /          \
              2            3
          */
        }
      }

      newRoot = this.#rotateLeft(node);

      /*
          1             2
           \          /   \
            2    ->  1     3
             \
              3
      */

      return newRoot;
    }

    return newRoot;
  }

  /**
   * Update node height, in case left subtree height and right subtree height is correct
   * @param {BinarySearchTreeNode} node
   */
  #updateHeight(node) {
    const left = node.getLeft();
    const right = node.getRight();

    const leftHeight = left?.getHeight() ?? 0;
    const rightHeight = right?.getHeight() ?? 0;

    const height = ((leftHeight > rightHeight) ? leftHeight : rightHeight) + 1;

    node.setHeight(height);
  }

  /**
   * Get node balance factor
   * @param {BinarySearchTreeNode} node
   */
  getBalanceFactor(node) {
    const left = node.getLeft();
    const right = node.getRight();

    const leftHeight = left?.getHeight() ?? 0;
    const rightHeight = right?.getHeight() ?? 0;

    return leftHeight - rightHeight;
  }

  /*
    Right Right (RR)
          Z                 Y
         / \              /   \
        T1  Y            Z     X
           / \     ->   / \   / \
          T2  X        T1 T2 T3 T4
             / \
            T3 T4

    Z - node moves to Y.left (T2)
    Y - right moves to root (Z)
    T2 - left of right (Y) moves to right (Y)
  */
  /**
   * @param {BinarySearchTreeNode} node - Z
   */
  #rotateLeft(node) {
    // Y
    const right = node.getRight();
    if (right == null) {
      return node;
    }

    // T2
    const rightLeft = right.getLeft();
    if (rightLeft == null) {
      node.clearRight();
    } else {
      // Y (right) replace with T2 (rightLeft)
      node.setRight(rightLeft);
      // Z will be parent of T2
      rightLeft.setParent(node);
    }

    // T2 (rightLeft) replace with Z
    right.setLeft(node);

    // Z replace with Y (right)
    const parentNode = node.getParent();
    if (parentNode == null) {
      this.#tree.setRoot(right);
      right.clearParent();
    } else {
      const rightKey = right.getKey();
      const parentKey = parentNode.getKey();

      if (rightKey < parentKey) {
        parentNode.setLeft(right);
      } else {
        parentNode.setRight(right);
      }

      // Z parent will be parent of Y
      right.setParent(parentNode);
    }

    // Y will be parent of Z
    node.setParent(right);

    // Z now is left
    this.#updateHeight(node);
    // Y now is root
    this.#updateHeight(right);

    return right;
  }

  /*
      Left Left (LL)
            Z               Y
           / \            /   \
          Y  T4          X     Z
         / \     ->     / \   / \
        X   T3         T1 T2 T3 T4
       / \
      T1  T2

      Z - node moves to Y.right (T3)
      Y - right moves to root (Z)
      T3 - right of left (Y) moves to left (Y)
  */
  /**
   * @param {BinarySearchTreeNode} node - Z
   */
  #rotateRight(node) {
    // Y
    const left = node.getLeft();
    if (left == null) {
      return node;
    }

    // T3
    const leftRight = left.getRight();
    if (leftRight == null) {
      node.clearLeft();
    } else {
      // Y (left) replace with T3 (leftRight)
      node.setLeft(leftRight);
      // Z will be parent of T3
      leftRight.setParent(node);
    }

    // T3 (leftRight) replace with Z
    left.setRight(node);

    // Z replace with Y (left)
    const parentNode = node.getParent();
    if (parentNode == null) {
      this.#tree.setRoot(left);
      left.clearParent();
    } else {
      const leftKey = left.getKey();
      const parentKey = parentNode.getKey();

      if (leftKey < parentKey) {
        parentNode.setLeft(left);
      } else {
        parentNode.setRight(left);
      }

      // Z parent will be parent of Y
      left.setParent(parentNode);
    }

    // Y will be parent of Z
    node.setParent(left);

    // Z now is right
    this.#updateHeight(node);
    // Y now is root
    this.#updateHeight(left);

    return left;
  }

  /**
   * @param {number} key
   * @param {unknown=} value
   * @param {BinarySearchTreeNode=} currentNode
   */
  insert(key, value, currentNode) {
    const newNode = this.#tree.insert(key, value, currentNode);

    currentNode = newNode;

    currentNode.setHeight(1);
    currentNode = currentNode.getParent();

    while (currentNode != null) {
      this.balance(currentNode);

      currentNode = currentNode.getParent();
    }

    return newNode;
  }

  /**
   * @param {number} key
   * @param {BinarySearchTreeNode=} currentNode
   */
  remove(key, currentNode) {
    const removedNode = this.#tree.remove(key, currentNode);

    if (removedNode == null) {
      return;
    }

    currentNode = removedNode.getParent();

    while (currentNode != null) {
      this.balance(currentNode);

      currentNode = currentNode.getParent();
    }

    return removedNode;
  }

  /**
   * @param {BinarySearchTreeNode=} currentNode
   */
  removeMin(currentNode) {
    const min = this.#tree.removeMin(currentNode);

    return min;

    // if (min == null) {
    //     return;
    // }

    // currentNode = min.getParent();
    // while (currentNode != null) {
    //     this.balance(currentNode);

    //     currentNode = currentNode.getParent();
    // }

    // return min;
  }

  /**
   * @param {BinarySearchTreeNode=} currentNode
   */
  removeMax(currentNode) {
    const max = this.#tree.removeMax(currentNode);

    return max;

    // if (max == null) {
    //     return;
    // }

    // currentNode = max.getParent();
    // while (currentNode != null) {
    //     this.balance(currentNode);

    //     currentNode = currentNode.getParent();
    // }

    // return max;
  }
}
