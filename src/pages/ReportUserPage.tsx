import { useParams } from 'react-router-dom';
import ReportUser from '../components/ReportUser/ReportUser';
import { ReviewPage } from '../interfaces/review';
import { useEffect, useState } from 'react';
import reviewApi from '../api/reviewApi';

function ReportUserPage() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<ReviewPage>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await reviewApi.getReview(id);
        setReview(result);
      }
    };

    fetchData();
  }, [id]);
  if (review) return <ReportUser {...review} />;
}

export default ReportUserPage;
