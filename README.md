# Dokumentacja techniczna aplikacji w React + Vite + TypeScript

## Spis treści

1. [**Opis projektu**](#1-opis-projektu)
2. [**Struktura katalogów**](#2-struktura-katalogów)
3. [**Opis kluczowych plików i modułów**](#3-opis-kluczowych-plików-i-modułów)
4. [**Biblioteki i zależności**](#4-biblioteki-i-zależności)
5. [**Szczegóły implementacji**](#5-szczegóły-implementacji)
6. [**Uruchamianie projektu**](#6-uruchamianie-projektu)

---

## 1. Opis projektu

Aplikacja to projekt frontendowy stworzony w technologii **React**, z wykorzystaniem **Vite** jako narzędzia do budowania oraz **TypeScript** do statycznego typowania. Projekt oferuje modularną strukturę ułatwiającą rozwój i utrzymanie. Główne funkcjonalności obejmują obsługę routingu, komunikację z API oraz dynamiczne tworzenie interfejsu użytkownika.

---

## 2. Struktura katalogów

```
src/
├── api/
├── assets/
├── components/
├── interfaces/
├── layout/
├── pages/
App.tsx
main.tsx
```

### Szczegóły katalogów:

- **`src/api/`**  
  Zawiera serwisy do komunikacji z API. Każdy serwis zawiera funkcje odpowiedzialne za operacje HTTP takie jak GET, POST, PUT czy DELETE.

- **`src/assets/`**  
  Przechowuje statyczne zasoby aplikacji, takie jak obrazy, ikony.

- **`src/components/`**  
  Zawiera komponenty wielokrotnego użytku, które mogą być używane w różnych częściach aplikacji, np. przyciski, formularze.

- **`src/interfaces/`**  
  Definicje typów i interfejsów TypeScript dla danych używanych w aplikacji, co zapewnia typowanie i ułatwia refaktoryzację kodu.

- **`src/layout/`**  
  Zawiera szablony layoutów dla aplikacji, takie jak układ dla widoków publicznych czy autoryzowanych.

- **`src/pages/`**  
  Każda strona aplikacji odpowiada za widok routingu zdefiniowany w `App.tsx`.

- **`App.tsx`**  
  Główny plik aplikacji, który definiuje routing oraz integruje layouty i komponenty globalne.

- **`main.tsx`**  
  Punkt wejściowy aplikacji, odpowiedzialny za renderowanie głównego komponentu `App` w DOM.

---

## 3. Opis kluczowych plików i modułów

markdown
Skopiuj kod

### **`src/api/config/axios.ts`**

Ten plik zawiera konfigurację instancji Axios, która jest używana do wykonywania żądań HTTP w całej aplikacji.

#### **Opis funkcjonalności**

- **`baseURL`**: Ustawia podstawowy adres URL dla wszystkich żądań, który jest pobierany z konfiguracji aplikacji (`config.API_URL`).
- **`timeout`**: Definiuje maksymalny czas oczekiwania na odpowiedź serwera (10 sekund).
- **`headers`**: Domyślne nagłówki, w tym `Content-Type` ustawiony na `application/json`.

#### **Interceptors**

- **Request Interceptor**:  
  Przechwytuje każde żądanie przed jego wysłaniem. Możliwe jest np. dodanie tokena autoryzacyjnego do nagłówków, jeśli jest dostępny w lokalnej pamięci (`localStorage`).

- **Response Interceptor**:  
  Obsługuje odpowiedzi serwera. W przypadku kodu statusu 401 (brak autoryzacji), można podjąć odpowiednie działania, takie jak wyświetlenie komunikatu o błędzie lub przekierowanie użytkownika na stronę logowania.

#### **Korzyści z użycia**

- Centralizacja konfiguracji wszystkich żądań HTTP.
- Łatwe zarządzanie tokenami autoryzacyjnymi.
- Obsługa globalnych błędów HTTP, takich jak `401 Unauthorized`.

#### **Możliwości rozbudowy**

- Dodanie obsługi odświeżania tokena w przypadku wygaśnięcia.
- Logowanie błędów do zewnętrznego systemu monitorowania.
- Obsługa specyficznych błędów HTTP, np. `403 Forbidden` lub `500 Internal Server Error`.

### **`App.tsx`**

Ten plik jest głównym punktem wejściowym aplikacji React, odpowiadającym za konfigurację routingu, motywu oraz globalnego układu aplikacji.

#### **Opis funkcjonalności**

- **Routing (`react-router-dom`)**:  
  Routing jest skonfigurowany za pomocą `createBrowserRouter` i definiuje ścieżki dla różnych stron aplikacji:
  - **`/`**: Strona główna (`Home`) z domyślnym układem (`Layout`).
  - **`/account`**: Strona użytkownika z danymi konta.
  - **`/user/:id`**: Strona szczegółowa dla użytkownika z dynamicznym parametrem `id`.
  - **`*`**: Obsługa nieistniejących stron (`NotFound`).
  - **`/auth`**: Podrouty dla ścieżek autoryzacyjnych z dedykowanym układem (`AuthLayout`), w tym strona logowania (`LoginPage`).

#### **Korzyści z organizacji**

- Centralizacja konfiguracji routingu w jednym miejscu.
- Modularność dzięki wykorzystaniu układów (`Layout`, `AuthLayout`) pozwala na odseparowanie publicznych i prywatnych sekcji aplikacji.
- Możliwość łatwego dostosowania motywu aplikacji poprzez edycję jednego pliku (`theme.ts`).

#### **Możliwości rozbudowy**

- Dodanie mechanizmu ochrony tras (np. sprawdzanie tokena autoryzacyjnego w podroutach `AuthLayout`).
- Rozszerzenie motywu o niestandardowe style lub kolory.
- Rozbudowa routingu o kolejne dynamiczne strony.

## 4. Biblioteki i zależności

| Biblioteka         | Wersja    | Opis                                                |
| ------------------ | --------- | --------------------------------------------------- |
| `axios`            | `^1.7.7`  | Klient HTTP do komunikacji z API.                   |
| `react`            | `^18.3.1` | Biblioteka do budowy interfejsu użytkownika.        |
| `react-dom`        | `^18.3.1` | Obsługuje renderowanie komponentów React w DOM.     |
| `react-router-dom` | `^6.27.0` | Obsługuje routing w aplikacji React.                |
| `sass`             | `^1.80.4` | Umożliwia stylizowanie za pomocą preprocesora SASS. |

---

## 5. Szczegóły implementacji

### **Routing**

Routing aplikacji jest zorganizowany w pliku `App.tsx` przy użyciu biblioteki `react-router-dom`. Każda strona jest definiowana jako komponent w katalogu `src/pages/`.

### **Komunikacja z API**

Za komunikację z backendem odpowiadają serwisy z katalogu `src/api`. Każdy serwis:

1. Korzysta z skonfigurowanej instancji Axios.
2. Wykorzystuje stałe ścieżki endpointów zapisane w pliku `endpoints.ts`.
3. Obsługuje typowanie danych przy użyciu interfejsów z `src/interfaces`.

### **Typowanie**

Interfejsy w katalogu `src/interfaces` definiują struktury danych używanych w całej aplikacji. Zapewnia to spójność i redukuje ryzyko błędów.

## 6. Uruchamianie projektu

### **Wymagania:**

- Node.js (zalecana wersja: 18.x) https://nodejs.org/en
- Menedżer pakietów: npm lub yarn

### **Kroki instalacji i uruchomienia:**

1. Sklonuj repozytorium:

```bash
   git clone https://devtools.wi.pb.edu.pl/bitbucket/scm/pt2024zacz/zaczytani-frontend.git
   cd zaczytani-frontend
```

2. Zainstaluj zależności:

```
npm install
```

3. Uruchom aplikację w trybie deweloperskim:

```
npm run dev
```

4. Otwórz w przeglądarce

```
http://localhost:5173
```
