import { BinarySearchTreeNode } from './BinarySearchTreeNode.js';

export class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    insert(key, value, currentNode = this.root) {
        const newNode = new BinarySearchTreeNode(key, value);
        this.size++;

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        // Without function recursive calls for better perfomance
        while (true) {
            if (key < currentNode.key) {
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                    break;
                }

                currentNode = currentNode.left;
            } else if (key >= currentNode.key) {
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                    break;
                }

                currentNode = currentNode.right;
            } else {
                // key === currentNode.key
                // Add sibling duplicate
                currentNode.siblings.append(newNode);
                break;
            }
        }
    }

    min(currentNode = this.root) {
        if (currentNode === null) {
            return null;
        }

        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }

        return currentNode;
    }

    removeMin(currentNode = this.root) {
        if (currentNode === null) {
            return null;
        }
        let parentNode = null;

        while (currentNode.left !== null) {
            parentNode = currentNode;
            currentNode = currentNode.left;
        }

        return this.remove(currentNode.key, parentNode || this.root);
    }

    max(currentNode = this.root) {
        if (currentNode === null) {
            return null;
        }

        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }

        return currentNode;
    }

    removeMax(currentNode = this.root) {
        if (currentNode === null) {
            return null;
        }
        let parentNode = null;

        while (currentNode.right !== null) {
            parentNode = currentNode;
            currentNode = currentNode.right;
        }

        return this.remove(currentNode.key, parentNode || this.root);
    }

    contains(key) {
        return !!this.find(key);
    }

    find(key, currentNode = this.root) {
        if (currentNode === null) {
            return null;
        }

        while (currentNode.key !== key) {
            if (key < currentNode.key) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            if (currentNode === null) {
                return null;
            }
        }

        return currentNode;
    }

    remove(key, currentNode = this.root) {
        let parentNode = null;
        if (currentNode === null) {
            return null;
        }

        let deletedNode = null;

        // Without function recursive calls for better perfomance
        while (true) {
            if (key < currentNode.key) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (key > currentNode.key) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else {
                // key === currentNode.key
                if (currentNode.siblings.count) {
                    // Check duplicates key - get if exists and return
                    deletedNode = currentNode.siblings.deleteHead().value;
                    break;
                }
                deletedNode = currentNode;
                if (currentNode.left === null && currentNode.right === null) {
                    // No childrens (leaf)
                    if (this.size === 1) {
                        this.root = null;
                        break;
                    }

                    // Delete currentNode via parentNode
                    if (parentNode.key < currentNode.key) {
                        // currentNode is right children (leaf)
                        parentNode.right = null;
                    } else {
                        // currentNode is left children (leaf)
                        parentNode.left = null;
                    }
                    break;
                }

                if (currentNode.left === null) {
                    /* No left children */
                    // Replace currentNode with right in parentNode
                    const right = currentNode.right;
                    if (parentNode !== null) {
                        if (currentNode.key < parentNode.key) {
                            parentNode.left = right;
                        } else {
                            parentNode.right = right;
                        }
                    } else {
                        // currentNode === this.root && this.root.left === null
                        // Replace this.root with right
                        this.root = right;
                    }
                    break;
                }

                if (currentNode.right === null) {
                    /* No right children */
                    // Replace currentNode with left in parentNode
                    const left = currentNode.left;
                    if (parentNode !== null) {
                        if (currentNode.key < parentNode.key) {
                            parentNode.left = left;
                        } else {
                            parentNode.right = left;
                        }
                    } else {
                        // currentNode === this.root && this.root.right === null
                        // Replace this.root with left
                        this.root = left;
                    }
                    break;
                }

                /* 2 childrens - Find heirNode for replace currentNode */
                let heirParentNode = currentNode;
                // 1 step - Get right
                let heirNode = currentNode.right;
                // further steps - Get left
                while (heirNode.left !== null) {
                    // Get left until lefts end
                    heirParentNode = heirNode;
                    heirNode = heirNode.left;
                }

                // Replace heirNode to currentNode by parentNode
                if (heirNode.key < parentNode.key) {
                    parentNode.left = heirNode;
                } else {
                    parentNode.right = heirNode;
                }
                // currentNode.left subtree to heirNode.left
                heirNode.left = currentNode.left;

                if (heirNode.right) {
                    // HeirNode has right subtree - Replace heirNode with right subtree in heirParentNode
                    const right = heirNode.right;
                    if (heirNode.key < heirParentNode.key) {
                        heirParentNode.left = right;
                    } else {
                        heirParentNode.right = right;
                    }
                } else {
                    // HeirNode has no children (leaf) - Delete heirNode in heirParentNode
                    heirParentNode.right = null;
                }
                break;
            }
        }

        this.size--;

        return deletedNode;
    }

    clear() {
        this.root = null;
        this.size = 0;
    }
}