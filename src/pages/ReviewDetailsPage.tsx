import { useParams } from 'react-router-dom';
import ReviewDetails from '../components/ReviewDetails/ReviewDetails';

function ReviewDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <div>{id && <ReviewDetails bookId={id} />}</div>;
}

export default ReviewDetailsPage;
