import { useEffect, useState } from 'react';
import ShelfComponent from '../ShelfComponent/ShelfComponent';
import styles from './ShelvesContainer.module.scss';
import DotHorizontal from '../../icons/DotsHorizontal';
import { Shelf } from '../../interfaces/Shelf';
import DefaultImage from '../../assets/TestImage.png';
import AddShelfComponent from '../ShelfComponent/AddSheflComponent/AddSheflComponent';

function ShelvesContainer() {
  //przykładowe półki
  const sampleShelves: Shelf[] = [
    {
      id: '1',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '2',
      title: 'Kryminały',
      books: [
        {
          id: '3',
          title: 'Zbrodnia i kara',
          isbn: '978-83-208-0803-2',
          description: 'Klasik literatury rosyjskiej, który bada moralność i winę.',
          pageNumber: 500,
          authors: [{ id: '3', name: 'Fiodor Dostojewski', imageUrl: 'https://link-do-obrazka.com/dostojewski.jpg' }],
          imageUrl: DefaultImage,
        },
        {
          id: '4',
          title: 'Morderstwo w Orient Expressie',
          isbn: '978-83-06-30262-7',
          description: 'Kryminał Agathy Christie, który rozwiązuje detektyw Hercule Poirot.',
          pageNumber: 320,
          authors: [{ id: '4', name: 'Agatha Christie', imageUrl: 'https://link-do-obrazka.com/agatha_christie.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '3',
      title: 'Podróże',
      books: [
        {
          id: '5',
          title: 'W 80 Dni dookoła Świata',
          isbn: '978-83-08-07377-3',
          description: 'Powieść przygodowa o podróży dookoła świata w 80 dni.',
          pageNumber: 310,
          authors: [{ id: '5', name: 'Jules Verne', imageUrl: 'https://link-do-obrazka.com/jules_verne.jpg' }],
          imageUrl: DefaultImage,
        },
        {
          id: '6',
          title: 'Podróż na Księżyc',
          isbn: '978-83-06-30259-7',
          description: 'Opowieść o wyprawie ludzi na Księżyc, w stylu fantastycznym.',
          pageNumber: 320,
          authors: [{ id: '5', name: 'Jules Verne', imageUrl: 'https://link-do-obrazka.com/jules_verne.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '4',
      title: 'Historia',
      books: [
        {
          id: '7',
          title: 'Krótka Historia Czasu',
          isbn: '978-83-01-45644-3',
          description: 'Popularnonaukowa książka o kosmologii i fizyce.',
          pageNumber: 256,
          authors: [{ id: '6', name: 'Stephen Hawking', imageUrl: 'https://link-do-obrazka.com/stephen_hawking.jpg' }],
          imageUrl: DefaultImage,
        },
        {
          id: '8',
          title: 'Sapiens. Opowieść o dziejach ludzkości',
          isbn: '978-83-01-56789-2',
          description: 'Książka o historii ludzkości, od czasów prehistorycznych po współczesność.',
          pageNumber: 450,
          authors: [
            { id: '7', name: 'Yuval Noah Harari', imageUrl: 'https://link-do-obrazka.com/yuval_noah_harari.jpg' },
          ],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '9',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '10',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '11',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '12',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
    {
      id: '13',
      title: 'Fantastyka',
      books: [
        {
          id: '1',
          title: 'Wiedźmin: Ostatnie Życzenie',
          isbn: '978-83-283-4913-9',
          description: 'Pierwszy zbiór opowiadań o przygodach Geralta z Rivii.',
          pageNumber: 368,
          authors: [{ id: '1', name: 'Andrzej Sapkowski', imageUrl: null }],
          imageUrl: '',
        },
        {
          id: '2',
          title: 'Harry Potter i Kamień Filozoficzny',
          isbn: '978-83-241-4350-2',
          description: 'Pierwsza książka z serii o młodym czarodzieju Harrym Potterze.',
          pageNumber: 350,
          authors: [{ id: '2', name: 'J.K. Rowling', imageUrl: 'https://link-do-obrazka.com/jk_rowling.jpg' }],
          imageUrl: DefaultImage,
        },
      ],
    },
  ];
  const [shelves, setShelves] = useState<Shelf[]>(sampleShelves);

  // Funkcja pobierająca dane z API
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // tutaj strzał do Api będzie i zapis półek
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchShelves();
  }, []);

  function openPopUp() {}

  return (
    <div className={styles.shelvesContainer}>
      <div className={styles.title}>
        <DotHorizontal />
        <h2 className={styles.text}>Moja biblioteczka</h2>
      </div>
      <div className={styles.shelvesGrid}>
        {shelves.map((shelf, index) => (
          <ShelfComponent key={index} shelf={shelf} />
        ))}
        <button className={styles.addShelfButton} onClick={openPopUp}>
          <AddShelfComponent />
        </button>
      </div>
    </div>
  );
}

export default ShelvesContainer;
