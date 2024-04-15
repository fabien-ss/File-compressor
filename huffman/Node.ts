export class Node{

    left: Node | null;
    right: Node | null;
    value: number | null;
    code: string | null;
    ticket: string | null;
    rank: number = 0;
    leftTicketValue = 0;
    rightTicketValue = 1;

    constructor(){
        this.left = null;
        this.right = null;
        this.value = null;
        this.code = null;
        this.ticket = null;
    }

    static getNode(code: string, repetition: number, corpusSize: number){
        const node = new Node();
        node.code = code;
        node.value = repetition / corpusSize;
        return node;
    }

    ticketing(start: string){
        if(this.left != null) this.left.ticket = start + this.leftTicketValue.toString();
        if(this.right != null) this.right.ticket = start + this.rightTicketValue.toString();
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

    nodeToWord(start: string): string {
        if(start[0] === "0"){
            if(start.length > 1){
                return this.left?.nodeToWord(start.substring(1)) as string;
            }
            return this.left?.code as string;
        }else {
            if(start.length > 1){
                return this.right?.nodeToWord(start.substring(1)) as string;
            }
            return this.right?.code as string;
        }
    }

    nodeStringRepresentation(array: string[]){
        var repr: any = {};
        for (let index = 0; index < array.length; index++) {
            const stringRepresentation = this.nodeToWord(array[index]);
            repr[stringRepresentation] = array[index];
        }
        return repr;
    }

    decodeMessage(encodedString: string, index: number, recall: string) : string[]{
        if(encodedString[index] === "0"){
            if(this.left != null){
                return this.left.decodeMessage(encodedString, index + 1, recall);
            }
        }if(encodedString[index] === "1"){
            if(this.right != null){
                return this.right.decodeMessage(encodedString, index + 1, recall);
            }
        }
        return [this.code as string, this.ticket as string];
    }

    decodeBinaryMessage(encodedString: string){
        let begin = 0;
        let decodedMessage = "";
        while(encodedString.length > 0){
            let decoded = this.decodeMessage(encodedString, begin, "");
            decodedMessage += decoded[0]; 
            encodedString = encodedString.substring(decoded[1].length);
            begin = 0;
        }
        return decodedMessage;
    }
}
