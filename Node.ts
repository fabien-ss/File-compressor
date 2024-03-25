export class Node{

    left: Node | null;
    right: Node | null;
    value: number | null;
    code: string | null;
    ticket: number = 0;

    constructor(){
        this.left = null;
        this.right = null;
        this.value = null;
        this.code = null;
    }

    static getNode(code: string, repetition: number, corpusSize: number){
        const node = new Node();
        node.code = code;
        node.value = repetition / corpusSize;
        return node;
    }

    ticketing(){
        if(this.left !== null){
            this.ticket = 0;
            this.left.ticketing();
        }else if(this.right !== null){
            console.log("right not null")
            this.ticket = 1;
            this.right.ticketing();
        }
    }

    displayTree(call: number) {
        console.log(this.value); 

        if (this.left !== null) {
            this.left.displayTree(call + 1);
        }

        if (this.right !== null) {
            this.right.displayTree(call + 1);
        }
    }
}
