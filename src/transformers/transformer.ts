import * as types from "@babel/types"

export default abstract class{

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract transform(node : types.Node, code : string) : void;

    start(code : string){
        
    }

    end(code : string){

    };
}