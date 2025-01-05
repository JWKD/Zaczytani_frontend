import styles from './ReportUser.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Review } from '../../interfaces/review';
import reportApi from '../../api/reportApi';
import { useState } from 'react';
import ReportIcon from '../../icons/ReportIcon';
import DotHorizontal from '../../icons/DotsHorizontal';
import profilePicture from '../../assets/profilePicture.png';
import Select from 'react-select';
import { Option, Report } from '../../interfaces/report';
import { SingleValue } from 'react-select';
import { categories } from '../../interfaces/report';

interface ReportUserProps {
  review: Review;
}

function ReportUser() {
  const location = useLocation();
  const state = location.state as ReportUserProps;
  const review = state.review;

  const [content, setContent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Option>(categories[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const postReport = async () => {
    try {
      const report: Report = {
        content: content,
        category: selectedCategory.value,
      };
      await reportApi.postReport(review.id, report);
    } catch (error) {
      console.error('Błąd podczas zgłoszenia:', error);
    }
  };

  const handleChangeCategory = (option: SingleValue<Option>) => {
    if (option) setSelectedCategory(option);
  };

  const handleChangeComment = (content: string) => {
    setContent(content);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (content.length > 300 || content.length <= 10) {
      newErrors.comment = 'Zgłoszenie musi być dłuższe niż 10 znaków i krótsze niż 300 znaków!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReport = () => {
    if (validateForm()) {
      postReport();
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        Zgłoszenia użytkowników
        <span>
          <ReportIcon />
        </span>
      </div>
      <div className={styles.report}>
        <div className={styles.reportHeader}>
          <DotHorizontal /> Zgłoś
        </div>
        <div className={styles.user}>
          <img src={review.user.imageUrl ?? profilePicture} alt="Avatar" />
          <div className={styles.nameCategory}>
            <div className={styles.name}>{review.user.firstName + ' ' + review.user.lastName}</div>
            <div className={styles.category}>
              Kategoria:{' '}
              <Select
                id="category-select"
                options={categories}
                value={selectedCategory}
                onChange={handleChangeCategory}
                placeholder="Wybierz kategorię..."
                className={styles.select}
              />
            </div>
          </div>
        </div>
        <div className={styles.text}>Zgłoszona treść:</div>
        <div className={styles.reportContent}>{review.content}</div>
        <div className={styles.textB}>Opis:</div>
        <div className={styles.inputContainer}>
          <div className={styles.contentContener}>
            <textarea
              className={styles.content}
              placeholder="Tutaj pisz..."
              onChange={(e) => handleChangeComment(e.target.value)}
              value={content ?? ''}
            ></textarea>
          </div>
          {errors.comment && <div className={styles.error}>{errors.comment}</div>}
        </div>
        <div className={styles.buttons}>
          <div className={styles.reportButton} onClick={() => handleReport()}>
            Zgłoś
          </div>
          <div className={styles.cancelButton} onClick={() => handleCancel()}>
            Anuluj
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportUser;
