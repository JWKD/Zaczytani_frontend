const endpoints = {
  book: {
    fetch: `Book`, // Endpoint do pobierania danych
    fetchDetails: (id: string) => `Book/${id}`, // Endpoint do pobierania detali książki
    create: `Book`, // Endpoint do tworzenia danych (POST)
    update: (id: number) => `Book/${id}`, // Endpoint do aktualizacji danych (PUT)
    delete: (id: number) => `Book/${id}`, // Endpoint do usuwania danych (DELETE)
    fetchSearchedBooks: `Book/Search`, // Endpoint do pobierania wyszukiwanych książek
  },
  user: {
    login: `Identity/login`,
    refreshToken: 'Identity/refresh'
  },
};

export default endpoints;
