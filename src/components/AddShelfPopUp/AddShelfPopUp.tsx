import styles from './AddShelfPopUp.module.scss';
import defaultImage from '../../assets/DefaultBookCover.png';
import Plus from '../../icons/Plus';
import DotHorizontal from '../../icons/DotsHorizontal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import shelfApi from '../../api/shelvesApi';
import { CreateShelf } from '../../interfaces/Shelf';

function AddShelfPopUp() {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [newShelf, setNewShelf] = useState<CreateShelf>({
    name: inputValue,
    description: 'string',
  });
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(0);
  };

  const validateInput = (value: string): string => {
    if (value.trim().length < 3) {
      return 'Nazwa półki musi mieć co najmniej 3 znaki.';
    }
    if (value.trim().length > 25) {
      return 'Nazwa półki nie może przekraczać 25 znaków.';
    }
    return '';
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    setNewShelf((prevShelf) => ({
      ...prevShelf,
      name: e.target.value,
    }));

    const validationError = validateInput(e.target.value);
    setError(validationError);
  };

  function handleAdd() {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    const postData = async () => {
      try {
        await shelfApi.postShelf(newShelf);
      } catch (error) {
        console.error('Błąd podczas zapisu półki:', error);
      } finally {
        navigate(0);
      }
    };

    postData();
  }

  return (
    <div className={styles.shelfPopUpContainer}>
      <div className={styles.addShelfContainer}>
        <div className={styles.title}>
          <DotHorizontal />
          <h2 className={styles.text}>Dodaj nową półkę</h2>
        </div>
        <div className={styles.addShelfContainer}>
          <div className={styles.centerContainer}>
            <div className={styles.shelfContainer}>
              <div className={styles.booksContainer}>
                <img src={defaultImage} className={styles.images} alt="Book Cover" />
                <div className={styles.imageWithText}>
                  <img src={defaultImage} className={styles.images} alt="Book Cover" />
                  <div className={styles.textOverlay}>
                    <Plus />
                  </div>
                </div>
                <img src={defaultImage} className={styles.images} alt="Book Cover" />
              </div>
              <div className={styles.bar}></div>
              <input
                type="text"
                value={inputValue}
                className={styles.placeholder}
                onChange={handleInputChange}
                placeholder="Wpisz nazwę nowej półki"
              ></input>
              {error && <p className={styles.errorText}>{error}</p>}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.addButton} onClick={handleAdd}>
              Dodaj
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddShelfPopUp;
