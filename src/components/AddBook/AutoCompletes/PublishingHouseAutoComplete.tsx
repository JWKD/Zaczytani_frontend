import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import dataApi from '../../../api/bookApi';
import { PublishingHouse } from '../../../interfaces/book';
import './AutoComplete.modules.scss';

interface PublishingHouseOption {
  value: string;
  label: string;
}

interface PublishingHouseAutoCompleteProps {
  value?: string;
  onChange?: (selectedOption: string) => void;
}

function PublishingHouseAutoComplete({ value, onChange }: PublishingHouseAutoCompleteProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [publishinghouses, setGenres] = useState<PublishingHouse[]>([]);

  const publishingHouseOptions: PublishingHouseOption[] = Array.from(
    new Set(publishinghouses.map((publishingHouse) => publishingHouse.name))
  ).map((uniqueName) => ({
    value: uniqueName,
    label: uniqueName,
  }));

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result: PublishingHouse[] = await dataApi.getPublishingHouses();
        setGenres(result);
      } catch (err) {
        console.error(err);
        setError('Wystąpił błąd podczas wyszukiwania wydawnictw');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (selectedOption: PublishingHouseOption | null) => {
    if (onChange) {
      onChange(selectedOption?.value || '');
    }
  };

  const handleCreate = (inputValue: string) => {
    const newOption: PublishingHouse = { id: inputValue, name: inputValue };
    setGenres((prevPublishingHouse) => [...prevPublishingHouse, newOption]);

    if (onChange) {
      onChange(newOption.id);
    }
  };

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <CreatableSelect
      value={value ? publishingHouseOptions.find((option) => option.value === value) || { value, label: value } : null}
      onChange={handleChange}
      onCreateOption={handleCreate}
      name="genres"
      options={publishingHouseOptions}
      className="basic-select"
      classNamePrefix="select"
      placeholder="Wybierz lub dodaj..."
      formatCreateLabel={(inputValue) => `Dodaj: "${inputValue}"`}
    />
  );
}

export default PublishingHouseAutoComplete;
