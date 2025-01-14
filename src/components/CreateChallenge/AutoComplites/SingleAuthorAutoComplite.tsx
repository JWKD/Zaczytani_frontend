import { useEffect, useState } from 'react';
import Select from 'react-select';
import dataApi from '../../../api/bookApi';
import { PostChallenge } from '../../../interfaces/challenge';
import { Author } from '../../../interfaces/book';
import styles from './SingleAutoComplite.module.scss';

interface AuthorOption {
  value: string;
  label: string;
}

interface AuthorAutoCompleteProps {
  value?: string | null;
  onChange?: (field: keyof PostChallenge, selectedOption: string) => void;
}

function SingleAuthorAutoComplete({ value, onChange }: AuthorAutoCompleteProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  const authorOptions: AuthorOption[] = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await dataApi.getAuthors();
        setAuthors(result);
      } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas wyszukiwania autorów');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedOption: AuthorOption | null) => {
    if (onChange && selectedOption) {
      onChange('criteriaValue', selectedOption.value);
    }
  };

  return loading ? (
    <div></div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <Select
      value={value ? authorOptions.find((option) => option.value === value) : null}
      onChange={(selectedOption) => handleChange(selectedOption as AuthorOption | null)}
      name="author"
      options={authorOptions}
      className={styles.singleAutocoplite}
      classNamePrefix="select"
      placeholder="wybierz autora"
      noOptionsMessage={() => 'Brak wyników wyszukiwania'}
    />
  );
}

export default SingleAuthorAutoComplete;
