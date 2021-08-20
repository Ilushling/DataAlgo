import {TreeNode} from './TreeNode.js';

export class Tree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    add(key, value) {
        let currentNode = this.root;
        const node = new TreeNode(key, value);
        this.size++;

        if (currentNode === null) {
            this.root = node;
            return;
        }

        // Without function recursive calls for better perfomance
        while (true) {
            if (key < currentNode.key) {
                if (currentNode.left === null) {
                    currentNode.left = node;
                    break;
                }

                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) {
                    currentNode.right = node;
                    break;
                }

                currentNode = currentNode.right;
            }
        }
    }

    findMin() {
        let currentNode = this.root;
        if (currentNode === null) {
            return null;
        }

        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }

        return currentNode;
    }

    findMax() {
        let currentNode = this.root;
        if (currentNode === null) {
            return null;
        }

        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }

        return currentNode;
    }

    find(key) {
        let currentNode = this.root;
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

    remove(key) {
        let currentNode = this.root;
        let parentNode = null;
        if (currentNode === null) {
            return;
        }

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
                    // No left children
                    // Replace right into currentNode
                    const right = currentNode.right;
                    currentNode.key = right.key;
                    currentNode.value = right.value;
                    currentNode.left = right.left;
                    currentNode.right = right.right;
                    break;
                }

                if (currentNode.right === null) {
                    // No right children
                    // Replace left into currentNode
                    const left = currentNode.left;
                    currentNode.key = left.key;
                    currentNode.value = left.value;
                    currentNode.left = left.left;
                    currentNode.right = left.right;
                    break;
                }

                // 2 childrens - find heirNode
                let heirParentNode = currentNode;
                // 1 step - get right
                let heirNode = currentNode.right;
                // further steps - get left
                while (heirNode.left !== null) {
                    // Always get left
                    heirParentNode = heirNode;
                    heirNode = heirNode.left;
                }
                // Replace heirNode into currentNode
                currentNode.key = heirNode.key;
                currentNode.value = heirNode.value;

                if (heirNode.right) {
                    // HeirNode has right chain - Replace right into heirNode
                    const right = heirNode.right;
                    heirNode.key = right.key;
                    heirNode.value = right.value;
                    heirNode.left = right.left;
                    heirNode.right = right.right;
                } else {
                    // HeirNode has no children (leaf) - Delete heirNode via heirParentNode
                    heirParentNode.right = null;
                }
                break;
            }
        }

        this.size--;
    }

    clear() {
        this.root = null;
        this.size = 0;
    }
}