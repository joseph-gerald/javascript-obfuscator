import transformer from "./transformers/transformer"
import { parse } from "@babel/parser"
import generate from "@babel/generator"
import terser from "terser"

async function minify(script: string) {
    return (await terser.minify(script)).code;
}

type Config = {
    preMinify: boolean,
    postMinify: boolean,
    debug: boolean
}

export default async (script: string, transformers: transformer[], config: Config) => {
    let output = config.preMinify ? await minify(script) as string : script;
    const ast = parse(output);

    transformers.forEach((transformer) => { 
        if (config.debug) console.log(`Applying transformer: ${transformer.name}`);
        transformer.transform(ast, output)
        if (config.debug) console.log(`Finished transformer: ${transformer.name}`);
    });

    output = generate(ast, {
        jsescOption: {
            minimal: true
        }
    }).code;
    return config.postMinify ? await minify(output) as string : output;
}