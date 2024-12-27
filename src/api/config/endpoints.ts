const endpoints = {
  book: {
    fetch: `Book`, // Endpoint do pobierania danych
    fetchDetails: (id: string) => `Book/${id}`, // Endpoint do pobierania detali książki
    create: `Book`, // Endpoint do tworzenia danych (POST)
    update: (id: number) => `Book/${id}`, // Endpoint do aktualizacji danych (PUT)
    delete: (id: number) => `Book/${id}`, // Endpoint do usuwania danych (DELETE)
    fetchSearchedBooks: `Book/Search`, // Endpoint do pobierania wyszukiwanych książek
    fetchBookHasDrawn: `Book/HasDrawn`, // Endpoint do sprawdzania czy było już losowanie danego dnia
    getRandomBook: `Book/Random`, // (POST) Endpoint do zapisania że już było losowanie i pobranie ksiązki
    fetchBookRequest: `BookRequest`, // Endpoint do pobierania bookRequestów użytkownika
    bookRequest: `BookRequest`, // Endpoint do tworzenia bookRequest
    fetchAuthors: `Author`, // Endpoint do pobierania autorów
    fetchGenres: `Book/Genres`, // Endpoint do pobierania gatunków
    fetchPublishingHouses: `Book/PublishingHouses`, // Endpoint do pobierania wydawnictw
    fetchCurrentlyReading: `Book/CurrentlyReading`, // Endpoint do pobierania aktualnie czytanych książek
    fetchReviews: (id: string) => `Book/${id}/Reviews`, // Endpoint do pobierania recenzji książki
  },
  user: {
    login: `Identity/login`,
    refreshToken: 'Identity/refresh',
  },
  file: {
    postFile: `File`, // Endpoint do wysyłania pliku
  },
  shelf: {
    fetch: `Bookshelf/GetAllBookShelves`, // Endpoint do pobierania wszystkich półek
    fetchShelfBooks: (id: string) => `Bookshelf/${id}/Books`, // Endpoint do pobierania książek na danej półce
    fetchShelf: (id: string) => `Bookshelf/GetBookshelf/${id}`, // Endpoint do pobrania jednej półki
    create: `Bookshelf/Create`, // Endpoint do dodania półki
    update: `Bookshelf/Update`, //Endpoint do zmiany nazwy półki
    delete: `Bookshelf/Delete`, // Endpoint do usuwania półki
    attach: (shelfId: string, bookId: string) => `Bookshelf/${shelfId}/${bookId}/Attach`, // Endpoint do dodania książki na daną półkę
    detach: (shelfId: string, bookId: string) => `Bookshelf/${shelfId}/${bookId}/Detach`, // Endpoint do usuwania książki z danej półki
  },
  review: {
    fetchCurrentlyReadingBookDetails: (id: string) => `Review/${id}/Progress`, // Endpoint do pobierania detali książki do recenzji
    currentlyReadingBookReview: (id: string) => `Review/${id}`, // Endpoint do wysyłania recenzji
    getReview: (id: string) => `Review/${id}`, // Endpoint do pobierania detali recenzji
    like: (id: string) => `Review/${id}/like`, // Endpoint do like recenzji
    unlike: (id: string) => `Review/${id}/unlike`, // Endpoint do unlike recenzji
    comment: (id: string) => `Review/${id}/Comment`, // Endpoint do dodawania komentarzy
  },
};

export default endpoints;
