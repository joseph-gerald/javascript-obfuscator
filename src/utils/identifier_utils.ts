let seed = 0;

function randomizeSeed() {
    seed = Math.floor(Math.random() * 1E+8);
}

function numeric(id: number) {
    return `_${(id * seed) ^ seed % 1E+6}`;
}

export {
    randomizeSeed,
    numeric
}