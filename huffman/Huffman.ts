import { Node } from "./Node";
import fs from "fs";

export class Huffman {

    nodeList: Node[][] = [];
    text: string;
    dictionnary: any;
    dictionnaryPath: string = "./documents/dictionnary.json";
    encodedFilePath: string = "./documents/encoded.txt"

    constructor(textPah : string){
        this.text = fs.readFileSync(textPah, 'utf8');
        this.nodeList.push(this.textToNodeList(this.text));
    }

    private sort(nodeList: Node[]){
        return nodeList.sort((a, b) => (a.value?? 0) - (b.value?? 0));
    }

    private nodeByMinimumValue(nodeList: Node[]){
        const newNode = new Node();
        newNode.value = (nodeList[0].value?? 0) + (nodeList[1].value?? 0)
        newNode.left = nodeList[0];
        newNode.right = nodeList[1];
        newNode.code = (nodeList[0].code?? "") + (nodeList[1].code?? "");
        return newNode;
    }

    private injectNode(node: Node[], newNode: Node){
        var newNodes: Node[] = [];
        for(var i = 2; i < node.length; i++){
            newNodes.push(node[i]);
        }
        newNodes.push(newNode);
        return newNodes;
    }
    
    buildTree(){
        while(this.nodeList[this.nodeList.length - 1].length > 2){
            var targetNode = this.sort(this.nodeList[this.nodeList.length - 1])
            const newNode = this.nodeByMinimumValue(targetNode);
            const newNodeList = this.injectNode(targetNode, newNode);
            this.nodeList.push(newNodeList);
        }
        const nodeRoot = this.nodeByMinimumValue(this.nodeList[this.nodeList.length - 1]);
        this.nodeList.push([nodeRoot])
    }

    textToNodeList(text: string): Node[]{
        const textSize = text.length;
        var tempNodeText: string[] = [];
        var countWords: number[] = [];
        for(let i = 0; i < textSize; i++){
            if(!tempNodeText.includes(text[i])){
                tempNodeText.push(text[i]);
                countWords.push(1);
            }else{
                const index = tempNodeText.indexOf(text[i]);
                countWords[index]++;
            }
        }
        console.log("node list ",tempNodeText)
        console.log("node count ", countWords)
        return this.getNodeList(textSize, countWords, tempNodeText)
    }

    private getNodeList(textSize: number, countWords: number[], tempNodeText: string[]){
        var nodeList: Node[] = [];
        for(let i = 0; i < countWords.length; i ++){
            var newNode = Node.getNode(tempNodeText[i], countWords[i], textSize);
            newNode.rank = i;
            nodeList.push(newNode);
        }
        return nodeList;
    }

    encodeText() {
        let encoded = "";
        for (let i = 0; i < this.text.length; i++) {
            encoded += this.dictionnary[this.text[i]];
        }
        return encoded;
    }  
    
    decodageText(){

    }

    sortedDictionnary(): Record<string, number> {
        return Object.keys(this.dictionnary)
          .sort((a, b) => this.dictionnary[b].length - this.dictionnary[a].length)
          .reduce((acc, key) => {
            acc[key] = this.dictionnary[key];
            return acc;
          }, {} as Record<string, number>);
    }


    encodeDataToByteArray(){
        const matchResult = this.encodeText().match(/.{1,8}/g);
        const binaryArray = matchResult ? matchResult.map(byte => parseInt(byte, 2)) : [];
        const uint8Array = new Uint8Array(binaryArray);
        return uint8Array;
    }

    saveByteToFile(){
        let byteArray = this.encodeDataToByteArray();
        fs.writeFile(this.encodedFilePath, byteArray, (err) => {
            if (err) throw err;
            console.log('Le fichier a été sauvegardé avec succès.');
        });
    }

    setDictionnary(
       dictionnary: Record<string, string>, path: string
    ){
        this.dictionnary = dictionnary;
        this.dictionnaryPath = path;
        this.saveDictionnary();
    }   

    saveDictionnary(){
        try {
            const data = JSON.stringify(this.dictionnary, null, 4); // Utiliser null et 4 pour une mise en forme jolie
            fs.writeFileSync(this.dictionnaryPath, data, 'utf8');
            console.log(`Le fichier a été écrit avec succès !`);
        } catch (err) {
        console.log(`Erreur lors de l'écriture du fichier: ${err}`);
        }
    }
}