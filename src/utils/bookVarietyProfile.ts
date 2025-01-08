function bookVariety(number: number): string {
  if (number === 0) {
    return '0 książek';
  } else if (number === 1) {
    return `1 książkę`;
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return `${number} książki`;
  } else {
    return `${number} książek`;
  }
}

export default bookVariety;
