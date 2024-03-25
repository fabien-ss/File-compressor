export class Node{

    left: Node | null;
    right: Node | null;
    value: number | null;
    code: string | null;
    ticket: number = 0 ;

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
            this.left.ticket = 0;
            this.left.ticketing();
        }else {
          //  this.right.ticket = 1;
         //   this.right.ticketing();
        }
    }
}
