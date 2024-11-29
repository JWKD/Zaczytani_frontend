import { useEffect, useState } from 'react';
import Select from 'react-select';
import dataApi from '../../../api/bookApi';
import './AutoComplete.modules.scss';

interface GenreOption {
  value: string;
  label: string;
}

interface GenresAutoCompleteProps {
  value?: string[];
  onChange?: (selectedOptions: string[]) => void;
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

  const handleChange = (selectedOptions: any) => {
    if (onChange) {
      const selectedGenres = selectedOptions.map((option: any) => option.value);
      onChange(selectedGenres);
    }
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <Select
      value={value?.map((genre) => genreOptions.find((option) => option.value === genre))}
      onChange={handleChange}
      isMulti
      name="genres"
      options={genreOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Wybierz gatunek/ki..."
    />
  );
}

export default GenresAutoComplete;
