import * as types from "@babel/types";
import transformer from "../transformer";
import { traverse } from "@babel/types";
import { NodePath } from "@babel/traverse";

export default class extends transformer {
    constructor() {
        super("Proxy Transformer");
    }

    transform(node: types.Node, code : string) {
        
    }
}
