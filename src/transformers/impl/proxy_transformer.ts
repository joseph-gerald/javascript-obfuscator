import * as types from "@babel/types";
import transformer from "../transformer";
import traverse from "@babel/traverse";
import { NodePath } from "@babel/traverse";

export default class extends transformer {
    constructor() {
        super("Proxy Transformer");
    }

    transform(node: types.Node, code : string) {
        traverse(node, {
            Identifier(path: NodePath<types.Identifier>) {
                if (path.node.name === "eval") {
                    path.replaceWith(types.identifier("window.eval"));
                    path.skip();
                }
            }
        });
    }
}
