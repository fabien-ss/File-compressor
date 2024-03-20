export class Node{

    left: Node
    right: Node
    value: number
    code: string

    constructor(){
    }

    static getNode(code: string, repetition: number, corpusSize: number){
        const node = new Node();
        node.code = code;
        node.value = repetition / corpusSize;
        return node;
    }

    show(){
        console.log("o")
    }
}