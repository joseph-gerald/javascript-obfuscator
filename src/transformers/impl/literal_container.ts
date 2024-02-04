import * as types from "@babel/types";
import transformer from "../transformer";
import traverse from "@babel/traverse";
import { NodePath } from "@babel/traverse";

const containerIdentifier = "_literal_container_";

export default class extends transformer {
    constructor() {
        super("Literal Container");
    }

    transform(node: types.Node, code: string) {
        let literals: any = {};
        const max_size = 10;

        traverse(node, {
            StringLiteral(path: NodePath<types.StringLiteral>) {
                if (!Object.values(literals).includes(path.node.value)) literals["s_" + Object.keys(literals).length] = path.node.value;
            },

            NumericLiteral(path: NodePath<types.NumericLiteral>) {
                if (!Object.values(literals).includes(path.node.value)) literals["n_" + Object.keys(literals).length] = path.node.value;
            },

            BooleanLiteral(path: NodePath<types.BooleanLiteral>) {
                if (!Object.values(literals).includes(path.node.value)) literals["b_" + Object.keys(literals).length] = path.node.value;
            }
        });

        const literal_entries = Object.entries(literals).sort(x => Math.random() - 0.5);
        const literal_values = literal_entries.map(([_, value]) => value);

        console.log(literal_values)

        traverse(node, {
            StringLiteral(path: NodePath<types.StringLiteral>) {
                if (Object.values(literals).includes(path.node.value)) {
                    path.replaceWith(types.memberExpression(types.identifier(containerIdentifier), types.numericLiteral(literal_values.indexOf(path.node.value)), true));
                    if (Math.random() < 1 / max_size) path.skip();
                }
            },

            NumericLiteral(path: NodePath<types.NumericLiteral>) {
                if (Object.values(literals).includes(path.node.value)) {
                    path.replaceWith(types.memberExpression(types.identifier(containerIdentifier), types.numericLiteral(literal_values.indexOf(path.node.value)), true));
                    if (Math.random() < 1 / max_size) path.skip();
                }
            },

            BooleanLiteral(path: NodePath<types.BooleanLiteral>) {
                if (!Object.values(literals).includes(path.node.value)) literals["b_" + Object.keys(literals).length] = path.node.value;
                if (Math.random() < 1 / max_size) path.skip();
            }
        })

        traverse(node, {
            Program(path: NodePath<types.Program>) {
                path.node.body.unshift(types.variableDeclaration("const", [
                    types.variableDeclarator(types.identifier(containerIdentifier), types.arrayExpression(literal_values.map(literal => types.valueToNode(literal))))
                ]));
            },
        });
    }
}
