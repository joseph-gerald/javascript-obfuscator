import * as types from "@babel/types";
import traverse from "@babel/traverse";
import transformer from "../transformer";
import {NodePath} from "@babel/traverse";

import { randomizeSeed, numeric } from "../../utils/identifier_utils";

randomizeSeed();

const identifierMap = new Map<string, string>();

function fetchIdentifier(name : string) : string {
    if(!identifierMap.has(name)) {
        identifierMap.set(name, numeric(identifierMap.size));
        //identifierMap.set(name, `_${identifierMap.size}`);
    }
    return identifierMap.get(name) as string;
}

export default class extends transformer {
    constructor() {
        super("Identifier Mangling");
    }        

    transform(node: types.Node, code : string) {
        traverse(node, {
            VariableDeclarator(path : NodePath<types.VariableDeclarator>){
                if(!types.isIdentifier(path.node.id)) return;
                path.node.id.name = fetchIdentifier(path.node.id.name);
                console.log(node)
            },

            Identifier(path : NodePath<types.Identifier>){
                if (identifierMap.has(path.node.name)) {
                    path.node.name = identifierMap.get(path.node.name) as string;
                }
            }
        });
    }
}
