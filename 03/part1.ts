import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n').filter(line => line.length);

let totalScore: number = 0;

const getScore = (letter: number): number => {
  // 90 = Z
  if (letter > 90) {
    // 97 = a
    return letter - 96;
  }

  // 65 = A
  return letter - 64 + 26;
};

for (let [index, line] of lines.entries()) {
  const [firstCompartment, secondCompartment]: string[] = [
    line.substring(0, line.length / 2),
    line.substring(line.length / 2),
  ];
  const firstCompartmentMap: { [letter: string]: number } = {};

  for (let letter of firstCompartment.split('')) {
    firstCompartmentMap[letter] = (firstCompartmentMap[letter] || 0) + 1;
  }

  for (let letter of secondCompartment.split('')) {
    if (firstCompartmentMap[letter]) {
      const score = getScore(letter.charCodeAt(0));

      totalScore += score;

      console.log(
        `[${index}] Line: ${line} Found letter '${letter}' for score [${score}] [Total: ${totalScore}]`
      );

      break;
    }
  }
}

console.log('---Result---');
console.log(`Total Score: ${totalScore}`);
