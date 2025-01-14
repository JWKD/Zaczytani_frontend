import { useParams } from 'react-router-dom';
import ShelfDetailsComponent from '../components/ShelfDetailsComponent/ShelfDetailsComponent';

function ShelfDetails() {
  const { id } = useParams();
  return <div style={{ backgroundColor: '#F1EEE8' }}>{id && <ShelfDetailsComponent id={id} />}</div>;
}

export default ShelfDetails;
