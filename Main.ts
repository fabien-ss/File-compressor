import { Huffman } from "./Huffman"
 
var huffman = new Huffman("Fabieen");
huffman.buildTree();

//console.log(huffman.nodeList)

var node = huffman.nodeList[huffman.nodeList.length - 1][0];

node.ticketing();

node.displayTree(1);

console.log(node)