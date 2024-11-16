const endpoints = {
  book: {
    fetch: `Book`, // Endpoint do pobierania danych
    create: `Book`, // Endpoint do tworzenia danych (POST)
    update: (id: number) => `Book/${id}`, // Endpoint do aktualizacji danych (PUT)
    delete: (id: number) => `Book/${id}`, // Endpoint do usuwania danych (DELETE)
  },
  user: {
    login: `Identity/login`,
  },
};

export default endpoints;
