function readerVariety(number: number): string {
  if (number === 1) {
    return 'czytelnik';
  } else {
    return `czytelników`;
  }
}

export default readerVariety;
