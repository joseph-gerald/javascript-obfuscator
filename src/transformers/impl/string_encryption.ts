import * as types from "@babel/types";
import traverse from "@babel/traverse";
import transformer from "../transformer";
import {NodePath} from "@babel/traverse";
import {parse} from "@babel/parser";
import generate from "@babel/generator";
import { expressionStatement, callExpression, identifier } from "@babel/types";
import { randomizeSeed, numeric } from "../../utils/identifier_utils";

randomizeSeed();

function xor(str : string, key : number) {
    let result = "";
    for(let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key);
    }
    return result;
}

export default class extends transformer {
    constructor() {
        super("String Encryption");
    }

    transform(node: types.Node, code : string) {
        const decryptorIdentifier = "_xor";

        traverse(node, {
            Program(path : NodePath<types.Program>){
                path.node.body.unshift(parse(xor.toString().replace("xor",decryptorIdentifier)).program.body[0]);
            },

            BlockStatement(path : NodePath<types.BlockStatement>){
                if (path.parentPath.isFunctionDeclaration() || path.parentPath.isFunctionExpression() || path.parentPath.isArrowFunctionExpression()) return path.skip();
                path.node.body.unshift(parse(xor.toString().replace("xor",decryptorIdentifier)).program.body[0]);
            },

            StringLiteral(path : NodePath<types.StringLiteral>){
                if(path.node.value.length > 1) {
                    console.log()
                    const key = Math.floor(Math.random() * 10000);
                    path.replaceWith(expressionStatement(callExpression(identifier(decryptorIdentifier), [types.stringLiteral(xor(path.node.value, key)), types.numericLiteral(key)])));
                    path.skip();
                }
            }
        });
    }
}
