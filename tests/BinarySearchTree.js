import { BinarySearchTree } from '../src/Trees/BinarySearchTree.js';

const binarySearchTree = new BinarySearchTree();

// Add and remove root
binarySearchTree.insert(9);
binarySearchTree.remove(9);
if (binarySearchTree.find(9) !== null) {
    throw new Error('Error remove node');
}

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
binarySearchTree.insert(9);
binarySearchTree.insert(3);
binarySearchTree.insert(10);
binarySearchTree.insert(1);
binarySearchTree.insert(6);
binarySearchTree.insert(14);
binarySearchTree.insert(4);
binarySearchTree.insert(7);
binarySearchTree.insert(8);
binarySearchTree.insert(13);
binarySearchTree.insert(5);

// Remove node with no childrens
binarySearchTree.remove(1);
if (binarySearchTree.find(3).left !== null) {
    throw new Error('Error remove with no childrens');
}

// Remove node with left chilren (left 13)
binarySearchTree.remove(14);
if (binarySearchTree.find(10).right.key !== 13) {
    throw new Error('Error remove with left children');
}

// Remove node with right chilren (right 5)
binarySearchTree.remove(4);
if (binarySearchTree.find(6).left.key !== 5) {
    throw new Error('Error remove with right children');
}

// Remove node with 2 childrens (left 5 and right 7)
/*
         9                   9      
       /   \               /   \    
      3     10            3     10  
       \     \             \     \  
        6     13     ->     7     13
       / \                 / \      
      5   7               5   8     
           \                        
            8                       
*/
binarySearchTree.remove(6);
if (binarySearchTree.find(7).left.key !== 5) {
    throw new Error('Error remove with right children');
}

if (binarySearchTree.min().key !== 3) {
    throw new Error('Error findMin');
}

if (binarySearchTree.max().key !== 13) {
    throw new Error('Error findMax');
}

if (binarySearchTree.size !== 7) {
    throw new Error('Error size');
}

console.log('binarySearchTree test done', binarySearchTree);