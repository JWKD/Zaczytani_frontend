const endpoints = {
  book: {
    fetch: `Book`, // Endpoint do pobierania danych
    fetchDetails: (id: string) => `Book/${id}`, // Endpoint do pobierania detali książki
    create: `Book`, // Endpoint do tworzenia danych (POST)
    update: (id: number) => `Book/${id}`, // Endpoint do aktualizacji danych (PUT)
    delete: (id: number) => `Book/${id}`, // Endpoint do usuwania danych (DELETE)
    fetchSearchedBooks: `Book/Search`, // Endpoint do pobierania wyszukiwanych książek
    bookRequest: `BookRequest`, // Endpoint do tworzenia bookRequest
    fetchAuthors: `Author`, // Endpoint do pobierania autorów
    fetchGenres: `Book/Genres`, // Endpoint do pobierania gatunków
    fetchPublishingHouses: `Book/PublishingHouses`, // Endpoint do pobierania wydawnictw
  },
  user: {
    login: `Identity/login`,
  },
};

export default endpoints;
