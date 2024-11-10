import { useEffect, useState } from 'react';
import { Book } from '../../interfaces/book';
import dataApi from '../../api/bookApi';
import { List, ListItem, styled } from '@mui/material';

const StyledList = styled(List)(({ theme }) => ({
  padding: '10px 0',
  backgroundColor: theme.palette.background.default,
}));

const AppList = () => {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataApi.getData();
        console.log(result);
        setData(result);
      } catch (err) {
        setError('Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error: {error}</div>
  ) : (
    <StyledList>
      {data.map((item) => (
        <ListItem key={item.id}>{item.title}</ListItem>
      ))}
    </StyledList>
  );
};

export default AppList;
