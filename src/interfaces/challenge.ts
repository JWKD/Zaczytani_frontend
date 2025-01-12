export interface Challenge {
  id: string;
  booksToRead: number;
  criteriaValue: string;
  criteria: string;
  booksRead: number;
  isCompleted: boolean;
}

export interface PostChallenge {
  booksToRead: number;
  critiera: string;
  criteriaValue: string | null;
}

export interface NewChallenge {
  id: string;
  booksToRead: number;
  criteriaValue: string;
  criteria: string;
}
