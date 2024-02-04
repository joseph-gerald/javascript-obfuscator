import * as types from "@babel/types";
import transformer from "../transformer";

export default class extends transformer {
    constructor() {
        super("Variable Masking");
    }

    transform(node: types.Node, code: string) {

    }
}
