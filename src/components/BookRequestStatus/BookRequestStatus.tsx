import { useEffect, useState } from 'react';
import styles from './BookRequestStatus.module.scss';
import dataApi from '../../api/bookApi';
import { BookRequest } from '../../interfaces/book';

function BookRequestStatus() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [activeRequest, setActiveRequest] = useState<BookRequest>(requests[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getBookRequest();
        setRequests(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id: string) => {
    setActiveRequest(requests.find((request) => request.id === id)!);
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <div className={styles.mainContainer}>
      <div className={styles.myRequests}>
        <div className={styles.headTitle}>Moje prośby o dodanie książki</div>
        <div className={styles.list}>
          <ul>
            {requests.map((request) => (
              <li key={request.id}>
                <div className={styles.listItem} onClick={() => handleClick(request.id)}>
                  <p className={styles.title}>{request.title}</p>
                  <p>{request.authors}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.activeRequest}>
        {activeRequest && (
          <div className={styles.currentRequest}>
            {activeRequest.image && <img className={styles.bookCover} src={activeRequest.image} alt="Okładka" />}
            <div className={styles.mainInfo}>
              <div className={styles.title}> {activeRequest.title} </div>
              <div className={styles.authors}>{activeRequest.authors}</div>
              <div className={styles.publisher}>Wydawnictwo: {activeRequest.publishingHouse}</div>
            </div>
            <div className={styles.secondInfo}>
              <div className={styles.genres}>
                <strong>Gatunki:</strong>
                {activeRequest.genre && activeRequest.genre.join(', ')}
              </div>
              <div className={styles.series}>
                <strong>Cykl:</strong> {activeRequest.series}
              </div>
              <div className={styles.pages}>
                <strong>Ilość stron:</strong> {activeRequest.pageNumber}
              </div>
              <div className={styles.date}>
                <strong>Data wydania:</strong> {activeRequest.releaseDate}
              </div>
              <div className={styles.isbn}>
                <strong>ISBN: </strong>
                {activeRequest.isbn}
              </div>
            </div>
            <div className={styles.description}>{activeRequest.description}</div>
            <div className={styles.status}>
              {activeRequest.status === 'Oczekujący' && (
                <div className={styles.pending}>
                  <strong>Status: </strong>
                  {activeRequest.status}
                </div>
              )}
              {activeRequest.status === 'Zaakceptowany' && (
                <div className={styles.accepted}>
                  <strong>Status: </strong>
                  {activeRequest.status}
                </div>
              )}
              {activeRequest.status === 'Odrzucony' && (
                <div className={styles.rejected}>
                  <strong>Status: </strong>
                  {activeRequest.status}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BookRequestStatus;
