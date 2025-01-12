import { useEffect, useState } from 'react';
import Select from 'react-select';
import dataApi from '../../../api/bookApi';
import { PostChallenge } from '../../../interfaces/challenge';
import styles from './SingleAutoComplite.module.scss';

interface GenreOption {
  value: string;
  label: string;
}

interface GenreAutoCompleteProps {
  value?: string | null;
  onChange?: (field: keyof PostChallenge, selectedOption: string) => void;
}

function SingleGenreAutoComplete({ value, onChange }: GenreAutoCompleteProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  const genreOptions: GenreOption[] = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await dataApi.getGenres();
        setGenres(result);
      } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas wyszukiwania gatunków');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedOption: GenreOption | null) => {
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
      value={value ? genreOptions.find((option) => option.value === value) : null}
      onChange={(selectedOption) => handleChange(selectedOption as GenreOption | null)}
      name="genre"
      options={genreOptions}
      className={styles.singleAutocoplite}
      classNamePrefix="select"
      placeholder="gatunek"
      noOptionsMessage={() => 'Brak wyników wyszukiwania'}
    />
  );
}

export default SingleGenreAutoComplete;
