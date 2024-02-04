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
                if (!types.isIdentifier(path.node.id)) return;
                path.node.id.name = fetchIdentifier(path.node.id.name);
            },

            FunctionDeclaration(path: NodePath<types.FunctionDeclaration>) {
                for (const param of path.node.params) {
                    if (!types.isIdentifier(param)) continue;
                    param.name = fetchIdentifier(param.name);
                }

                if (!types.isIdentifier(path.node.id)) return;
                path.node.id.name = fetchIdentifier(path.node.id.name);
            },

            Identifier(path: NodePath<types.Identifier>) {
                if (identifierMap.has(path.node.name)) {
                    path.node.name = fetchIdentifier(path.node.name);
                }
                path.skip();
            }
        });
    }
}
