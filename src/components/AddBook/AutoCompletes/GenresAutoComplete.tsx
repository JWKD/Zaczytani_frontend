import { useEffect, useState } from 'react';
import Select from 'react-select';
import dataApi from '../../../api/bookApi';
import './AutoComplete.module.scss';
import { BookRequestPre } from '../AddBook';

interface GenreOption {
  value: string;
  label: string;
}

interface GenresAutoCompleteProps {
  value?: string[] | null;
  onChange?: (field: keyof BookRequestPre, selectedOptions: string[]) => void;
}

function GenresAutoComplete({ value, onChange }: GenresAutoCompleteProps) {
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

  const handleChange = (selectedOptions: GenreOption[]) => {
    if (onChange) {
      const selectedGenres = selectedOptions?.map((option) => option.value);
      onChange('genre', selectedGenres);
    }
  };

  return loading ? (
    <div></div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <Select
      value={value?.map((genre) => genreOptions.find((option) => option.value === genre))}
      onChange={(selectedOptions) => handleChange(selectedOptions as GenreOption[])}
      isMulti
      name="genres"
      options={genreOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Wybierz gatunek/ki..."
      noOptionsMessage={() => 'Brak wyników wyszukiwania'}
    />
  );
}

export default GenresAutoComplete;
