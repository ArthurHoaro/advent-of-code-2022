import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n').filter(line => line.length);

class Assignement {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

let totalScore: number = 0;

const isCompleteOverlap = (a: Assignement, b: Assignement): boolean => {
  return (a.start <= b.start && a.end >= b.end)
    || (b.start <= a.start && b.end >= a.end);
};

for (let [index, line] of lines.entries()) {
  const [firstElf, secondElf]: string[] = line.split(',');

  if (isCompleteOverlap(
    new Assignement(...firstElf.split('-').map(value => Number.parseInt(value)) as [number, number]),
    new Assignement(...secondElf.split('-').map(value => Number.parseInt(value)) as [number, number]),
  )) {
    totalScore++;

    console.log(
      `[${index}] Line: ${line} is an overlap - bumping [Total: ${totalScore}]`
    );
  } else {
    console.log(
      `[${index}] Line: ${line} is NOT an overlap - skipping [Total: ${totalScore}]`
    );
  }
}

console.log('---Result---');
console.log(`Total Score: ${totalScore}`);
