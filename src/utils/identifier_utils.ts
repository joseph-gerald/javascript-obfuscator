const base = 'abcdefghijklmnopqrstuvwxyz'.split('');
base.sort(() => Math.random() - 0.5);
let seed = 0;

const reserved = ["if","in","do"];

function randomizeSeed() {
    seed = Math.floor(Math.random() * 1E+8);
}

function numeric(id: number) {
    return `_${(id * seed) ^ seed % 1E+6}`;
}

function mangled(id: number) {
    let mangledValue = '';

    while (id >= 0) {
        const remainder = id % 26;
        if (reserved.includes(mangledValue)) {
            id--;
            continue;
        }
        mangledValue = base[remainder] + mangledValue;
        id = Math.floor(id / 26) - 1;
    }
    return mangledValue;
}

const identifierMap = new Map<string, string>();

function fetchIdentifier(name : string) : string {
    if(!identifierMap.has(name)) identifierMap.set(name, mangled(identifierMap.size));
    return identifierMap.get(name) as string;
}

export {
    randomizeSeed,
    numeric,
    fetchIdentifier,
    identifierMap
}