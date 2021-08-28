import { AVLTree } from '../src/Trees/AVLTree.js';

const avlTree = new AVLTree();
window.avlTree = avlTree;
console.log(avlTree);

// Add and remove root
avlTree.insert(9);
if (avlTree.root.key !== 9) {
    throw new Error('Error insert');
}
avlTree.remove(9);
if (avlTree.root != null) {
    throw new Error('Error remove');
}
if (avlTree.find(9) != null) {
    throw new Error('Error find');
}

avlTree.insert(9);
avlTree.insert(3);
avlTree.insert(10);
avlTree.insert(1);
avlTree.insert(6);
avlTree.insert(14);
avlTree.insert(4);
avlTree.insert(7);
avlTree.insert(8);
avlTree.insert(13);
avlTree.insert(5);
/*
           6           
       /       \       
      3         9      
     / \      /   \    
    1   4    7    13   
         \   \   /  \  
          5   8 10   14
*/

if (avlTree.min().key !== 1) {
    throw new Error('Error min');
}

if (avlTree.max().key !== 14) {
    throw new Error('Error max');
}

if (avlTree.size !== 11) {
    throw new Error('Error size');
}

avlTree.clear();
avlTree.insert(3);
avlTree.insert(2);
avlTree.insert(1);
/*
    Left Left (LL)
        3        2  
       /        / \ 
      2    ->  1   3
     /              
    1               
*/

avlTree.clear();
avlTree.insert(1);
avlTree.insert(2);
avlTree.insert(3);
/*
    Right Right (RR)
    1            2  
     \          / \ 
      2    ->  1   3
       \            
        3           
*/

avlTree.clear();
avlTree.insert(5);
avlTree.insert(3);
avlTree.insert(6);
avlTree.insert(2);
avlTree.insert(4);
avlTree.insert(1);

/*
    Left Left (LL)
          5            3    
         / \          / \   
        3   6        2   5  
       / \     ->   /   / \ 
      2   4        1   4   6
     /                      
    1                       
*/

avlTree.clear();
avlTree.insert(5);
avlTree.insert(1);
avlTree.insert(6);
avlTree.insert(2);
avlTree.insert(3);
/*
    Left Right (LR)
      5            5  
     / \          / \ 
    1   6        2   6
     \     ->   / \   
      2        1   3  
       \              
        3             
*/
avlTree.insert(4);
/*
    Left Right (LR)
        5            3    
       / \          / \   
      2   6  ->    2   5  
     / \          /   / \ 
    1   3        1   4   6
         \                
          4               
*/

avlTree.clear();
avlTree.insert(2);
avlTree.insert(1);
avlTree.insert(5);
avlTree.insert(4);
avlTree.insert(6);
avlTree.insert(3);
/*
    Right Left (RL)
      2              4    
     / \            / \   
    1   5          2   5  
       / \   ->   / \   \ 
      4   6      1   3   6
     /                    
    3                     
*/

avlTree.clear();
avlTree.insert(2);
avlTree.insert(1);
avlTree.insert(4);
avlTree.insert(3);
avlTree.insert(5);
avlTree.insert(6);
/*
    Right Right (RR)
      2                4    
     / \              / \   
    1   4            2   5  
       / \     ->   / \   \ 
      3   5        1   3   6
           \                
            6               
*/

console.log('avlTree test done', avlTree);