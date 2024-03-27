import { Huffman } from "./Huffman"
 
var huffman = new Huffman("Fazabdjiosjdisdiuqshdbhsqhdisisqjdoisjoidhfishdijhdisqhdqjishdjishdjkshdlsqdhsjkdqhjskhfjijgbjdbfhdfhoihoizerioezahrieen");
huffman.buildTree();

var node = huffman.nodeList[huffman.nodeList.length - 1][0];

node.ticketing("");

var binaryRepresentation: string [] = node.binaryRepresentation([])

console.log(binaryRepresentation)

console.log(node.nodeBinaryRepresentation(binaryRepresentation));

let as = 121;
as += 121;

console.log("bool ",as)
