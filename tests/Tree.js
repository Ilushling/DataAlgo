import { Tree } from '../src/Tree/Tree.js';

const treeNode = new Tree();

// Add and remove root
treeNode.add(8);
treeNode.remove(8);
if (treeNode.find(8) !== null) {
    throw new Error('Error remove node');
}

treeNode.add(8);
treeNode.add(3);
treeNode.add(10);
treeNode.add(1);
treeNode.add(6);
treeNode.add(14);
treeNode.add(4);
treeNode.add(7);
treeNode.add(13);
treeNode.add(5);

// Remove node with no childrens
treeNode.remove(1);
if (treeNode.find(3).left !== null) {
    throw new Error('Error remove with no childrens');
}

// Remove node with left chilren (left 13)
treeNode.remove(14);
if (treeNode.find(10).right.key !== 13) {
    throw new Error('Error remove with left children');
}

// Remove node with right chilren (right 5)
treeNode.remove(4);
if (treeNode.find(6).left.key !== 5) {
    throw new Error('Error remove with right children');
}

// Remove node with 2 childrens (left 5 and right 7)
treeNode.remove(6);
if (treeNode.find(7).left.key !== 5) {
    throw new Error('Error remove with right children');
}

if (treeNode.findMin().key !== 3) {
    throw new Error('Error findMin');
}

if (treeNode.findMax().key !== 13) {
    throw new Error('Error findMax');
}

if (treeNode.size !== 6) {
    throw new Error('Error size');
}

console.log('TreeNode test done');