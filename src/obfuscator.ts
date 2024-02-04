import transformer from "./transformers/transformer"
import { parse } from "@babel/parser"
import generate from "@babel/generator"

type Config = {
    preMinify: boolean,
    postMinify: boolean,
}

export default async (script: string, transformers: transformer[], config: Config) => {
    let output = script;
    const ast = parse(script);

    transformers.forEach((transformer) => { 
        transformer.transform(ast, output)
    });

    output = generate(ast).code;
    return output;
}