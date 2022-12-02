import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n').filter(line => line.length);

class Play {
  name: string;
  value: number;
  win: string;
}

const plays: { [key:string]: Play } = {
  rock: {
    name: 'rock',
    value: 1,
    win: 'scissor',
  },
  paper: {
    name: 'paper',
    value: 2,
    win: 'rock'
  },
  scissor: {
    name: 'scissor',
    value: 3,
    win: 'paper'
  },
};
const mapping: { [key: string]: Play } = {
  'A': plays.rock,
  'B': plays.paper,
  'C': plays.scissor,
  'X': plays.rock,
  'Y': plays.paper,
  'Z': plays.scissor,
}

const fight = (opponent: Play, own: Play): number => {
  let score = 0;
  if (opponent.name === own.name) {
    score = 3;
  } else if (opponent.name === own.win) {
    score = 6;
  } else {
    score = 0;
  }

  return score + own.value;
}

let totalScore: number = 0;

for (let [index, line] of lines.entries()) {
  const [opponentPlay, ownPlay]: Play[] = line.split(' ').map(value => mapping[value]);
  const score = fight(opponentPlay, ownPlay);

  totalScore += score;

  console.log(
    `[${index}] Play: ${line} - ${opponentPlay.name} vs ${ownPlay.name} => +${score} [Total: ${totalScore}]`
  );
}

console.log('---Result---');
console.log(`Total Score: ${totalScore}`);
