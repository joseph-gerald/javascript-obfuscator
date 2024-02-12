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
            },

            MemberExpression(path: NodePath<types.MemberExpression>) {
                if (types.isIdentifier(path.node.object)) {
                    const shouldContain = !path.scope.hasBinding(path.node.object.name) || path.scope.hasGlobal(path.node.object.name) || path.node.object.name == "String";
                    //console.log("ME", path.node.object.name, shouldContain);
                    //if (shouldContain && !Object.values(literals).includes(path.node.object.name)) literals["o_" + Object.keys(literals).length] = path.node.object.name;
                }
            },

            CallExpression(path: NodePath<types.CallExpression>) {
                if (types.isIdentifier(path.node.callee)) {
                    const defined = path.scope.hasBinding(path.node.callee.name) || path.scope.hasGlobal(path.node.callee.name);
                    const shouldContain = defined && path.parentPath.isCallExpression();
                    //console.log("CE", path.node.callee.name, shouldContain,);
                    if (shouldContain && !Object.values(literals).includes(path.node.callee.name)) literals["o_" + Object.keys(literals).length] = path.node.callee.name;
                }
            }
        });

        const literal_entries = Object.entries(literals).sort(_ => Math.random() - 0.5);
        const literal_values = literal_entries.map(([_, value]) => value);

        //console.log(literal_values)

        function generateCallExpression(key: any) {
            return types.callExpression(types.identifier(containerIdentifier), [types.numericLiteral(literal_values.indexOf(key))]);
        }

        traverse(node, {
            StringLiteral(path: NodePath<types.StringLiteral>) {
                if (Object.values(literals).includes(path.node.value)) {
                    path.replaceWith(generateCallExpression(path.node.value));
                    if (Math.random() < 1 / max_size) path.skip();
                }
            },

            NumericLiteral(path: NodePath<types.NumericLiteral>) {
                if (Object.values(literals).includes(path.node.value)) {
                    path.replaceWith(generateCallExpression(path.node.value));
                    if (Math.random() < 1 / max_size) path.skip();
                }
            },

            BooleanLiteral(path: NodePath<types.BooleanLiteral>) {
                if (Object.values(literals).includes(path.node.value)) {
                    path.replaceWith(generateCallExpression(path.node.value));
                    if (Math.random() < 1 / max_size) path.skip();
                }
            },

            MemberExpression(path: NodePath<types.MemberExpression>) {
                if (types.isIdentifier(path.node.object)) {
                    if (Object.values(literals).includes(path.node.object.name)) {
                        path.replaceWith(types.memberExpression(generateCallExpression(path.node.object.name), path.node.property, path.node.computed));
                    }
                }
            },

            CallExpression(path: NodePath<types.CallExpression>) {
                if (types.isIdentifier(path.node.callee)) {
                    if (Object.values(literals).includes(path.node.callee.name)) {
                        path.replaceWith(types.callExpression(generateCallExpression(path.node.callee.name), path.node.arguments));
                        //path.replaceWith(types.callExpression(types.memberExpression(types.identifier(containerIdentifier), types.numericLiteral(literal_values.indexOf(path.node.callee.name)), true), path.node.arguments));
                    }
                }
            }
        })

        const valueNode = types.arrayExpression(literal_entries.map(([_, value]) => _.startsWith("o") ? types.identifier(value as string) : types.valueToNode(value)));

        traverse(node, {
            Program(path: NodePath<types.Program>) {
                path.node.body.unshift(
                    types.functionDeclaration(
                        types.identifier(containerIdentifier),
                        [
                            types.identifier("key")
                        ],
                        types.blockStatement([
                            types.returnStatement(
                                types.memberExpression(
                                    valueNode,
                                    types.identifier("key"),
                                    true
                                )
                            )
                        ])
                    )
                )

                /*
                path.node.body.unshift(types.variableDeclaration("const", [
                    types.variableDeclarator(types.identifier(containerIdentifier), valueNode)
                ]));
                */
            },
        });
    }
}
