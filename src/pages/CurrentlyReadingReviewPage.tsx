import { useParams } from 'react-router-dom';
import CurrentlyReadingReview from '../components/CurrentlyReadingReview/CurrentlyReadingReview';

function CurrentlyReadingReviewPage() {
  const { id } = useParams<{ id: string }>();
  return <div>{id && <CurrentlyReadingReview bookId={id} />}</div>;
}

export default CurrentlyReadingReviewPage;
