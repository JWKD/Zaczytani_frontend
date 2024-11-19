import Navigation from '../components/Navigation/Navigation';

function Home() {
  return (
    <>
      <Navigation>
        <button onClick={() => alert('Home Page!')}>Home</button>
      </Navigation>
      <h1>Home page</h1>
    </>
  );
}

export default Home;
