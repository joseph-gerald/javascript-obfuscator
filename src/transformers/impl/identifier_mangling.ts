import * as types from "@babel/types";
import traverse from "@babel/traverse";
import transformer from "../transformer";
import { NodePath } from "@babel/traverse";

import { randomizeSeed, fetchIdentifier, identifierMap } from "../../utils/identifier_utils";

randomizeSeed();

export default class extends transformer {
    constructor() {
        super("Identifier Mangling");
    }

    transform(node: types.Node, code: string) {
        traverse(node, {
            VariableDeclarator(path: NodePath<types.VariableDeclarator>) {
                if (types.isIdentifier(path.node.id)) fetchIdentifier(path.node.id.name);
            },

            ArrowFunctionExpression(path: NodePath<types.ArrowFunctionExpression>) {
                for (const param of path.node.params) {
                    if (types.isIdentifier(param)) fetchIdentifier(param.name);
                }
            },

            FunctionDeclaration(path: NodePath<types.FunctionDeclaration>) {
                for (const param of path.node.params) {
                    if (types.isIdentifier(param)) fetchIdentifier(param.name);
                }

                if (types.isIdentifier(path.node.id)) fetchIdentifier(path.node.id.name);
            },

            Identifier(path: NodePath<types.Identifier>) {
                if (identifierMap.has(path.node.name)) {
                    path.replaceWith(types.identifier(fetchIdentifier(path.node.name)));
                    path.skip();
                }
            }
        });
    }
}
