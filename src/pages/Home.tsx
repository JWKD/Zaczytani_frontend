import { Button, Container, styled, TextField, Typography } from '@mui/material';
import AppList from '../components/AppList/AppList';
import BookSearch from '../components/BookSearch/BookSearch';

const StyledTextField = styled(TextField)(({ theme }) => ({
  padding: '10px',

  '& .MuiInputBase-input': {
    padding: '10px',
  },
}));

function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Custom Themed Material UI with Vite
      </Typography>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>

      <StyledTextField />

      <AppList />
      <div>
        <BookSearch />
      </div>
    </Container>
  );
}

export default Home;
