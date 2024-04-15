import { Huffman } from "./huffman/Huffman"
import fs from 'fs';

var huffman = new Huffman("./documents/message.txt");
huffman.buildTree();

var node = huffman.nodeList[huffman.nodeList.length - 1][0];
node.ticketing("");

var binaryRepresentation: string [] = node.binaryRepresentation([])

console.log("binary ",binaryRepresentation)

//console.log(node.nodeBinaryRepresentation(binaryRepresentation));

//console.log(node.nodeStringRepresentation(binaryRepresentation));
//console.log(node.nodeStri

const binary = node.nodeStringRepresentation(binaryRepresentation);

console.log("binary ",binary)
huffman.setDictionnary(binary, "./documents/dictionnary.json")
// encoder le texte selon le dictionnaire
const message = huffman.encodeText();

console.log("message ", message)
let messageDecoded = node.decodeBinaryMessage(message)
console.log("decodage ",messageDecoded)

console.log("target size with encoding ", message.length, " bytes")
console.log("target size without encoding ", messageDecoded.length * 8, " bytes")

//console.log(huffman.getBytesArray())
huffman.saveByteToFile()

