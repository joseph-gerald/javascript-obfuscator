import * as types from "@babel/types";
import transformer from "../transformer";
import traverse from "@babel/traverse";
import { NodePath } from "@babel/traverse";
import { parse } from "@babel/parser";

function contextFetcher(key: string) {
    try {
        return Function("return this")()[key];
    } catch (_) {
        // @ts-ignore
        return (this as any)[key];
    }
}

export default class extends transformer {
    constructor() {
        super("Proxy Transformer");
    }

    transform(node: types.Node, code : string) {

        traverse(node, {
            Identifier(path: NodePath<types.Identifier>) {

                if (path.parentPath.isVariableDeclarator() && path.parentPath.node.id === path.node) return;

                // check if the identifier is defined in the scope
                if (!path.scope.bindings[path.node.name] && path.scope.hasGlobal(path.node.name)) {
                    path.replaceWith(parse(`contextFetcher("${path.node.name}")`).program.body[0]);
                    path.skip();
                }
            }
        });

        traverse(node, { 
            Program(path: NodePath<types.Program>) {
                path.node.body.unshift(parse(contextFetcher.toString()).program.body[0]);
                path.skip();
            },
        });
    }
}
