function varietOfBooks(amount: number): string {
  if (amount === 1) return 'książka';
  if (amount >= 2 && amount <= 4) return 'książki';
  if (amount % 10 >= 2 && amount % 10 <= 4 && !(amount % 100 >= 12 && amount % 100 <= 14)) {
    return 'książki';
  }
  return 'książek';
}

export default varietOfBooks;
