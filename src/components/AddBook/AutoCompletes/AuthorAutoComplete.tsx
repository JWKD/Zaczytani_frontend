import { useEffect, useState } from 'react';
import { Author } from '../../../interfaces/book';
import dataApi from '../../../api/bookApi';
import CreatableSelect from 'react-select/creatable';
import './AutoComplete.module.scss';
import { BookRequestPre } from '../AddBook';

interface AuthorOption {
  value: string;
  label: string;
}

interface AuthorsAutoCompleteProps {
  value?: string[];
  onChange?: (field: keyof BookRequestPre, selectedOptions: string[]) => void;
}

function AuthorAutoComplete({ value, onChange }: AuthorsAutoCompleteProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  const authorOptions: AuthorOption[] = Array.from(new Set(authors.map((author) => author.name))).map((uniqueName) => ({
    value: uniqueName,
    label: uniqueName,
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

  const handleChange = (selectedOptions: any) => {
    if (onChange) {
      const selectedAuthors = selectedOptions?.map((option: any) => option.value);
      onChange('authors', selectedAuthors);
    }
  };

  const handleCreate = (inputValue: string) => {
    const newOption: Author = { id: inputValue, name: inputValue, imageUrl: null };
    setAuthors((prevAuthors) => [...prevAuthors, newOption]);
    if (onChange) {
      onChange('authors', [...(value || []), inputValue]);
    }
  };

  return loading ? (
    <div></div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <CreatableSelect
      value={value?.map((author) => authorOptions.find((option) => option.value === author))}
      onChange={handleChange}
      onCreateOption={handleCreate}
      isMulti
      name="authors"
      options={authorOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Wybierz lub dodaj autora/ów..."
      formatCreateLabel={(inputValue) => `Dodaj: "${inputValue}"`}
    />
  );
}

export default AuthorAutoComplete;
