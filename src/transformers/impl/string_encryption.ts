import * as types from "@babel/types";
import traverse, { Scope } from "@babel/traverse";
import transformer from "../transformer";
import { NodePath } from "@babel/traverse";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { expressionStatement, callExpression, identifier } from "@babel/types";
import { randomizeSeed, fetchIdentifier, identifierMap } from "../../utils/identifier_utils";
import crypto from "crypto";

const $id = -1;
randomizeSeed();

const xorIdentifier = "_decryptor_base_";
const decryptorMap = new Map<Scope, any[]>();

function xorId(str: string, key: number, id: number) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key + i + id);
    }
    return result;
}

function xor(str: string, key: number, id: number) {
    let result = "";

    for (let i = 0; i < str.length; i++) result += String.fromCharCode(str.charCodeAt(i) ^ key + i + id);
    
    return result;
}

const xorProxy = (str: string, key: number) => xor(str, key, $id);

function generateXorFunction(decryptorIdentifier: string, id: number) {
    return parse(xor.toString().replace("xor", decryptorIdentifier));
}

function generateXorProxyFunction(decryptorIdentifier: string, id: number) {
    const functionExpression = xorProxy.toString().replace("xorProxy", decryptorIdentifier).replace("$id", id.toString()).replace("xor", xorIdentifier);
    const script = `const ${decryptorIdentifier} = ${functionExpression}`;
    return parse(script);
}

export default class extends transformer {
    constructor() {
        super("String Encryption");
    }

    transform(node: types.Node, code: string) {
        const programId = Math.floor(Math.random() * 1E+16);

        traverse(node, {
            Program(path: NodePath<types.Program>) {
                let decryptorIdentifier = `_decryptor__${programId}`;
                path.node.body.unshift(generateXorProxyFunction(decryptorIdentifier, programId).program.body[0]);

                path.node.body.unshift(generateXorFunction(xorIdentifier, programId).program.body[0]);

                decryptorMap.set(path.scope, [decryptorIdentifier, programId]);
            },

            BlockStatement(path: NodePath<types.BlockStatement>) {
                if (path.parentPath.isFunctionDeclaration() || path.parentPath.isFunctionExpression() || path.parentPath.isArrowFunctionExpression()) return path.skip();

                const localId = programId || Math.floor(Math.random() * 1E+16);

                let decryptorIdentifier = `_decryptor__${localId}`;
                path.node.body.unshift(generateXorProxyFunction(decryptorIdentifier, localId).program.body[0]);

                decryptorMap.set(path.scope, [decryptorIdentifier, localId]);
            },

            StringLiteral(path: NodePath<types.StringLiteral>) {
                if (path.node.value.length > 1) {
                    const key = Math.floor(Math.random() * 1E+8);
                    const [decryptorIdentifier, id] = decryptorMap.get(path.scope) as any;

                    console.log(xorId(path.node.value, key, id))

                    path.replaceWith(expressionStatement(callExpression(identifier(decryptorIdentifier), [types.stringLiteral(xorId(path.node.value, key, id)), types.numericLiteral(key)])));
                    path.skip();
                }
            }
        });
    }
}
