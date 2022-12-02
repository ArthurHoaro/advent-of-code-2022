import fs from 'fs';

const input: Buffer = fs.readFileSync(`${__dirname}/input`);
const lines: string[] = input.toString().split('\n').filter(line => line.length);

class Play {
  name: string;
  value: number;
  win: string;
}

class Result {
  name: string;
  value: number;
}

const plays: Record<string, Play> = {
  'A': {
    name: 'rock',
    value: 1,
    win: 'scissor',
  },
  'B': {
    name: 'paper',
    value: 2,
    win: 'rock'
  },
  'C': {
    name: 'scissor',
    value: 3,
    win: 'paper'
  },
};
const results: Record<string, Result> = {
  'X': {
    name: 'lose',
    value: 0,
  },
  'Y': {
    name: 'draw',
    value: 3,
  },
  'Z': {
    name: 'win',
    value: 6,
  },
}

const resolve = (opponent: Play, result: Result): Play => {
  let callback;
  if (result.value === 0) {
    callback = (play: Play): boolean => play.name === opponent.win;
  } else if (result.value === 3) {
    callback = (play: Play): boolean => play.name === opponent.name;
  } else {
    callback = (play: Play): boolean => play.name !== opponent.win && play.name !== opponent.name;
  }

  return Object.values(plays).find(callback) as Play;
}

let totalScore: number = 0;

for (let [index, line] of lines.entries()) {
  const [opponentKey, ownKey]: string[] = line.split(' ');
  const opponentPlay: Play = plays[opponentKey];
  const result = results[ownKey];
  const ownPlay: Play = resolve(opponentPlay, result);
  const score = ownPlay.value + result.value;

  totalScore += score;

  console.log(
    `[${index}] Play: ${line} - ${opponentPlay.name} vs ${ownPlay.name} => ${result.name} +${score} [Total: ${totalScore}]`
  );
}

console.log('---Result---');
console.log(`Total Score: ${totalScore}`);
