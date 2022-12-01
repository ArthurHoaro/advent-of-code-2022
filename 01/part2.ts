import fs from 'fs';

class Elf {
  index: number;
  calories: number = 0;

  constructor(id: number) {
    this.index = id;
  }
}

const TOP_COUNT = 3;
const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n');

const elfs: Elf[] = [];
let index: number = 0;
let currentElf: Elf = new Elf(index);

for (let line of lines) {
  if (line.length === 0) {
    elfs.push(currentElf);

    currentElf = new Elf(++index);
    continue;
  }

  currentElf.calories += Number.parseInt(line);
}

elfs.sort((a: Elf, b: Elf): number => b.calories - a.calories);

let topTotal: number = 0;
let topIndexes: string = '';
for (let i: number = 0; i < TOP_COUNT; ++i) {
  topIndexes += `${elfs[i].index} `;
  topTotal += elfs[i].calories;
}

console.log('---Result---');
console.log(`Indexes: ${topIndexes}`);
console.log(`Values:  ${topTotal}`);
