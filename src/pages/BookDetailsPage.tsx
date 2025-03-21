import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';

function BookDetailsPage() {
  const { id } = useParams();
  return <div style={{ backgroundColor: '#F1EEE8' }}>{id && <BookDetails id={id} />}</div>;
}

export default BookDetailsPage;
