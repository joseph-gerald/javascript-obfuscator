import { Node } from "@babel/types";
import transformer from "../transformer";
import traverse from "@babel/traverse";
import * as types from "@babel/types";

export default class extends transformer {
    constructor() {
        super("Comment Stripper");
    }

    transform(node: Node, code: string): void {
        traverse(node, {
            enter(path) {
                if (path.node.leadingComments) path.node.leadingComments = [];
                if (path.node.trailingComments) path.node.trailingComments = [];
            }
        });
    }
}