import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n').filter(line => line.length);

let totalScore: number = 0;

const processLine = (line: string): Record<string, number> => {
  const out: Record<string, number> = {};

  for (let letter of line.split('')) {
    out[letter] = (out[letter] || 0) + 1;
  }

  return out;
};

const getScore = (letter: number): number => {
  // 90 = Z
  if (letter > 90) {
    // 97 = a
    return letter - 96;
  }

  // 65 = A
  return letter - 64 + 26;
};

for (let index = 0; index < lines.length; index += 3) {
  const maps = [
    processLine(lines[index]),
    processLine(lines[index + 1]),
    processLine(lines[index + 2]),
  ];

  for (let letter of Object.keys(maps[0])) {
    if (maps[0][letter] && maps[1][letter] && maps[2][letter]) {
      const score = getScore(letter.charCodeAt(0));

      totalScore += score;

      console.log(
        `[${index}] Found letter '${letter}' for score [${score}] [Total: ${totalScore}]`
      );

      break;
    }
  }
}

console.log('---Result---');
console.log(`Total Score: ${totalScore}`);
