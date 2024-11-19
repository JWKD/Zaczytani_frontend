import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';

function Details() {
  const { id } = useParams();
  return <div style={{ backgroundColor: '#F1EEE8', width: '100%' }}>{id && <BookDetails id={id} />}</div>;
}

export default Details;
