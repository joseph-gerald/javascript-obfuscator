import obfuscate from "./obfuscator";
import * as fs from "fs";

import identifier_mangling from "./transformers/impl/identifier_mangling";
import member_transformer from "./transformers/impl/member_transformer";
import string_encryption from "./transformers/impl/string_encryption";
import number_expressor from "./transformers/impl/number_expressor";
import literal_container from "./transformers/impl/literal_container";
import comment_stripper from "./transformers/impl/comment_stripper";
import proxy_transformer from "./transformers/impl/proxy_transformer";

const DEBUG = true;
const PATH = DEBUG ? "input/debug" : "input";
const OUTPUT_PATH = DEBUG ? "output/debug" : "output";

const files = fs.readdirSync(PATH).filter((file) => file.endsWith(".js"));

files.forEach(async (file) => {
    const content = fs.readFileSync(`${PATH}/${file}`, "utf8");

    const obfuscated = await obfuscate(content, [
        new number_expressor(),
        new member_transformer(),
        new string_encryption(),
        new member_transformer(),
        new literal_container(),
        new identifier_mangling(),
        new comment_stripper(),
        new proxy_transformer()

    ], {
        preMinify: false,
        postMinify: false
    });

    fs.writeFileSync(`${OUTPUT_PATH}/${file}`, obfuscated);
});