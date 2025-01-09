import varietOfBooks from './utils';

function challengeVariety(number: number, criteria: string) {
  if (criteria === 'Author') {
    return `${varietOfBooks(number)} autorstwa`;
  } else if (criteria === 'Genre') {
    return `${varietOfBooks(number)}`;
  } else {
    return `${varietOfBooks(number)}.`;
  }
}

export default challengeVariety;
