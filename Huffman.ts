import { Node } from "./Node";

export class Huffman {

    nodeList: Node[][] = [];

    constructor(text : string){
        this.nodeList.push(this.textToNodeList(text));
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
        // tant que la liste n'est pas réduit à 2 nodes
        while(this.nodeList[this.nodeList.length - 1].length > 2){
            // trier la dernière liste pour obtenir les nodes avec les plus petites valeurs
            var targetNode = this.sort(this.nodeList[this.nodeList.length - 1])
            // extraction du nouveau noeud par la liste triée
            const newNode = this.nodeByMinimumValue(targetNode);
            // création d'une nouvelle liste de noeud pour faire la prochaine ittération
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
        return this.getNodeList(textSize, countWords, tempNodeText)
    }

    private getNodeList(textSize: number, countWords: number[], tempNodeText: string[]){
        var nodeList: Node[] = [];
        for(let i = 0; i < countWords.length; i ++){
            var newNode = Node.getNode(tempNodeText[i], countWords[i], textSize);
            nodeList.push(newNode);
        }
        return nodeList;
    }
}