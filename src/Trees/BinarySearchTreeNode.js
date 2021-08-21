import { LinkedList } from '../Lists/LinkedList.js';

export class BinarySearchTreeNode {
    constructor(key = null, value = null, left = null, right = null, siblings = new LinkedList()) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = 0;

        // For duplicates key
        this.siblings = siblings;
    }
}