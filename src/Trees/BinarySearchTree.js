import BinarySearchTreeNode from './BinarySearchTreeNode.js';

/**
 * @typedef {object} BinarySearchTreeProperties
 * @property {BinarySearchTreeNode=} root
 * @property {number=} size
 * 
 * @typedef {BinarySearchTreeProperties} BinarySearchTreeParams
 */
export default class BinarySearchTree {
  #root;
  #size;

  /** @param {BinarySearchTreeParams} params */
  constructor({
    root,
    size = 0
  } = {}) {
    this.#root = root;
    this.#size = size;
  }

  getRoot() {
    return this.#root;
  }

  /**
   * @param {BinarySearchTreeNode} node
   */
  setRoot(node) {
    this.#root = node;
  }

  #clearRoot() {
    this.#root = undefined;
  }


  getSize() {
    return this.#size;
  }

  #incrementSize() {
    this.#size++;
  }

  #decrementSize() {
    this.#size--;
  }

  #clearSize() {
    this.#size = 0;
  }


  /**
   * @param {number} key
   * @param {unknown=} value
   * @param {BinarySearchTreeNode=} current
   */
  insert(key, value, current = this.getRoot()) {
    if (current == null) {
      /*
        (X)
      */

      const newNode = new BinarySearchTreeNode({ key, value });

      this.#incrementSize();

      this.setRoot(newNode);

      return newNode;
    }

    const newNode = new BinarySearchTreeNode({ key, value });

    this.#incrementSize();

    let parent = undefined;

    // Without function recursive calls for better perfomance
    while (current != null) {
      const currentKey = current.getKey();

      if (key < currentKey) {
        const left = current.getLeft();

        if (left == null) {
          /*
               A
              /
            (X)
          */
          current.setLeft(newNode);

          newNode.setParent(current);

          break;
        }

        parent = current;
        current = left;
      } else if (key > currentKey) {
        const right = current.getRight();

        if (right == null) {
          /*
            A
             \
             (X)
          */
          current.setRight(newNode);

          newNode.setParent(current);

          break;
        }

        parent = current;
        current = right;
      } else {
        // key === currentKey

        /*
          3 ways to handle duplication key:
          1) Ignore insert
          2) (only for keys, without values) add counter to node of duplications
          3) Add siblings to node by LinkedList
        */

        // 2 way - Increment duplicate counter
        current.incrementCount();

        // 3 way - Add duplicate sibling
        /*
          (X) - A
        */
        const siblings = current.getSiblings();

        siblings.append(newNode);

        if (parent != null) {
          newNode.setParent(parent);
        }

        break;
      }
    }

    newNode.setParent(current);

    return newNode;
  }

  /**
   * @param {BinarySearchTreeNode=} current
   */
  getMin(current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let left = current.getLeft();

    /*
            A
          /
        ...
        /
      (X)
    */
    while (left != null) {
      current = left;

      left = current.getLeft();
    }

    const min = current;

    return min;
  }

  /**
   * @param {BinarySearchTreeNode=} current
   */
  removeMin(current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let parent = current;

    let left = current.getLeft();

    while (left != null) {
      parent = current;

      current = left;

      left = current.getLeft();
    }

    const currentKey = current.getKey();

    return this.remove(currentKey, parent);
  }

  /**
   * @param {BinarySearchTreeNode=} current
   */
  getMax(current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let right = current.getRight();

    /*
      A
        \
        ...
          \
          (X)
    */
    while (right != null) {
      current = right;

      right = current.getRight();
    }

    const max = current;

    return max;
  }

  /**
   * @param {BinarySearchTreeNode=} current
   */
  removeMax(current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let parent = current;
    let right = current.getRight();

    while (right != null) {
      parent = current;

      current = right;

      right = current.getRight();
    }

    const currentKey = current.getKey();

    return this.remove(currentKey, parent);
  }

  /**
   * @param {number} key
   */
  contains(key) {
    return !!this.find(key);
  }

  /**
   * @param {number} key
   * @param {BinarySearchTreeNode=} current
   */
  find(key, current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let currentKey = current.getKey();

    while (currentKey !== key) {
      if (key < currentKey) {
        current = current.getLeft();
      } else {
        current = current.getRight();
      }

      if (current == null) {
        break;
      }

      currentKey = current.getKey();
    }

    return current;
  }

  /**
   * @param {number} key
   * @param {BinarySearchTreeNode=} current
   */
  remove(key, current = this.getRoot()) {
    if (current == null) {
      return;
    }

    let parent = undefined;
    let removed = undefined;

    // Without function recursive calls for better perfomance
    while (current != null) {
      const currentKey = current.getKey();

      const left = current.getLeft();
      const right = current.getRight();

      if (key < currentKey) {
        parent = current;
        current = left;
      } else if (key > currentKey) {
        parent = current;
        current = right;
      } else {
        // key === currentKey
        if (parent == null) {
          // key is root
          /*
            (X)
          */

          removed = this.getRoot();

          this.#clearRoot();

          break;
        }

        const parentKey = parent.getKey();

        const currentDuplicationCount = current.getCount();

        if (currentDuplicationCount > 0) {
          // current key have duplications
          /*
            (X) - A
          */
          // Decrement duplicate counter
          current.decrementCount();

          const siblings = current.getSiblings();

          const siblingNode = siblings.removeHead();

          removed = /** @type {BinarySearchTreeNode} */ (siblingNode?.getValue());
          break;
        }

        removed = current;

        if (left == null && right == null) {
          // No childrens - leaf
          /*
                A
              /   \
            (X) or (X)
          */

          // Delete current in parent
          if (currentKey < parentKey) {
            parent.clearLeft();
            break;
          }

          parent.clearRight();

          break;
        }

        if (left == null && right != null) {
          // No left children and right children exists
          // Replace current with right in parent
          if (currentKey < parentKey) {
            parent.setLeft(right);
          } else {
            parent.setRight(right);
          }

          // Update right parent
          right.setParent(parent);

          break;
        }

        if (left != null && right == null) {
          // Left children exists and no right children
          // Replace current with left in parent
          if (currentKey < parentKey) {
            parent.setLeft(left);
          } else {
            parent.setRight(left);
          }

          // Update left parent
          left.setParent(parent);

          break;
        }

        if (left != null && right != null) {
          /* 2 childrens - Find heir for replace current */
          let heirParent = current;

          // 1 step - Get right
          /*
            A
            \
            (X)
          */
          let heir = right;
          let leftHeir = heir.getLeft();

          // further step - Get left end
          /*
              A
                \
                B
                /
              ...
              /
            (X)
          */
          while (leftHeir != null) {
            heirParent = heir;
            heir = leftHeir;
            leftHeir = heir.getLeft();
          }

          const heirKey = heir.getKey();

          if (heirKey < parentKey) {
            parent.setLeft(heir);
          } else {
            parent.setRight(heir);
          }

          // Update heir parent
          heir.setParent(parent);

          // Move current.left to heir.left
          heir.setLeft(left);
          // Update left parent
          left.setParent(heir);

          const heirRight = heir.getRight();

          if (heirRight == null) {
            // heir has no children (leaf) - Delete heir in heirParent
            heirParent.clearRight();
            break;
          }

          // heir has right - Replace heir with right in heirParent
          /*
            (X)
              ^
              \
                A
          */
          const heirParentKey = heirParent.getKey();

          if (heirKey < heirParentKey) {
            heirParent.setLeft(heirRight);
          } else {
            heirParent.setRight(heirRight);
          }
          break;
        }

        break;
      }
    }

    this.#decrementSize();

    return removed;
  }


  clear() {
    this.#clearRoot();
    this.#clearSize();
  }
}