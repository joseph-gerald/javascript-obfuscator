import * as types from "@babel/types";
import traverse from "@babel/traverse";
import transformer from "../transformer";
import {NodePath} from "@babel/traverse";
import {parse} from "@babel/parser";
import generate from "@babel/generator";

export default class extends transformer {
    constructor() {
        super("Member Transformer");
    }

    transform(node: types.Node, code : string) {
        traverse(node, {
            MemberExpression(path : NodePath<types.MemberExpression>){
                // check if the property is an identifier
                if(!types.isIdentifier(path.node.property) || path.node.computed) return;
                //if(!types.isCallExpression(path.parent)) return;

                if(code[path.node.loc?.start.index as number - 1] == "{" || code[path.node.loc?.start.index as number - 1] == "[" || code[path.node.loc?.start.index as number - 1] == "(")
                    return;

                path.replaceWith(parse(`${generate(path.node.object as any).code}["${path.node.property.name}"]`).program.body[0])
            }
        });
    }
}
