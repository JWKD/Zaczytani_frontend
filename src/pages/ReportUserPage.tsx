import { useParams } from 'react-router-dom';
import ReportUser from '../components/ReportUser/ReportUser';
import { ReviewPage } from '../interfaces/review';
import { useEffect, useState } from 'react';
import reviewApi from '../api/reviewApi';
import CatLoader from '../components/CatLoader/CatLoader';

function ReportUserPage() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<ReviewPage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await reviewApi.getReview(id);
          setReview(result);
        }
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  if (review)
    return loading ? (
      <div
        style={{
          width: '500px',
          margin: '0 auto',
        }}
      >
        <CatLoader />
      </div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : (
      <ReportUser {...review} />
    );
}

export default ReportUserPage;
