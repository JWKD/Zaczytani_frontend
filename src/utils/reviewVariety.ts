function reviewVariety(number: number): string {
  if (number === 1) {
    return 'recenzja';
  } else {
    return `recenzji`;
  }
}

export default reviewVariety;
