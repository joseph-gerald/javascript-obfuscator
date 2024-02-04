import obfuscate from "./obfuscator";
import * as fs from "fs";

import identifierMangling from "./transformers/impl/identifier_mangling";
import memberTransformer from "./transformers/impl/member_transformer";
import stringEncryption from "./transformers/impl/string_encryption";
import numberExpressor from "./transformers/impl/number_expressor";

const DEBUG = true;
const PATH = DEBUG ? "input/debug" : "input";
const OUTPUT_PATH = DEBUG ? "output/debug" : "output";

const files = fs.readdirSync(PATH).filter((file) => file.endsWith(".js"));

files.forEach(async (file) => {
    const content = fs.readFileSync(`${PATH}/${file}`, "utf8");

    const obfuscated = await obfuscate(content, [
        new numberExpressor(),
        new memberTransformer(),
        new stringEncryption(),
        new identifierMangling(),
    ], {
        preMinify: false,
        postMinify: true
    });

    fs.writeFileSync(`${OUTPUT_PATH}/${file}`, obfuscated);
});