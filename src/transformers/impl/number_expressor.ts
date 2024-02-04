import * as types from "@babel/types";
import traverse from "@babel/traverse";
import transformer from "../transformer";
import {NodePath} from "@babel/traverse";
import {parse} from "@babel/parser";
import generate from "@babel/generator";

export default class extends transformer {
    constructor() {
        super("Number Expressor");
    }

    transform(node: types.Node, code : string) {
        traverse(node, {
            NumericLiteral(path : NodePath<types.NumericLiteral>){
                if(path.node.value < 0) return;

                const value = path.node.value;

                switch (Math.floor(Math.random() * 3)) {
                    default:
                        console.log(value)
                        const multiplier = Math.floor(Math.random() * value.toString().length * 10);
                        const part1 = value * (1 + multiplier);
                        const part2 = value * (multiplier);
                        path.replaceWith(parse(`("${parseFloat(part1.toFixed(12))}" - "${parseFloat(part2.toFixed(12))}")`).program.body[0]);
                        //path.replaceWith(parse(`(${part1.toFixed(14)} - ${part2.toFixed(14)})`).program.body[0]);
                        path.skip();
                        break;
                }
            }
        });
    }
}
