export class Node{

    left: Node | null;
    right: Node | null;
    parent: Node | null;
    value: number | null;
    code: string | null;
    ticket: string | null;
    rank: number = 0;

    constructor(){
        this.left = null;
        this.right = null;
        this.value = null;
        this.code = null;
        this.parent = null;
        this.ticket = null;
    }

    static getNode(code: string, repetition: number, corpusSize: number){
        const node = new Node();
        node.code = code;
        node.value = repetition / corpusSize;
        return node;
    }

    ticketing(start: string){
        if(this.left != null) this.left.ticket = start + "1";
        if(this.right != null) this.right.ticket = start + "0";
        this.left?.ticketing(this.left.ticket ?? "");
        this.right?.ticketing(this.right.ticket ?? "");
    }

    binaryRepresentation(data: string[]) {
        if(this.left === null && this.right === null){
            data.push(this.ticket?? "");
        }
        this.left?.binaryRepresentation(data);
        this.right?.binaryRepresentation(data);
        return data;
    }

    findNode(path: string, index: number): Node | null {
        if (this.left === null && this.right === null) return this;
        if (path[index] === "1") return this.left?.findNode(path, index + 1) ?? null;
        else if (path[index] === "0") return this.right?.findNode(path, index + 1) ?? null;
        return null; 
    }

    nodeBinaryRepresentation(data: string[]){
        var nodes: Node[] = [];
        for(let i = 0; i < data.length; i++){
            const foundNode = this.findNode(data[i], 0);
            if (foundNode !== null) {
                nodes.push(foundNode);
            }
        }
        return nodes;
    }
}
