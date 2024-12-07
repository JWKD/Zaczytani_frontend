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
  },
  user: {
    login: `Identity/login`,
    refreshToken: 'Identity/refresh',
  },
  file: {
    postFile: `File`, // Endpoint do wysyłania pliku
  },
  shelf: {
    fetch: `Shelf`, // Trzeba będzie zmienić na taki jaki będzie w Api.Endpoint do pobieracjia wszystkich półek
  },
};

export default endpoints;
