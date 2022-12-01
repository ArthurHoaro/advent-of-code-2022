import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n');

const elfCalories: {[index: number]: number} = {};
let elfIndex: number = 0;
let max: number|null = null;

for (let line of lines) {
  if (line.length === 0) {
    if (max === null || elfCalories[max] < elfCalories[elfIndex]) {
      max = elfIndex;
    }

    ++elfIndex;
    continue;
  }

  elfCalories[elfIndex] = (elfCalories[elfIndex] || 0) + Number.parseInt(line);
}

console.log('---Result---');
console.log(`Index: ${max}`);
if (max !== null) {
  console.log(`Value: ${elfCalories[max]}`);
}
