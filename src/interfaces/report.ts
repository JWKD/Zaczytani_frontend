export interface Report {
  content: string;
  category: string;
}
export const categories: Option[] = [
  { value: 'Spam', label: 'Spam' },
  { value: 'HateSpeech', label: 'Mowa nienawiści' },
  { value: 'InappropriateContent', label: 'Nieodpowiednie treści' },
  { value: 'FalseInformation', label: 'Fałszywe informacje' },
  { value: 'Plagiarism', label: 'Plagiat' },
  { value: 'Trolling', label: 'Trolling' },
  { value: 'OffTopic', label: 'Nie na temat' },
  { value: 'CopyrightInfringement', label: 'Naruszenie praw autorskich' },
  { value: 'PrivateInformation', label: 'Prywatne informacje' },
  { value: 'MisleadingContent', label: 'Wprowadzenie w błąd' },
  { value: 'LackOfSubstance', label: 'Brak wartości merytorycznej' },
];

export interface Option {
  value: string;
  label: string;
}
