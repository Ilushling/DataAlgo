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

    if (balanceFactor > 1) {
      const left = node.getLeft();

      // Left is bigger - Left Left (LL)
      if (left != null && this.getBalanceFactor(left) < 0) {
        // Right of Left is bigger - Left Right (LR)
        node = this.#rotateLeft(left);
      }

      return this.#rotateRight(node);
    }

    if (balanceFactor < -1) {
      const right = node.getRight();

      // Right is bigger - Right Right (RR)
      if (right != null && this.getBalanceFactor(right) > 0) {
        // Left of Right is bigger - Right Left (RL)
        node = this.#rotateRight(right);
      }

      return this.#rotateLeft(node);
    }

    return node;
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
   * @param {BinarySearchTreeNode} node
   */
  #rotateLeft(/* Z */ node) {
    const right = node.getRight(); // Y
    if (right == null) {
      return node;
    }

    const rightLeft = right.getLeft(); // T2
    if (rightLeft == null) {
      return node;
    }

    node.setRight(rightLeft); // Y (right) replace with T2 (rightLeft)
    right.setLeft(node); // T2 (rightLeft) replace with Z

    // Z replace with Y (right)
    let parentNode = node.getParent();
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

      right.setParent(parentNode); // Z parent will be parent of Y
    }

    node.setParent(right); // Y will be parent of Z

    rightLeft.setParent(node); // Z will be parent of T2

    this.#updateHeight(node); // Z now is left
    this.#updateHeight(right); // Y now is root

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
   * @param {BinarySearchTreeNode} node
   */
  #rotateRight(/* Z */ node) {
    const left = node.getLeft(); // Y
    if (left == null) {
      return node;
    }

    const leftRight = left.getRight(); // T3
    if (leftRight == null) {
      return node;
    }

    node.setLeft(leftRight); // Y (left) replace with T3 (leftRight)
    left.setRight(node); // T3 (leftRight) replace with Z

    // Z replace with Y (left)
    let parentNode = node.getParent();
    if (parentNode == null) {
      this.#tree.setRoot(left);
      left.clearParent();
    } else {
      if (left.getKey() < parentNode.getKey()) {
        parentNode.setLeft(left);
      } else {
        parentNode.setRight(left);
      }
      left.setParent(parentNode); // Z parent will be parent of Y
    }

    node.setParent(left); // Y will be parent of Z

    leftRight.setParent(node); // Z will be parent of T3

    this.#updateHeight(node); // Z now is right
    this.#updateHeight(left); // Y now is root

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

    // let currentNode = min.getParent();
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

    // let currentNode = max.getParent();
    // while (currentNode != null) {
    //     this.balance(currentNode);

    //     currentNode = currentNode.getParent();
    // }

    // return max;
  }
}