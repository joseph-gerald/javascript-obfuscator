import { Node } from "@babel/types";
import transformer from "../transformer";
import traverse from "@babel/traverse";
import * as types from "@babel/types";

export default class extends transformer {
    constructor() {
        super("Function Arrowfy");
    }

    transform(node: Node, code: string): void {
        traverse(node, {
            FunctionDeclaration(path) {
                if (path.node.id) {
                    path.replaceWith(
                        types.variableDeclaration("const", [
                            types.variableDeclarator(
                                types.identifier(path.node.id.name),
                                types.arrowFunctionExpression(
                                    path.node.params,
                                    path.node.body
                                )
                            )
                        ])
                    )
                }
            }
        });
    }
}